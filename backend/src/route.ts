import { Router, Request, Response } from "express";
import { userModel } from "./schemas";
import bcrypt from "bcryptjs";
export const router = Router();

router.route("/signup").post(async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(409).json({ message: "email is already registered" });
    } else {
      const pass = await bcrypt.hash(password, 10);
      const new_user = await userModel.create({
        email,
        first_name,
        last_name,
        password: pass,
        code: "",
      });
      res.status(202).json({ user: new_user });
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.route("/resend/code/:email").get(async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    const code = "";
    await userModel.updateOne({ email }, { code });
    //await sendCode()
    res.status(202).json({ message: "operation done successfully." });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.route("/verify/email").post(async (req: Request, res: Response) => {
  const { code, email } = req.body;
  try {
    const userInfo = await userModel.findOne({ email });
    if (userInfo) {
      if (userInfo.code == code) {
        await userModel.updateOne({ email }, { isVerified: true });
        res.status(200).json({ message: "email verified successfully" });
      } else {
        res.status(400).json({
          message: "code mismatch! check your email or regenerate the code",
        });
      }
    } else {
      res
        .status(404)
        .json({ message: "There is no user regisitered with the given email" });
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.route("/signin").post(async (req: Request, res: Response) => {});
