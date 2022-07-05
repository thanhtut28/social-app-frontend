export const getAccessToken = () => {
   if (typeof window !== undefined) {
      return localStorage.getItem("token");
   }

   return "";
};

export const setAccessToken = (token: string) => {
   if (typeof window !== undefined) {
      return localStorage.setItem("token", token);
   }

   return "";
};
