import apiHandler from "../../../../lib/apiHanlder";
import { authMiddleware } from "../../../../lib/middlewares/auth";
import prisma from "../../../../lib/prismaClient";

export default apiHandler
  .get(async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        message: "",
        data: { posts: await prisma.post.findMany() },
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
      type TValidEntityName = "organization" | "profile";

      if (!["organization", "profile"].includes(req.body.entity)) {
        return res.status(400).json({
          success: false,
          message: "invalid payload",
          data: {},
        });
      }

      const newPost = await prisma.post.create({
        data: {
          content: req.body.content,
          entity: req.body.entity,
          // profile: {
          //   connect: {
          //     id: +req.body.entityId,
          //   },
          // },

          [`${req.body.entity as TValidEntityName}`]: {
            connect: { id: +req.body.entityId },
          },
        },
      });

      return res.status(201).json({
        success: true,
        message: "",
        data: {
          newPost: newPost,
        },
      });
    } catch (err) {
      console.log("err: ", err);
      return res.status(500).json({
        success: false,
        message: "something went wrong, server error",
        data: {
          error_message: err,
        },
      });
    }
  });
