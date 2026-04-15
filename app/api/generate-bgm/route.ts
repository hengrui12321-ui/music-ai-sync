import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { videoPath, mood, userId } = await req.json();

    if (!videoPath || !mood || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Create job row — frontend listens to this via Supabase Realtime
    const { data: job, error } = await supabase
      .from("bgm_jobs")
      .insert({
        user_id: userId,
        video_path: videoPath,
        mood,
        status: "queued",
        step: "Queued...",
      })
      .select()
      .single();

    if (error || !job) {
      return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
    }

    // 2. Send to Railway worker (fire and forget — don't await)
    // Railway worker responds 202 immediately and processes in background
    const workerUrl = process.env.WORKER_URL; // e.g. https://bgm-worker.up.railway.app
    if (!workerUrl) {
      return NextResponse.json({ error: "WORKER_URL not configured" }, { status: 500 });
    }

    fetch(`${workerUrl}/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: job.id,
        videoPath,
        mood,
        userId,
      }),
    }).catch((err) => {
      // Log but don't fail — job row exists, worker will pick it up
      console.error("Failed to reach worker:", err.message);
    });

    // 3. Return job ID immediately to frontend
    return NextResponse.json({ jobId: job.id }, { status: 202 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
