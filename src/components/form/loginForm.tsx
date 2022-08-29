import { useLoginMutation } from "@/generated/graphql";
import { useState } from "react";
import { useRouter } from "next/router";
import { setAccessToken } from "@/utils/getAccessToken";
import Input from "../utils/input";
import SubmitButton from "../utils/submitButton";

export default function LoginForm() {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const { replace } = useRouter();

   const [signUp, { loading, data }] = useLoginMutation({
      variables: { input: { email, password } },
   });

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const loginData = await signUp();

      if (loginData.data && !loginData.data.signIn.error) {
         setAccessToken(loginData.data.signIn.accessToken);
         replace("/");
      }
   };

   return (
      <>
         <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 mb-16">
               <div>
                  <h2 className="text-center text-3xl font-extrabold text-gray-900">
                     Sign in to your account
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
                        errorField={data?.signIn.error?.field}
                        placeholder="Email Address"
                     />

                     <Input
                        id="password"
                        label="Password"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        value={password}
                        errorField={data?.signIn.error?.field}
                        placeholder="Password"
                     />
                  </div>

                  {data?.signIn.error && (
                     <div>
                        <span className="text-sm font-medium text-red-500">
                           {data.signIn.error.message}
                        </span>
                     </div>
                  )}

                  <div>
                     <SubmitButton loading={loading}>Sign In</SubmitButton>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}
