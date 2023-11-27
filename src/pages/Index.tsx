import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import { FormData } from "../interfaces"
import { toast, ToastContainer } from "react-toast"
import { strSlugify } from "../lib/str"

const Index = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({ board: '' })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target

    if (name == 'board') {
      value = strSlugify(value)
    }

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event: FormEvent) => {
    event.preventDefault()

    if (!formData.board || formData.board.length < 1) {
      return toast.error('Please fill required field.')
    }

    navigate(`board/${formData.board}`)
  }

  return (
    <>
      <form
        className="space-y-3 mx-auto flex w-full max-w-sm flex-auto flex-col justify-center p-6 lg:p-8 mt-24 bg-white shadow-xl rounded-lg"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="board"
          label="Type new or existing board name"
          placeholder="Ex: my-first-board"
          value={formData.board}
          onChange={handleChange}
        />
        <Button type="submit">Join and Play now!</Button>
      </form>
      <ToastContainer
        position="bottom-right"
        delay={2000}
      />
    </>
  )
}

export default Index