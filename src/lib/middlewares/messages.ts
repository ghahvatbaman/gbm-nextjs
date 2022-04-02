import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { enMessages } from "../../constants/messages/en";
import { faMessages } from "../../constants/messages/fa";
import { ExtendedNextApiRequest } from "../apiHanlder";

export const messageLanguageMiddleware = (
  req: ExtendedNextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const lang = req.headers["accept-language"];
  req.messages = lang === "fa" ? faMessages : enMessages;
  next();
};
