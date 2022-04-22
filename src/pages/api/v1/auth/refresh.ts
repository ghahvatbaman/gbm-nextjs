import apiHandler from "lib/apiHanlder";
import jwt from "jsonwebtoken";
import prisma from "lib/prismaClient";
import cookie from "cookie";

export default apiHandler.post(async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const payload = jwt.verify(refreshToken, "secret");
    const token = await prisma.verfiedToken.findFirst({
      where: { userId: (payload as any).id },
      include: { User: { select: { email: true } } },
    });
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "not authenticated", data: {} });
    }
    const accessToken = jwt.sign(
      { id: (payload as any).id, email: token.User.email },
      "secret",
      {
        expiresIn: "1d",
      }
    );
    const newRefreshToken = jwt.sign({ id: token.userId }, "secret", {
      expiresIn: "16W",
    });

    await prisma.verfiedToken.delete({
      where: { userId: (payload as any).id },
    });
    await prisma.user.update({
      where: { id: token.userId },
      data: { token: { create: { token: newRefreshToken } } },
    });

    if (!!req.headers["x-gbm-mobile"]) {
      // authorization header
      res.setHeader("x-authorization", accessToken);
      return res.status(201).json({
        success: true,
        message: "",
        data: { accessToken, newRefreshToken },
      });
    } else {
      // cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", accessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
        })
      );
      return res.status(200).json({
        success: true,
        message: "new refresh token generated",
        data: { accessToken, newRefreshToken },
      });
    }
  } catch (err) {}
});
