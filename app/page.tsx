import { Appbar } from "./compoents/Appbar";
import { UrlInput } from "./compoents/UrlInput";

export default function Home() {
  return (
    <>
      <div className="sticky top-0">
        <Appbar />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center h-screen">
          <div className="text-white flex justify-center pb-4 text-xl">
            Enter the URL to be shortened
          </div>
          <UrlInput />
        </div>
      </div>
    </>
  );
}
