import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
//* CSS
import './scss/Login.scss'
//* Component
import Sign_up from '../Sign_up/Sign_up'
//* Image
import NameInsta from './Image/NameInsta.png'
import AppStore from './Image/AppStore.png'
import GooglePlay from './Image/GooglePlay.png'
//* Icons
import { AiFillFacebook } from "react-icons/ai"
//* Action Creator
import { getUserInfoLogin } from '../../Redux/Action/Creator'








function Login() {
  const navigate = useNavigate()
  const Dispatch = useDispatch()
  const [noAccount, setNoAccount] = useState(false)
  const [showPassword, setshowPassword] = useState(false)
  // state input value
  const [user, setValue] = useState({
    user_email_phone: '',
    password: ''
  })


  useEffect(() => {
    document.title = 'Login • Instagram'
    navigate('/', { replace: true })
  }, [])

  const GoToSignUp = () => {
    setNoAccount(!noAccount)
    document.title = 'Sign up • Instagram'
  }

  //* Change Value input
  const ChangeVal = (event) => {
    const { name, value } = event.target
    setValue({
      ...user,
      [name]: value
    })
  }

  //* Btn Login
  const Login = async () => {
    const { data } = await axios.post('http://localhost:6070/login', user)
      .catch(error => console.log(error))
    Dispatch(getUserInfoLogin(data.user))
  }






  if (noAccount) {
    return <Sign_up setNoAccount={setNoAccount} />
  } else {
    return (
      <div id='Login'>
        <div id='main-login'>
          <section id='box-login'>
            <img src={NameInsta} alt="NameInsta" draggable={false} />

            <input
              id='username'
              type="text"
              name='user_email_phone'
              value={user.user_email_phone}
              onChange={ChangeVal}
              placeholder=" "
              autoComplete='off'
              spellCheck="true"
              required
            />
            <label htmlFor="username" id='username' aria-label='username, phone, email'></label>

            <input
              id='password'
              type={!showPassword ? "password" : "text"}
              name="password"
              value={user.password}
              onChange={ChangeVal}
              placeholder=" "
              autoComplete='off'
              maxLength='150'
              required
              spellCheck="true"
            />

            <label htmlFor="password" id='password' aria-label='password'></label>
            <label id='show_Hide_Password' onClick={() => setshowPassword(!showPassword)}>
              {!showPassword ? 'show' : 'Hide'}
            </label>

            <button
              id='btnlogin'
              onClick={() => Login()}
              disabled={Object.values(user).some(item => item === '')}
            >
              Log in
            </button>
            <hr />
            <p id='or'>OR</p>
            <div id='facebook'>
              <AiFillFacebook id='icon-facebook' />
              &nbsp;
              <span>Log in with Facebook</span>
            </div>

            <p id='forgetPass'>Forgot password?</p>
          </section>

          <section id='box-GotoSignup'>
            Don't have an account? &nbsp; <span onClick={() => GoToSignUp()}>Sign up</span>
          </section>
          <section id='box-DownloadApp'>
            <p>Get the app.</p>
            <div>
              <img src={AppStore} alt="AppStore" loading='lazy' height='40px' draggable={false} />
              &nbsp;
              &nbsp;
              <img src={GooglePlay} alt="GooglePlay" loading='lazy' height='40px' draggable={false} />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default Login