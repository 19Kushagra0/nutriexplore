import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request) {
  console.log("proxy is working...");

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const pathname = request.nextUrl.pathname;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    console.log("Verified Payload:", payload);
    console.log("Path:", pathname);

    // 🔹 no role checks for now
    // proxy only verifies authentication

    return NextResponse.next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// dont forget to export the config else it will work weirdlyW
export const config = {
  matcher: ["/shop/:path*"],
};
