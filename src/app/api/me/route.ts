import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = await getTokenData(req);
    const userData = await User.findOne({ _id: userId }).select(
      "-password -__v"
    );
    return NextResponse.json({
      message: "User foud ",
      data: userData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
