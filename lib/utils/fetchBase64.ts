const fetchBase64 = async (url: string) => {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type");
  return `data:${contentType};base64,${buffer.toString("base64")}`;
};

export default fetchBase64;
