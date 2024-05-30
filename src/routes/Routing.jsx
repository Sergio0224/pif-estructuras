import React from 'react'
import Welcome from "../components/Welcome"
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Start from '../components/Start'
import PublicLayout from '../components/PublicLayout'
import PrivateLayout from '../components/PrivateLayout'
import Home from '../components/Home'
import { UserData } from '../contexts/UserData'
import Tasks from '../components/Tasks'
import Annotations from '../components/Annotations'
import StudyMethods from '../components/StudyMethods'
import Config from '../components/Config'
import Pomodoro from '../components/Pomodoro'

const Routing = () => {
  return (
    <BrowserRouter>
      <UserData>
        <Routes>
          <Route path='/' element={<PublicLayout />} >
            <Route index element={<Welcome></Welcome>} />
            <Route path='start' element={<Start />} />
          </Route>
          <Route path='home' element={<PrivateLayout />}>
            <Route index element={<Home />} />
            <Route path='tasks' element={<Tasks />} />
            <Route path='study-methods' element={<StudyMethods />} />
            <Route path='study-methods/pomodoro' element={<Pomodoro />} />
            <Route path='config' element={<Config />} />
            <Route path='annotations' element={<Annotations />} />
          </Route>
        </Routes>
      </UserData>
    </BrowserRouter>
  )
}

export default Routing