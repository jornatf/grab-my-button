import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Play from './pages/Play'
import Error from './pages/Error'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Index />}
        />
        <Route
          path="/board/:board"
          element={<Play />}
        />
        <Route
          path="*"
          element={<Error code={404} />}
        />
      </Routes>
    </Router>
  )
}

export default App
