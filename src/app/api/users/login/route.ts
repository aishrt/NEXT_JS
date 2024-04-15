import { connectDB } from "@/dbConfig/dbconfig";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    connectDB();

    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ status: 400, error: "User Not found!" });
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ status: 400, error: "Incorrect password!" });
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!);

    const response = NextResponse.json({
      status: 200,
      message: "User logged in successfully",
      data: { user, token },
    });

    response.cookies.set("token", token);

    return response;
  } catch (error) {
    console.error("Error occurred while processing request:", error);
    return NextResponse.json({ status: 500, error: "Something went wrong!" });
  }
}
