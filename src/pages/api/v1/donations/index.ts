import apiHandler from "../../../../lib/apiHanlder";
import { authMiddleware } from "../../../../lib/middlewares/auth";
import prisma from "../../../../lib/prismaClient";

export default apiHandler
  .get(async (req, res) => {})
  .use(authMiddleware)
  .post(async (req, res) => {
    try {
      await prisma.$transaction(async (prisma) => {
        const donatorProfile = await prisma.profile.findUnique({
          where: { id: req.user.id },
        });
        const recieverProfile = await prisma.profile.findUnique({
          where: { id: req.body.reciever_id },
        });

        if (!donatorProfile && !recieverProfile) {
          return res
            .status(404)
            .json({ success: false, message: "profile not found", data: {} });
        }

        if (donatorProfile!.balance < +req.body.amount) {
          return res
            .status(400)
            .json({ success: false, message: "insufficient found", data: {} });
        }

        const newDonatation = await prisma.donation.create({
          data: {
            amount: +req.body.amount,
            donator: {
              connect: {
                id: req.user.id,
              },
            },
            reciever: {
              connect: {
                id: req.body.reciever_id,
              },
            },
          },
        });

        const updatedDonatorProfile = await prisma.profile.update({
          where: { id: req.user.id },
          data: { balance: donatorProfile!.balance - +req.body.amount },
        });

        const updatedRecieverProfile = await prisma.profile.update({
          where: { id: +req.body.reciever_id },
          data: { balance: recieverProfile!.balance + +req.body.amount },
        });

        return res.status(202).json({
          success: true,
          message: "donation was successful",
          data: {
            updatedDonatorProfile,
            updatedRecieverProfile,
            donation: newDonatation,
          },
        });
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
