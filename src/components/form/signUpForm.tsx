import { useSignUpMutation } from "@/generated/graphql";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setAccessToken } from "@/utils/getAccessToken";
import cn from "classnames";
import Input from "../utils/input";
import LoadingSpinner from "../icons/loadingSpinner";
import SubmitButton from "../utils/submitButton";

export default function SignUpForm() {
   const [email, setEmail] = useState<string>("");
   const [name, setName] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const { replace } = useRouter();

   const [signUp, { loading, data }] = useSignUpMutation({
      variables: { input: { email, password, name } },
   });

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const signUpData = await signUp();

      if (signUpData.data && !signUpData.data.signUp.error) {
         setAccessToken(signUpData.data.signUp.accessToken);
         replace("/");
      }
   };

   return (
      <>
         <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 mb-16">
               <div>
                  <h2 className="text-center text-3xl font-extrabold text-gray-900">
                     Register a new account
                  </h2>
               </div>
               <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
                  {/* <input type="hidden" name="remember" defaultValue="true" /> */}
                  <div className="rounded-md shadow-sm -space-y-px">
                     <Input
                        id="email-address"
                        label="Email Address"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        value={email}
                        errorField={data?.signUp.error?.field}
                        placeholder="Email Address"
                     />
                     <Input
                        id="name"
                        label="Username"
                        name="name"
                        onChange={e => setName(e.target.value)}
                        type="text"
                        value={name}
                        errorField={data?.signUp.error?.field}
                        placeholder="Username"
                     />
                     <Input
                        id="password"
                        label="Password"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        value={password}
                        errorField={data?.signUp.error?.field}
                        placeholder="Password"
                     />
                  </div>

                  {data?.signUp.error && (
                     <div>
                        <span className="text-sm font-medium text-red-500">
                           {data.signUp.error.message}
                        </span>
                     </div>
                  )}

                  <div>
                     <SubmitButton loading={loading}>Sign Up</SubmitButton>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}
