const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return <div className="max-w-screen-md mx-auto">{children}</div>;
};

export default Wrapper;
