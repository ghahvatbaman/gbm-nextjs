import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { ExtendedNextApiRequest } from "../apiHanlder";

export const userAgentDetectorMiddleware = (
  req: ExtendedNextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  req.uaMobile = !!req.headers["x-gbm-mobile"];
  next();
};
