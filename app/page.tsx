import { Appbar } from "./compoents/Appbar";
import { UrlInput } from "./compoents/UrlInput";

export default function Home() {
  return (
    <div className="bg-black">
      <div className="sticky top-0">
        <Appbar />
      </div>
      <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
          <UrlInput />
        </div>
      </div>
    </div>
  );
}
