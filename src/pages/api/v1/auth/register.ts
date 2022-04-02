import { NextApiHandler } from "next";
import apiHandler from "../../../../lib/apiHanlder";
import prisma from "../../../../lib/prismaClient";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default apiHandler.post(async (req, res) => {
  try {
    // validation
    if (
      !req.body.password &&
      (!req.body.username || !req.body.email || !req.body.phoneNumber)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials", data: {} });
    }

    const newUser = await prisma.user.create({
      data: {
        email: req.body.email || null,
        phoneNumber: req.body.phoneNumber || null,
        password: await argon2.hash(req.body.password),
      },
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, "secret", {
      expiresIn: "1d",
    });

    const { password, ...user } = newUser;

    if (!!req.headers["x-gbm-mobile"]) {
      // authorization header
      res.setHeader("x-authorization", token);
      return res.status(201).json({
        success: true,
        message: "",
        data: { user, token },
      });
    } else {
      // cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
        })
      );
      return res.status(200).json({
        success: true,
        message: "user created",
        data: { user, token },
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      data: { error_message: err },
    });
  }
});
