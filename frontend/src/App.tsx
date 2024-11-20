import "./App.css";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Verifycode from "./pages/verify-code";
import ResendCode from "./pages/resend-code";
import { Toaster } from "sonner";
import Home from "./pages/home";
function App() {
  return (
    <Router>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify" element={<Verifycode />} />
        <Route path="/resend" element={<ResendCode />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
