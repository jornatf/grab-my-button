import React from "react"
import { CursorProps } from "../interfaces"

const Cursor: React.FC<CursorProps> = ({ ...props }) => {
  return (
    <div
      className="cursor absolute z-[9999]"
      style={{...props}}
    >
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-6 fill-blue-500" viewBox="0 0 30 30">
        <path d="M 9 3 A 1 1 0 0 0 8 4 L 8 21 A 1 1 0 0 0 9 22 A 1 1 0 0 0 9.796875 21.601562 L 12.919922 18.119141 L 16.382812 26.117188 C 16.701812 26.855187 17.566828 27.188469 18.298828 26.855469 C 19.020828 26.527469 19.340672 25.678078 19.013672 24.955078 L 15.439453 17.039062 L 21 17 A 1 1 0 0 0 22 16 A 1 1 0 0 0 21.628906 15.222656 L 9.7832031 3.3789062 A 1 1 0 0 0 9 3 z"></path>
      </svg>    
    </div>
  )
}

export default Cursor