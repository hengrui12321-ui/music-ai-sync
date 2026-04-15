import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { videoPath, mood, userId } = await req.json();

    if (!videoPath || !mood || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
      console.error("Failed to create job:", error);
      return NextResponse.json(
        { error: "Failed to create job" },
        { status: 500 }
      );
    }

    const workerUrl = process.env.WORKER_URL;
    if (!workerUrl) {
      return NextResponse.json(
        { error: "WORKER_URL not configured" },
        { status: 500 }
      );
    }

    const workerSecret = process.env.WORKER_SECRET || "";

    fetch(`${workerUrl}/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(workerSecret
          ? { Authorization: `Bearer ${workerSecret}` }
          : {}),
      },
      body: JSON.stringify({
        jobId: job.id,
        videoPath,
        mood,
        userId,
      }),
    }).catch((err) => {
      console.error("Failed to reach worker:", err.message);
    });

    return NextResponse.json({ jobId: job.id }, { status: 202 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}