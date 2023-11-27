import CrazyButton from '../components/CrazyButton'
import CursorBoard from '../components/CursorBoard'
import { CrazyButtonProps } from '../interfaces'
import ConnectionManager from '../components/ConnectionManager'
import { ToastContainer } from 'react-toast'

const config: CrazyButtonProps = {
  speed: 700,
  interval: 800,
  type: 'auto'
}

const Play = () => {
  return (
    <>
      <ConnectionManager />
      <CursorBoard />
      <CrazyButton {...config} />
      <ToastContainer
        position="bottom-right"
        delay={1000}
      />
    </>
  )
}

export default Play