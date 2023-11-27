import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
})

let users = []

let currentBoard = null

/**
 * Middleware
 */
io.use((socket, next) => {
  const token = socket.handshake.auth.token
  const board = socket.handshake.auth.board

  if (!token) {
    return next(new Error("Invalid token"))
  }

  socket.token = token
  socket.board = board

  next();
})

/**
 * Init connected users
 */
const initiateBoardAndUsers = (board) => {
  users = []

  for (let [id, socket] of io.of('/').sockets) {
    if (socket.board == board) {
      users.push({
        id,
        token: socket.token,
        board: socket.board,
        cursorPosX: 0,
        cursorPosY: 0
      })
    }
  }
  
  currentBoard = board
}

/**
 * Emit button position
 * @param {*} data
 */
const onUpdatePosition = (data) => {
  io.to(currentBoard).emit('positionChange', data)
}

/**
 * Emit cursor position for each users
 * @param {*} data 
 */
const onUpdateUserPosition = (data) => {
  const index = users.map(user => user.id).indexOf(data.user.id)

  if (index > -1) {
    const user = users[index]

    user.cursorPosX = data.cursorPosX
    user.cursorPosY = data.cursorPosY
    
    io.to(currentBoard).emit('users', users)
  }
}

/**
 * Join user and emit users data
 * @param {*} board 
 * @param {*} socket 
 */
const onJoinRoom = (board, socket) => {
  socket.join(board)

  initiateBoardAndUsers(board)
    
  socket.emit('users', users)
}

/**
 * Leave user when disconnection and update users data
 * @param  {*} socket
 * @param  {...any} params 
 */
const onDisconnect = (socket, ...params) => {
  socket.leave(currentBoard)

  initiateBoardAndUsers(currentBoard)

  socket.to(currentBoard).emit('users', users)
}

/**
 * What we do when connection
 */
io.on('connection', (socket) => {
  socket.on('updatePosition', onUpdatePosition)

  socket.on('updateUserPosition', onUpdateUserPosition)
  
  socket.on('joinRoom', (data) => onJoinRoom(data.board, socket))

  socket.on('disconnect', () => onDisconnect(socket))
})

io.listen(3000)