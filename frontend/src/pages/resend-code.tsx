import { useState } from "react";
import { backendUrl } from "../contant";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";

const ResendCode = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(backendUrl + "/api/resend/code", { email });
      toast.success("New code send to your email address.");
    } catch (err) {
      toast.error(
        "Something went wrong while sending the code to your provided email."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border rounded-xl p-3 md:w-1/2 w-8/12 mx-2">
        <div className="mb-4">
          <p className="text-center font-bold text-3xl">Resend code</p>
        </div>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full pl-3 h-[50px] border-b "
          />
          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 px-4 font-semibold bg-purple-900 text-white rounded-xl mt-2"
          >
            Resend code
          </button>
          <Link
            to="/signin"
            className="font-semibold border rounded-xl flex items-center justify-center py-2 cursor-pointer"
          >
            Sign in
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResendCode;
