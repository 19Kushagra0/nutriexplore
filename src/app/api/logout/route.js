import { serialize } from "cookie";

export async function POST() {
  const serialized = serialize("token", "", {
    // use one
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  // there is also next js way to to do it
  // in this way you dont have to return cookie in respose
  // but this can not be used in pyton, nodejs etc
  //   const cookieStore = cookies();
  //   await cookieStore.delete("token");

  return Response.json(
    { message: "logout successful" },
    {
      headers: {
        "Set-Cookie": serialized,
      },
    },
  );
}
