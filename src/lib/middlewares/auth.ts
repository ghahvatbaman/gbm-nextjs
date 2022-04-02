import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { ExtendedNextApiRequest } from "../apiHanlder";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../prismaClient";

export const authMiddleware = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    let token;
    if (req.uaMobile) {
      if (!req.headers.cookie) {
        return res
          .status(401)
          .json({ success: false, message: "not authenticated", data: {} });
      }
      const parsedData = cookie.parse(req.headers.cookie);
      if (!parsedData.token) {
        return res
          .status(401)
          .json({ success: false, message: "not authenticated", data: {} });
      }
      token = parsedData.token;
    } else {
      if (!req.headers["authorization"]) {
        return res.status(401).json({
          success: false,
          message: "not authenticated",
          data: {},
        });
      }

      token = req.headers["authorization"];
    }

    const payload = jwt.verify(token, "secret");
    const user = await prisma.user.findUnique({
      where: { id: (payload as any).id },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found", data: {} });
    }
    const { password, ...userWithoutPass } = user;
    req.user = userWithoutPass;
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "user not found",
      data: { error_message: err },
    });
  }
};
