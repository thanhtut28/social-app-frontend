import Wrapper from "@/components/wrapper";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <div>
         <div className="py-10" />
         <Wrapper>{children}</Wrapper>
      </div>
   );
};

export default Layout;
