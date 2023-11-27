export type ButtonType = 'auto' | 'mouse-over'

export interface CrazyButtonProps {
  speed?: number,
  interval?: number,
  type: ButtonType
}

export interface ErrorPageProps {
  code: number
}

export interface SpeedRangeProps {
  speed: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  maxSpeed: number
}

export interface InputProps {
  name: string,
  label?: string
}
  
export interface Position {
  x?: number,
  y?: number
}

export interface CursorProps {
  top: number,
  left: number,
  color?: string
}

export interface UserData {
  id: string,
  token: string,
  cursorPosX: number,
  cursorPosY: number,
  color?: string
}

export interface FormData {
  board: string
}