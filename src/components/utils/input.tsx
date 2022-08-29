import cn from "classnames";
import React, { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";

interface Props {
   type: HTMLInputTypeAttribute | undefined;
   label: string;
   name: string;
   id: string;
   placeholder?: string;
   errorField?: string;
   value: string;
   onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<Props> = ({
   type,
   name,
   errorField,
   id,
   placeholder,
   onChange,
   value,
   label,
}) => {
   return (
      <div>
         <label htmlFor={id} className="sr-only">
            {label}
         </label>
         <input
            id={id}
            name={name}
            type={type}
            autoComplete="email"
            required
            className={cn(
               "appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 focus:relative sm:text-sm",
               {
                  "relative border-2 border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500":
                     errorField === name,
               },
               {
                  "rounded-t-md": name === "email",
               },
               {
                  "rounded-b-md": name === "password",
               }
            )}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
         />
      </div>
   );
};

export default Input;
