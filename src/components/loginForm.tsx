import { useLoginMutation } from "@/generated/graphql";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/router";
import { setAccessToken } from "@/utils/getAccessToken";

export default function LoginForm() {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const { replace } = useRouter();

   const [login, { loading, error }] = useLoginMutation({
      variables: { input: { email, password } },
   });

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const loginData = await login();
      if (loginData.data) {
         setAccessToken(loginData.data.signIn?.accessToken as string);
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
               <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  {/* <input type="hidden" name="remember" defaultValue="true" /> */}
                  <div className="rounded-md shadow-sm -space-y-px">
                     <div>
                        <label htmlFor="email-address" className="sr-only">
                           Email address
                        </label>
                        <input
                           id="email-address"
                           name="email"
                           type="email"
                           autoComplete="email"
                           required
                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                           placeholder="Email address"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                        />
                     </div>
                     <div>
                        <label htmlFor="password" className="sr-only">
                           Password
                        </label>
                        <input
                           id="password"
                           name="password"
                           type="password"
                           autoComplete="current-password"
                           required
                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                           placeholder="Password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                        />
                     </div>
                  </div>

                  <div>
                     <button
                        type="submit"
                        className="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                     >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                           <LockClosedIcon
                              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                              aria-hidden="true"
                           />
                        </span>
                        {loading ? <LoadingSpinner /> : "Sign In"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}

const LoadingSpinner = () => {
   return (
      <svg
         role="status"
         className="w-4 h-4 mr-2 text-gray-200 animate-spin fill-indigo-600"
         viewBox="0 0 100 101"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
         />
         <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
         />
      </svg>
   );
};
