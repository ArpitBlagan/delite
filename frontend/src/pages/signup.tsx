import { Link } from "react-router-dom";
import signup from "../assets/signup.png";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { backendUrl } from "../contant";
import axios from "axios";
import { toast } from "sonner";
const signupSchema = z
  .object({
    first_name: z.string().min(1, "Please provide your first_name."),
    last_name: z.string().min(1, "Please provide your last_name."),
    email: z.string().email("Please provide valid email address."),
    password: z
      .string()
      .min(6, "Password should be atleast 6 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });
type signup = z.infer<typeof signupSchema>;
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signup>({ resolver: zodResolver(signupSchema) });
  const onSubmit: SubmitHandler<signup> = async (data) => {
    setLoading(true);
    try {
      await axios.post(
        backendUrl + "/api/signup",
        {
          ...data,
        },
        { withCredentials: true }
      );
      toast.success("Sign up successfully");
    } catch (err) {
      toast.error("Not able to Sign you up pls try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="md:grid grid-cols-2 gap-2 flex flex-col h-screen items-center justify-center mx-3 md:mx-0">
      <img src={signup} className="hidden md:block" />
      <div className="flex items-center justify-center w-full">
        <form
          className="border rounded-xl p-5 w-full md:w-8/12 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-between">
            <p className="font-bold text-3xl text-purple-900">
              Let us Know <span className="text-red-500">!</span>
            </p>
            <Link className="underline font-bold" to="/signin">
              Sign <span className="text-red-500">In</span>
            </Link>
          </div>
          <input
            {...register("first_name")}
            placeholder="First name"
            className="w-full pl-3 h-[50px] border-b "
          />
          {errors.first_name && (
            <span className="text-red-500">{errors.first_name.message}</span>
          )}
          <input
            {...register("last_name")}
            placeholder="Last name"
            className="w-full pl-3 h-[50px] border-b "
          />
          {errors.last_name && (
            <span className="text-red-500">{errors.last_name.message}</span>
          )}
          <input
            {...register("password")}
            placeholder="Set password"
            className="w-full pl-3 h-[50px] border-b "
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <input
            {...register("confirmPassword")}
            placeholder="Retype password"
            className="w-full pl-3 h-[50px] border-b "
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full pl-3 h-[50px] border-b "
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold py-2 px-4 bg-purple-900 text-white rounded-xl mt-2"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
