import dbConnect from "../lib/dbConnect";
import Url from "../models/UrlSchema";
import { redirect } from "next/navigation";

export const getdata = async (urlId: string) => {
  await dbConnect();
  try {
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
      return url.origUrl;
    } else Response.json({ status: 404, msg: "Not found" });
  } catch (err) {
    Response.json({ status: 404, msg: "Not found" });
  }
};
