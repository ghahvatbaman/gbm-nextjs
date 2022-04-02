import apiHandler from "../../../../lib/apiHanlder";
import { authMiddleware } from "../../../../lib/middlewares/auth";
import prisma from "../../../../lib/prismaClient";

export default apiHandler
  .get(async (req, res) => {
    try {
      const page = +req.query.page || 1;
      const perPage = 10;
      return res.status(200).json({
        success: true,
        message: "",
        data: {
          profiles: await prisma.profile.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
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
  .post(async (req, res) => {
    try {
      console.log(req.user.id);
      const profile = await prisma.profile.create({
        data: {
          profileName: req.body.profile_name,
          user: {
            connect: {
              id: req.user.id,
            },
          },
        },
      });
      return res.status(201).json({
        success: true,
        message: "profile created",
        data: {
          profile: profile,
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
  });
