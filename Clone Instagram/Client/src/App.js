import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
//* Components and Pages
import Header from './Components/Header/Header'
import Profile from './Pages/Profile/Profile'
import SignUPorLogin from './Pages/Signup and Login/SignUPorLogin'
import EditProfile from './Pages/Edit Profile/EditProfile'
import Home from './Pages/Home/Home'
// * Redux
import { allUser } from './Redux/Action/Creator'







function App() {
  const UserLogin = useSelector(state => state.Reducer.Get_Info_Account)
  const Dispatch = useDispatch()

  useEffect(() => {
    Dispatch(allUser())
  }, [])



  return (
    <>
      {UserLogin &&
        Object.keys(UserLogin).length !== 0 ?
        <>
          <Header />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/editprofile' element={<EditProfile />} />
          </Routes>
        </>
        :
        <SignUPorLogin />
      }
    </>
  )
}

export default App