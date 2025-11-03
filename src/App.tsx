import { Routes, Route } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { NotFound } from './components/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App