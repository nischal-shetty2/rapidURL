"use client";
import { redirect, useSearchParams } from "next/navigation";
import { getdata } from "../actions/redirect";

const support = async (urlId: string) => {
  try {
    const res = await getdata(urlId);
    if (!res) return;

    return res;
  } catch (e) {
    console.error(e);
  }
};

export default async function Page() {
  const searchParams = useSearchParams();
  const urlId = searchParams.get("u");
  if (!urlId) return;

  const res = await support(urlId);

  redirect(`${res}`);
}
