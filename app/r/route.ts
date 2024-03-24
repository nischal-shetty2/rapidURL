import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import Url from "../models/UrlSchema";

export async function GET(req: NextRequest) {
  try {
    const fullUrl = req.nextUrl.href;
    const urlId = fullUrl.split("?")[1];
    await dbConnect();
    const url = await Url.findOne({
      urlId,
    });
    if (url) {
      await Url.updateOne(
        {
          urlId,
        },
        { $inc: { clicks: 1 } }
      );
      return NextResponse.redirect(url.origUrl);
    } else return NextResponse.json({ status: 404, msg: "Not found" });
  } catch (err) {
    return NextResponse.json({ status: 404, error: err });
  }
}
