import { Router, Request, Response } from "express";
import { userModel } from "./schemas";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { transporter } from "./transporer";
export const router = Router();
function generateRandomCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

console.log(generateRandomCode());

router.route("/signup").post(async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(409).json({ message: "email is already registered" });
    } else {
      const pass = await bcrypt.hash(password, 10);
      const code = generateRandomCode();
      const new_user = await userModel.create({
        email,
        first_name,
        last_name,
        password: pass,
        code,
      });
      const mailOptions = {
        from: "blaganarpit@gmail.com", // Sender's email address
        to: email, // Recipient's email address
        subject: "Verification code:, // Email subject",
        html: `<b>Hello, here is your code ${code}</b>`,
      };
      await transporter.sendMail(mailOptions);
      res.status(202).json({ user: new_user });
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.route("/resend/code/:email").get(async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    const code = generateRandomCode();
    await userModel.updateOne({ email }, { code });
    const mailOptions = {
      from: "blaganarpit@gmail.com", // Sender's email address
      to: email, // Recipient's email address
      subject: "Verification code:, // Email subject",
      html: `<b>Hello, here is your code ${code}</b>`,
    };
    await transporter.sendMail(mailOptions);
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

router.route("/signin").post(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      if (user.isVerified) {
        const pass = user.password || "123";
        const ok = await bcrypt.compare(password, pass);
        if (ok) {
          const token = jwt.sign(
            {
              user: {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                id: user._id,
              },
            },
            "sadfae@@"
          );
          console.log("token", token);
          res.cookie("token", token, {
            sameSite: "none",
            httpOnly: true,
          });
          res.status(200).json({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          });
        } else {
          res
            .status(400)
            .json({ message: "wrong email password combination.." });
        }
      } else {
        res.status(400).json({
          message:
            "your account email address is not verified please verify it first.",
        });
      }
    } else {
      res.status(404).json({ message: "email is not regisitered with use" });
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});
router.route("/logout").get(async (req: Request, res: Response) => {
  res.cookie("token", "", { sameSite: "none", httpOnly: true, secure: true });
  res.status(200).json({ message: "logged out successfully" });
});
