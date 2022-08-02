import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
//* CSS
import './scss/Sign_up.scss'
//* Image
import NameInsta from './Image/NameInsta.png'
import AppStore from './Image/AppStore.png'
import GooglePlay from './Image/GooglePlay.png'
//* Action Creator
import { getUserInfoLogin } from '../../Redux/Action/Creator'








function Sign_up({ setNoAccount }) {
  const navigate = useNavigate()
  const Dispatch = useDispatch()
  const [showPassword, setshowPassword] = useState(false)
  // State field input
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    username: '',
    password: ''
  })

  useEffect(() => {
    document.title = 'Sign up • Instagram'
    navigate('/', { replace: true })
  }, [])

  //* Change field input
  const ChangeField = (event) => {
    const { name, value } = event.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const GoToLogin = () => {
    setNoAccount(false)
    document.title = 'Login • Instagram'
  }

  const Signup = async () => {
    const { data } = await axios.post('http://localhost:6070/register', user)
      .catch(error => console.log(error))
    Dispatch(getUserInfoLogin(data))
    console.clear()
  }







  return (
    <div id='Sign_up'>
      <div id='main-Signup'>
        <section id='box-Signup'>
          <img src={NameInsta} alt="NameInsta" draggable={false} />

          <p id='title'>Sign up to see photos and videos from your friends.</p>

          <input
            type="text"
            name="email"
            placeholder='Mobile Number or Email'
            spellCheck="false"
            value={user.email}
            autoComplete='off'
            onChange={ChangeField}
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder='Full Name'
            spellCheck="false"
            value={user.firstName}
            autoComplete='off'
            onChange={ChangeField}
            required
          />
          <input
            type="text"
            name="username"
            value={user.username}
            autoComplete='off'
            placeholder='Username'
            spellCheck="true"
            onChange={ChangeField}
            required
          />
          <input
            type={!showPassword ? "password" : "text"}
            name="password"
            placeholder='Password'
            maxLength='150'
            spellCheck="true"
            value={user.password}
            autoComplete='off'
            onChange={ChangeField}
            required
          />
          <label id='show_Hide_Password' onClick={() => setshowPassword(!showPassword)}>
            {!showPassword ? 'show' : 'Hide'}
          </label>

          <div id='about'>
            People who use our service may have uploaded your contact information to Instagram. Learn More
            <br />
            <br />
            By signing up, you agree to our Terms , Data Policy and Cookies Policy .
          </div>

          <button
            id='btnSignup'
            onClick={() => Signup()}
            disabled={Object.values(user).some(item => item === '')}
          >
            Sign up
          </button>
        </section>

        <section id='box-GotoLogin'>
          Have an account? &nbsp; <span onClick={() => GoToLogin()}>Login</span>
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

export default Sign_up