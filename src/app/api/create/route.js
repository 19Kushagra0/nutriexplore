import { NextResponse } from "next/server";
import { users, findUser, addUser } from "@/lib/users";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
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
    return NextResponse.json(
      { message: "Invalid input format" },
      { status: 400 },
    );
  }

  const { name, email, password, confirmPassword } = result.data;

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Passwords do not match" },
      { status: 400 },
    );
  }

  try {
    const user = findUser(email);
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
    };

    addUser(newUser);

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
