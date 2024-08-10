import React from 'react'
import { Route, Routes } from 'react-router'
import Login from '../pages/Login'
import Deskstop from '../pages/Desktop '
import Signup from '../pages/Signup'
import Auth from '../pages/Auth'

const AllRoutes:React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Login/>}/>
        <Route path='/desktop' element={ <Deskstop/>}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default AllRoutes