import LoginForm from "@/components/loginForm";
import { NextPage } from "next";

const Login: NextPage = () => {
   return (
      <div className="h-screen">
         <LoginForm />
      </div>
   );
};

export default Login;
