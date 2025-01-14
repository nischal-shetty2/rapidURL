import axios from "axios";

export const handleOnclick = async (inputValue: string) => {
  const res = await axios.post(`${window.location.origin}/api`, {
    inputValue,
  });
  const shortnedUrl = res.data;
  return shortnedUrl;
};
