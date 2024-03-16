import axios from "axios";

export const handleOnclick = async (inputValue: string) => {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE}/api`, {
    inputValue,
  });
  const shortnedUrl = res.data;
  return shortnedUrl;
};
