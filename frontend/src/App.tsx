import "./App.css";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Verifycode from "./pages/verify-code";
import ResendCode from "./pages/resend-code";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify" element={<Verifycode />} />
        <Route path="/resend" element={<ResendCode />} />
      </Routes>
    </Router>
  );
}

export default App;
