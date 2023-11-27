import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Tooltip } from 'react-tooltip'

import './main.css'
import 'react-tooltip/dist/react-tooltip.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Tooltip id="my-tooltip" style={{ backgroundColor: 'rgb(226 232 240)', color: 'rgb(51 65 85)'}} />
  </React.StrictMode>,
)
