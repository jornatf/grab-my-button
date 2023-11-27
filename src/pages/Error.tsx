import { ChevronLeftIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"
import { ErrorPageProps } from "../interfaces"

const Error: React.FC<ErrorPageProps> = ({ ...props }) => {
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    switch (props.code) {
      case 404:
        setMessage('Page not Found')
        break
    
      default:
        setMessage('An error occurred')
        break
    }
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
      <p className="text-base font-semibold leading-8">{props.code}</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl uppercase">{message}</h1>
      <div className="mt-10">
        <a
          href="/"
          className="text-sm font-semibold leading-7 text-blue-600 flex items-center"
        >
          <ChevronLeftIcon className="w-4 h-4" /> Back to home
        </a>
      </div>
    </div>
  )
}

export default Error