import { IncomingMessage } from "http";

const absoluteUrl = (
  req?: IncomingMessage,
  localhostAddress = "localhost:3000"
) => {
  let host =
    (req?.headers ? req.headers.host : window.location.host) ||
    localhostAddress;
  let protocol = /^(localhost)|(127.0.0.1)(:\d+)?$/.test(host)
    ? "http:"
    : "https:";

  if (
    req &&
    req.headers["x-forwarded-host"] &&
    typeof req.headers["x-forwarded-host"] === "string"
  ) {
    host = req.headers["x-forwarded-host"];
  }

  if (
    req &&
    req.headers["x-forwarded-proto"] &&
    typeof req.headers["x-forwarded-proto"] === "string"
  ) {
    protocol = `${req.headers["x-forwarded-proto"]}:`;
  }

  return {
    protocol,
    host,
    origin: protocol + "//" + host,
  };
};

export default absoluteUrl;
