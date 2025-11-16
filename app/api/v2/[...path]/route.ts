// app/api/v2/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_V2 = "http://localhost:9721"; // note: v2 doesn't add /api prefix

function buildTargetUrl(base: string, path?: string[]) {
  const safeSegments = Array.isArray(path) ? path.filter(Boolean) : [];
  const suffix = safeSegments.length ? safeSegments.join("/") : "";
  return suffix ? `${base}/${suffix}` : base;
}

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await context.params;

  const targetUrl = buildTargetUrl(BACKEND_V2, path);

  const init: RequestInit = {
    method: req.method,
    headers: req.headers,
  };

  // Forward body for mutating requests
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    init.body = await req.text();
  }

  const res = await fetch(targetUrl, init);

  return new NextResponse(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
export const HEAD = handler;