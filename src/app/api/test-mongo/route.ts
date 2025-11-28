import { connectToDatabase } from "@/lib/mongoose";

export async function GET() {
  try {
    const db = await connectToDatabase();
    // If the connection works, db.connection.readyState should be 1 (connected)
    return new Response(
      JSON.stringify({ message: "MongoDB connection successful!", readyState: db.connection.readyState }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "MongoDB connection failed", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
