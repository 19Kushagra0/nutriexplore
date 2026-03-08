import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { findUser } from "@/lib/users";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req) {
  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      { message: "JWT secret not defined" },
      { status: 500 },
    );
  }

  const body = await req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  const { email, password } = result.data;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password required" },
      { status: 400 },
    );
  }

  try {
    const user = findUser(email);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = createToken(user.id);

    const tokenCookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      priority: "high",
    });

    return NextResponse.json(
      { success: true, message: "Login successful" },
      { headers: { "Set-Cookie": tokenCookie } },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

//check if password and user input is correct format (use zod, yup, joi)
// add database
