import { MouseEvent, MouseEventHandler, useEffect, useState } from "react"
import { randBetween } from "../lib/random"
import { toast } from "react-toast"
import socket from "../socket"
import { CrazyButtonProps, Position } from "../interfaces"
import Button from "./ui/Button"

const CrazyButton: React.FC<CrazyButtonProps> = ({ ...props }) => {
  const [position, setPosition] = useState<Position>({})

  const moveButton = () => {
    const button: HTMLButtonElement | null = document.querySelector('#myCrazyButton')
  
    if (button) {
      const currentPosY = window.innerHeight - button.clientHeight
      const currentPosX = window.innerWidth - button.clientWidth
      const newPosition = {
        x: Math.random() * currentPosX,
        y: Math.random() * currentPosY
      }

      setPosition(newPosition)

      socket.emit('updatePosition', newPosition)
    }
  }
  
  const handleMouseOver: MouseEventHandler<HTMLDivElement> = () => {
    const labels = ['Try again!', 'Failed!', 'Whoops!', 'You losed!']

    if (props.type && props.type == 'mouse-over') {
      moveButton()
      toast.error(labels[randBetween(0, labels.length)])
    }
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event: MouseEvent) => {
    event.preventDefault()
    toast.success('Yeaaah! Good job!')
  }

  useEffect(() => {
    if (props.type && props.type == 'auto') {
      setInterval(moveButton, props.interval)
    }
    
    socket.on('positionChange', (data) => {
      setPosition(data)
    })

    return () => {
      socket.off('positionChange')
    }
  }, [])

  return (
    <div
      id="myCrazyButton"
      onMouseOver={handleMouseOver}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -transition-y-1/2 w-36"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transitionDuration: `${props.speed}ms`
      }}
    >
      <Button onClick={handleClick}>CLICK HERE</Button>
    </div>
  )
}

export default CrazyButton