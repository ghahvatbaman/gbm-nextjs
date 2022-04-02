import apiHandler from "../../../../../lib/apiHanlder";
import { authMiddleware } from "../../../../../lib/middlewares/auth";
import prisma from "../../../../../lib/prismaClient";

export default apiHandler
  .get(async (req, res) => {})
  .use(authMiddleware)
  .put(async (req, res) => {
    try {
      // TODO: transaction should happen here first, technically these functionality are for the callback

      const prevoiusBalance = await prisma.profile.findUnique({
        where: {
          userId: req.user.id,
        },
        select: {
          balance: true,
        },
      });
      const newProfile = await prisma.profile.update({
        where: { userId: req.user.id },
        data: {
          balance: req.body.amount + prevoiusBalance?.balance,
        },
      });

      return res.status(202).json({
        success: true,
        message: "",
        data: { profile: newProfile },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "something went wrong, server error",
        data: {
          error_message: err,
        },
      });
    }
  });
