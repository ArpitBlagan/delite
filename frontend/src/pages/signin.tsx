import { Link, useNavigate } from "react-router-dom";
import signin from "../assets/signin.png";
import { useState } from "react";
import { backendUrl } from "../contant";
import axios from "axios";
import { toast } from "sonner";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiEyeCloseFill, RiEyeFill } from "@remixicon/react";
const signinSchema = z.object({
  email: z.string().email("Please provide valid registered email address"),
  password: z.string().min(6, "Password should be atleast 6 characters long"),
});
type signin = z.infer<typeof signinSchema>;

const Signin = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signin>({ resolver: zodResolver(signinSchema) });
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<signin> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        backendUrl + "/api/signin",
        { ...data },
        { withCredentials: true }
      );
      toast.success("sign in successfully");
      navigate("/home", {
        state: {
          ...res.data,
        },
      });
    } catch (err) {
      toast.error("something went wrong not able to sign you in");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="md:grid grid-cols-2 gap-2 flex flex-col h-screen items-center justify-center mx-3 md:mx-0">
      <img src={signin} className="hidden md:block" />
      <div className="flex items-center justify-center w-full">
        <form
          className="border rounded-xl p-5 w-full md:w-8/12 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-between">
            <p className="font-bold text-3xl text-purple-900">
              Let us Know <span className="text-red-500">!</span>
            </p>
          </div>
          <input
            placeholder="blaganarpit@gmail.com"
            {...register("email")}
            className="w-full pl-3 h-[50px] border-b "
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          <div style={{ position: "relative" }}>
            <input
              type={show ? "text" : "password"}
              {...register("password")}
              placeholder="123456"
              className="w-full pl-3 h-[50px] border-b "
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShow(!show);
              }}
              style={{
                position: "absolute",
                right: "0.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {show ? <RiEyeCloseFill /> : <RiEyeFill />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 font-semibold bg-purple-900 text-white rounded-xl mt-2"
          >
            {loading ? "Signing in" : "Sign in"}
          </button>
          <Link
            to="/"
            className="font-semibold border rounded-xl flex items-center justify-center py-2 cursor-pointer"
          >
            Signup
          </Link>
          <Link
            to="/verify"
            className="font-semibold border rounded-xl flex items-center justify-center py-2 cursor-pointer"
          >
            Verify your account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signin;
