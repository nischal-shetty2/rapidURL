import { NextRequest } from "next/server";
import dbConnect from "../lib/dbConnect";
import Url from "../models/UrlSchema";

export async function GET(req: NextRequest) {
  try {
    console.log(req.url);
    const urlId = req.url.split("?")[1];
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
      return Response.redirect(url.origUrl);
    } else Response.json({ status: 404, msg: "Not found" });
  } catch (err) {
    Response.json({ status: 404, error: err });
  }
}
