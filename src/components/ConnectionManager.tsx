import { MouseEventHandler, MouseEvent, useEffect, useState } from "react"
import { toast } from "react-toast"
import { storageSet } from "../lib/storage"
import socket from "../socket"
import { UserData } from "../interfaces"
import { ArrowLeftOnRectangleIcon, UserIcon } from "@heroicons/react/20/solid"
import { useNavigate, useParams } from "react-router-dom"

const ConnectedBadge = () => {
  return (
    <>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
    </>
  )
}

const DisconnectedBadge = () => {
  return (
    <>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
    </>
  )
}

const ConnectionManager = () => {
  const navigate = useNavigate()
  const { board } = useParams()
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [users, setUsers] = useState<UserData[]>([])
  const token = crypto.randomUUID()

  const leaveBoard: MouseEventHandler<HTMLButtonElement> = (event: MouseEvent) => {
    event.preventDefault()
    navigate('/')
  }

  const onConnect = () => {
    socket.emit('joinRoom', { board })
    setIsConnected(socket.connected)
    toast.info("You're connected!")
  }

  const onDisconnect = () => {
    socket.emit('leaveRoom', { board })
    setIsConnected(socket.connected)
    toast.info("You're disconnected!")
  }

  const onUsers = (users: UserData[]) => {
    setUsers(users)
    users.forEach((user) => {
      if (user.id === socket.id) {
        storageSet('user', { id: user.id, token: user.token })
      }
    })
  }

  useEffect(() => {
    socket.auth = { token, board }
    socket.connect()
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('users', onUsers)

    return () => {
      socket.disconnect()
      socket.off('connect')
      socket.off('disconnect')
      socket.off('users')
    }
  }, [])

  return (
    <header className="fixed top-0 p-3 w-full flex justify-between items-center z-[9999999]">
      <div>
        <button
          onClick={leaveBoard}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 border border-slate-400"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Leave board"
        >
          <ArrowLeftOnRectangleIcon className="w-4 h-4 text-slate-700" />
        </button>
      </div>
      <div
        className="cursor-help rounded-full p-2 flex gap-2 items-center"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={isConnected ? 'Connected' : 'Disconnected'}
      >
        <span className="bg-slate-200 text-[10px] px-2 py-0.5 text-slate-600 rounded-full font-semibold flex items-center gap-1">
          <UserIcon className="w-3 h-3" />
          {users.length}
        </span>
        <span className="relative flex h-2 w-2">  
          { isConnected ? <ConnectedBadge /> : <DisconnectedBadge />}
        </span>
      </div>
    </header>
  )
}

export default ConnectionManager