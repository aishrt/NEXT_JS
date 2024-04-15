import { connectDB } from "@/dbConfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  connectDB();
  const reqBody = await request.json();
  const { username, email, password } = reqBody;
  const existing = await User.findOne({ email });

  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 401 });
  }

  // hashPassword
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();

  return NextResponse.json({
    message: "User created successfully",
    success: true,
    savedUser,
  });
}
