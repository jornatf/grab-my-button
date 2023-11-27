import { MouseEventHandler, MouseEvent, useState, useEffect } from "react"
import { storageGet } from "../lib/storage"
import socket from "../socket"
import Cursor from "./Cursor"
import { UserData } from "../interfaces"

const CursorBoard = () => {
  const [users, setUsers] = useState<UserData[]>([])

  const handleCursorPosition: MouseEventHandler<HTMLDivElement> = (event: MouseEvent) => {
    const user = storageGet('user')
    const cursorPosX = event.clientX
    const cursorPosY = event.clientY

    socket.emit('updateUserPosition', { user, cursorPosX, cursorPosY })
  }

  const onUsers = (users: UserData[]) => {
    setUsers(users)
  }

  useEffect(() => {
    socket.on('users', onUsers)

    return () => {
      socket.off('users')
    }
  }, [])

  return (
    <div
      className="absolute w-screen h-screen z-0 -mt-10"
      onMouseMove={handleCursorPosition}
    >
      {users.map((user, index) => (
        user.id !== socket.id &&
          <Cursor
            key={index}
            top={user.cursorPosY}
            left={user.cursorPosX}
            color={user.color}
          />
        )
      )}
    </div>
  )
}

export default CursorBoard