import apiHandler from "../../lib/apiHanlder";
import { authMiddleware } from "../../lib/middlewares/auth";

export default apiHandler.use(authMiddleware).get(async (req, res) => {
  return res
    .status(200)
    .json({
      success: true,
      message: "data:::",
      data: { uaMobile: req.uaMobile, user: req.user },
    });
});
