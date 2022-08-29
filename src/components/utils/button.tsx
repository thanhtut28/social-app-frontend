export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
   specialProp?: string;
}

interface Props extends ButtonProps {
   children: React.ReactNode;
}

const BASE_CLASSES = `inline-flex justify-center py-1 px-2 border border-gray-300 text-sm rounded focus:outline-none disabled:opacity-50 bg-transparent text-gray-700 hover:bg-gray-50 font-medium`;

const Button: React.FC<Props> = ({ children, className, ...rest }) => {
   return (
      <button className={`${BASE_CLASSES} ${className}`} {...rest}>
         {children}
      </button>
   );
};

export default Button;
