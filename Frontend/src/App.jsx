import { useState } from 'react'
import './App.css'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Wallet from './pages/Wallet'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import VerifierLogin from './pages/VerifierLogin'
import VerifierDashboard from './pages/VerfiierDashboard'
import Scholarship from './pages/Scholarship'
import Discounts from './pages/Discounts'
import Events from './pages/EventRegistration'
import AgeRestricted from './pages/AgeRestricted'

function App() {
  const [count, setCount] = useState(0)
   
  return (
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/wallet' element={<Wallet/>} />
      <Route path='/verifier-login' element={<VerifierLogin/>}/>
        <Route path="/verifier-dashboard" element={<VerifierDashboard />}>

          {/* Default child page */}
          <Route index element={<Scholarship />} />

          <Route path="discounts" element={<Discounts />} />
          <Route path="age-restricted" element={<AgeRestricted/>} />
          <Route path="events" element={<Events />} />

        </Route>
     </Routes>
     </BrowserRouter>
  )
}

export default App
