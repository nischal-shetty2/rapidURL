import mongoose, { Document } from "mongoose";

interface UrlDocument extends Document {
  urlId: string;
  origUrl: string;
  shortUrl: string;
  clicks: number;
  date: Date;
}

interface UrlModel extends mongoose.Model<UrlDocument> {}

const urlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let Url: mongoose.Model<UrlDocument, UrlModel>;

try {
  //@ts-ignore
  Url = mongoose.model("Url", urlSchema);
} catch (error) {
  //@ts-ignore
  Url = mongoose.model<UrlDocument, UrlModel>("Url");
}

export default Url;
