import apiHandler from "lib/apiHanlder";
import prisma from "lib/prismaClient";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default apiHandler.post(async (req, res) => {
  try {
    if (!req.body.password && !req.body.type && !req.body.lookup) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials", data: {} });
    }

    const foundedUser = await prisma.user.findUnique({
      where: {
        [`${req.body.type}`]: req.body.lookup,
      },
    });
    if (!foundedUser) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials", data: {} });
    }

    if (!(await argon2.verify(foundedUser.password, req.body.password))) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials", data: {} });
    }

    const { password, ...user } = foundedUser;

    const token = jwt.sign(
      { id: foundedUser.id, email: foundedUser.email },
      "secret",
      {
        expiresIn: "1d",
      }
    );

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
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      data: { error_message: err },
    });
  }
});
