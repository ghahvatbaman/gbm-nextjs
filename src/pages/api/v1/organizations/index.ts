import apiHandler from "../../../../lib/apiHanlder";
import { authMiddleware } from "../../../../lib/middlewares/auth";
import prisma from "../../../../lib/prismaClient";

export default apiHandler
  .get(async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        message: "",
        data: {
          organizations: await prisma.organization.findMany(),
        },
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
  })
  .use(authMiddleware)
  .post(async (req, res) => {
    try {
      const users = [];
      users.push({ user: { connect: { id: req.user.id } }, role: "admin" });

      if (Array.isArray(req.body.users)) {
        req.body.users.map((item: { id: number }) => {
          users.push({ user: { connect: { id: +item.id } } });
        });
      }
      const newOrg = await prisma.organization.create({
        data: {
          organizationName: req.body.organization_name,
          users: {
            create: users,
          },
        },
      });

      return res
        .status(201)
        .json({ success: true, message: "", data: { organization: newOrg } });
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
