import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import Url from "../models/UrlSchema";

export async function GET(req: NextRequest) {
  const fullUrl = req.nextUrl.href;
  const urlId = fullUrl.split("?")[1].split("=")[0];
  try {
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
    } else {
      return NextResponse.json({ status: 404, msg: fullUrl + " doesnt exist" });
    }
  } catch (err) {
    return NextResponse.json({ status: 404, error: err });
  }
}
