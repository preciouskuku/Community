import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/model/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();
    console.log("Received sync-user request:", data);

    const { id, email, name, avatar, mobileNumber } = data;

    if (!id || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { supabaseId: id },
      { supabaseId: id, email, name, avatar: avatar || "", mobileNumber: mobileNumber || "" },
      { upsert: true, new: true }
    );

    console.log("MongoDB user upserted:", user);

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error("Sync Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
