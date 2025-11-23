// app/api/v1/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND = "http://localhost:9721/api";

function buildTargetUrl(base: string, path?: string[], search?: string) {
  const safeSegments = Array.isArray(path) ? path.filter(Boolean) : [];
  const suffix = safeSegments.length ? safeSegments.join("/") : "";
  let url = suffix ? `${base}/${suffix}` : base;

  if (search) {
    url += search; // append query string
  }

  return url;
}

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  // ⬅️ FIX: await params
  const { path } = await context.params;

  const targetUrl = buildTargetUrl(BACKEND, path, req.nextUrl.search);

  const init: RequestInit = {
    method: req.method,
    headers: req.headers,
  };

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