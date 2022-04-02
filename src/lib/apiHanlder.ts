import { Prisma, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { TMeesage } from "../constants/messages/meesages";
import { messageLanguageMiddleware } from "./middlewares/messages";
import { userAgentDetectorMiddleware } from "./middlewares/ua";

export type ExtendedNextApiRequest = NextApiRequest & {
  uaMobile: boolean;
  user: Partial<User>;
  messages: TMeesage;
};

const apiHandler = nc<ExtendedNextApiRequest, NextApiResponse>({
  attachParams: true,
  onError: (err, req, res, next) => {
    return res.status(500).json({
      success: false,
      message: "server error",
      data: { error_message: err.toString() },
    });
  },
  onNoMatch: (req, res) => {
    return res
      .status(404)
      .json({ success: false, message: "route not found", data: {} });
  },
})
  .use(userAgentDetectorMiddleware)
  .use(messageLanguageMiddleware);

export default apiHandler;
