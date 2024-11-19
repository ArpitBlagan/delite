import { Link } from "react-router-dom";

const Verifycode = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border rounded-xl p-3 md:w-1/2 w-8/12 mx-2">
        <div className="mb-4">
          <p className="text-center font-bold text-3xl">Verify code</p>
        </div>
        <form className="flex flex-col gap-4 w-full">
          <input
            placeholder="Email"
            className="w-full pl-3 h-[50px] border-b "
          />
          <input
            placeholder="Code"
            className="w-full pl-3 h-[50px] border-b "
          />
          <button className="w-full py-2 px-4 font-semibold bg-purple-900 text-white rounded-xl mt-2">
            Verify
          </button>
          <Link
            to="/resend"
            className="font-semibold border rounded-xl flex items-center justify-center py-2 cursor-pointer"
          >
            Resend code
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Verifycode;
