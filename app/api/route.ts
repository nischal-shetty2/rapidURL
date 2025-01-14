import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import { validateUrl } from "../utils";
import { nanoid } from "nanoid";
import Url from "../models/UrlSchema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const origUrl = body.inputValue;
  if (!validateUrl(origUrl)) {
    return NextResponse.json(origUrl);
  }
  try {
    await dbConnect();
    const found = await Url.findOne({
      origUrl,
    });
    if (found) {
      return NextResponse.json(found.shortUrl);
    } else {
      const urlId = nanoid(3);
      const base = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
      const shortUrl = `${base}/r?${urlId}`;
      await Url.create({
        origUrl,
        urlId,
        shortUrl,
        date: new Date(),
      });
      return NextResponse.json(shortUrl);
    }
  } catch (e) {
    return NextResponse.json({
      error: e,
    });
  }
}
