import { lucia } from "@/app/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const getSessId = await request.json();
  const { session, user } = await lucia.validateSession(getSessId.sessId);
  const role = user?.role;

  const objJSON = JSON.stringify({ role });

  return new Response(objJSON);
}
