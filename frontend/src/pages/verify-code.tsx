import { useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl } from "../contant";
import axios from "axios";
import { toast } from "sonner";

const Verifycode = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(backendUrl + "/api/verify/email", { email, code });
      toast.success("Email got verified successfully.");
    } catch (err) {
      toast.error(
        "Verification failed please check the email and code combination."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border rounded-xl p-3 md:w-1/2 w-8/12 mx-2">
        <div className="mb-4">
          <p className="text-center font-bold text-3xl">Verify code</p>
        </div>
        <form className="flex flex-col gap-4 w-full">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            className="w-full pl-3 h-[50px] border-b "
          />
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            placeholder="Code"
            className="w-full pl-3 h-[50px] border-b "
          />
          <button
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full py-2 px-4 font-semibold bg-purple-900 text-white rounded-xl mt-2"
          >
            {loading ? "Verifying" : "Verify"}
          </button>
          <Link
            to="/resend"
            className="font-semibold border rounded-xl flex items-center justify-center py-2 cursor-pointer"
          >
            Resend code
          </Link>
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

export default Verifycode;
