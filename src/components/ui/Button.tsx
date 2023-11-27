import { ButtonHTMLAttributes } from "react"

const Button: React.FC<ButtonHTMLAttributes<any>> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className="px-6 h-10 bg-blue-600 rounded-lg select-none
      active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
      active:border-b-[0px]
      transition-all ease-in-out duration-75 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
      border-b-[1px] border-blue-400"
      {...props}
    >
      <span className="flex flex-col justify-center items-center h-full text-white font-bold text-sm tracking-wide">{children}</span>
    </button>
  )
}

export default Button