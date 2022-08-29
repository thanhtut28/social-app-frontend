import SignUpForm from "@/components/form/signUpForm";
import { NextPage } from "next";

const Login: NextPage = () => {
   return (
      <div className="h-screen">
         <SignUpForm />
      </div>
   );
};

export default Login;
