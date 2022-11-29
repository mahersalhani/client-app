import { lazy, Suspense } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const CreateShop = lazy(() => import("./pages/CreateShop"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading....</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"/dashboard"} />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/create-shop" element={<CreateShop />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
