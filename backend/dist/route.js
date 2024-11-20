"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const schemas_1 = require("./schemas");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const transporer_1 = require("./transporer");
exports.router = (0, express_1.Router)();
function generateRandomCode() {
    return Math.floor(1000 + Math.random() * 9000);
}
console.log(generateRandomCode());
exports.router.route("/signup").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, password } = req.body;
    try {
        const user = yield schemas_1.userModel.findOne({ email });
        if (user) {
            res.status(409).json({ message: "email is already registered" });
        }
        else {
            const pass = yield bcryptjs_1.default.hash(password, 10);
            const code = generateRandomCode();
            const new_user = yield schemas_1.userModel.create({
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
            yield transporer_1.transporter.sendMail(mailOptions);
            res.status(202).json({ user: new_user });
        }
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong" });
    }
}));
exports.router.route("/resend/code/:email").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    try {
        const code = generateRandomCode();
        yield schemas_1.userModel.updateOne({ email }, { code });
        const mailOptions = {
            from: "blaganarpit@gmail.com", // Sender's email address
            to: email, // Recipient's email address
            subject: "Verification code:, // Email subject",
            html: `<b>Hello, here is your code ${code}</b>`,
        };
        yield transporer_1.transporter.sendMail(mailOptions);
        res.status(202).json({ message: "operation done successfully." });
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong" });
    }
}));
exports.router.route("/verify/email").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, email } = req.body;
    try {
        const userInfo = yield schemas_1.userModel.findOne({ email });
        if (userInfo) {
            if (userInfo.code == code) {
                yield schemas_1.userModel.updateOne({ email }, { isVerified: true });
                res.status(200).json({ message: "email verified successfully" });
            }
            else {
                res.status(400).json({
                    message: "code mismatch! check your email or regenerate the code",
                });
            }
        }
        else {
            res
                .status(404)
                .json({ message: "There is no user regisitered with the given email" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong" });
    }
}));
exports.router.route("/signin").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield schemas_1.userModel.findOne({ email });
        if (user) {
            if (user.isVerified) {
                const pass = user.password || "123";
                const ok = yield bcryptjs_1.default.compare(password, pass);
                if (ok) {
                    const token = jsonwebtoken_1.default.sign({
                        user: {
                            email: user.email,
                            id: user._id,
                        },
                    }, "sadfae@@");
                    res.cookie("jwt", token, { sameSite: "none" });
                    res.status(200).json({ message: "user logged in successfully" });
                }
                else {
                    res
                        .status(400)
                        .json({ message: "wrong email password combination.." });
                }
            }
            else {
                res.status(400).json({
                    message: "your account email address is not verified please verify it first.",
                });
            }
        }
        else {
            res.status(404).json({ message: "email is not regisitered with use" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong" });
    }
}));
