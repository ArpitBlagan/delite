import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, []);
  if (location.state == null) {
    return (
      <div>
        <Link to="/signin">Signin</Link>
      </div>
    );
  } else {
    const { first_name, last_name, email } = location.state;
    return (
      <div className="flex flex-col h-screen">
        <div className="bg-purple-900 h-[50px] flex items-center justify-between px-5">
          <p className="font-semibold text-2xl text-white">Dashboard</p>
          <button className="bg-white text-purple-900 py-2 px-4 rounded-xl font-medium">
            Sign Out
          </button>
        </div>
        <div className="flex-1">
          <div className="border py-2 px-3 rounded-xl">
            <p className="font-semibold text-3xl">
              Welcome {first_name} {last_name}
            </p>
            <p className="text-xl font-medium">Eamil: {email}</p>
          </div>
        </div>
        <div className="bg-purple-900 h-[50px]"></div>
      </div>
    );
  }
};

export default Home;
