import LoginForm from "@/components/form/loginForm";
import { NextPage } from "next";

const Login: NextPage = () => {
   return (
      <div className="h-screen">
         <LoginForm />
      </div>
   );
};

export default Login;
