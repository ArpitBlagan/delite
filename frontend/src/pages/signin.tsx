import { Link } from "react-router-dom";
import signin from "../assets/signin.png";

const Signin = () => {
  return (
    <div className="md:grid grid-cols-2 gap-2 flex flex-col h-screen items-center justify-center mx-3 md:mx-0">
      <img src={signin} className="hidden md:block" />
      <div className="flex items-center justify-center w-full">
        <form className="border rounded-xl p-5 w-full md:w-8/12 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="font-bold text-3xl text-purple-900">
              Let us Know <span className="text-red-500">!</span>
            </p>
          </div>
          <input
            placeholder="Email"
            className="w-full pl-3 h-[50px] border-b "
          />
          <input
            placeholder="Retype password"
            className="w-full pl-3 h-[50px] border-b "
          />
          <button className="w-full py-2 px-4 font-semibold bg-purple-900 text-white rounded-xl mt-2">
            Signin
          </button>
          <Link
            to="/signup"
            className="font-semibold border rounded-xl flex items-center justify-center py-2 cursor-pointer"
          >
            Signup
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signin;
