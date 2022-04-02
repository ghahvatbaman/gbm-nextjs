import apiHandler from "../../../../lib/apiHanlder";
import { authMiddleware } from "../../../../lib/middlewares/auth";
import prisma from "../../../../lib/prismaClient";

export default apiHandler
  .get(async (req, res) => {
    try {
      return res.json({
        success: true,
        message: "",
        data: {
          profile: await prisma.profile.findUnique({
            where: { id: +req.query.id },
            include: {
              posts: true,
              user: true,
            },
          }),
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "something went wrong, server error",
        data: {
          error_message: err,
        },
      });
    }
  })
  .use(authMiddleware)
  .put(async (req, res) => {})
  .patch(async (req, res) => {})
  .delete(async (req, res) => {
    try {
      await prisma.profile.delete({ where: { id: +req.query.id } });
      return res.status(204).json({
        success: true,
        message: "",
        data: {},
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "something went wrong, server error",
        data: {
          error_message: err,
        },
      });
    }
  });
