import { InputHTMLAttributes } from "react"
import { InputProps } from "../../interfaces"

const Input: React.FC<InputProps & InputHTMLAttributes<any>> = ({ name, label, ...props }) => {
  return (
    <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-inner bg-slate-50 ring-0">
      <label
        htmlFor={name}
        className="block text-xs font-semibold text-slate-500"
      >
        {label || name}
      </label>
      <input
        id={name}
        name={name}
        className="block w-full bg-transparent border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
        {...props}
      />
    </div>
  )
}

export default Input