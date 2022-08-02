import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
//* CSS
import './Scss/Change_password.scss'
//* Redux
import { getUserInfoLogin } from '../../../../Redux/Action/Creator'








function Change_password() {
  // State
  const [user, setUser] = useState({ oldPass: '', newPass: '', confirmPass: '', })
  // Redux
  const UserLogin = useSelector(state => state.Reducer.Get_Info_Account)
  const Dispatch = useDispatch()
  // Ref
  const oldPassword = useRef()
  const newPassword = useRef()
  const confirmPassWord = useRef()

  const ChangeVal = (event) => {
    const { name, value } = event.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const submit = async () => {
    if (user.newPass === user.confirmPass) {
      await axios.put('http://localhost:6070/updatepassword', { id: UserLogin?._id, password: user.newPass })

      await axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
        .then(res => Dispatch(getUserInfoLogin(res.data)))

      setUser({ oldPass: '', newPass: '', confirmPass: '', })
      console.clear()
    }
  }







  


  return (
    <div id='Change_password'>
      <section className='boxChangePass'>
        <span onClick={() => oldPassword.current.focus()}>Old Password</span>
        <input
          type="text"
          name='oldPass'
          ref={oldPassword}
          value={user.oldPass}
          style={{ border: UserLogin.password === user.oldPass && '2px solid #2bff00' }}
          onChange={ChangeVal}
          autoComplete="off"
        />
      </section>
      <section className='boxChangePass'>
        <span onClick={() => newPassword.current.focus()}>New Password</span>
        <input
          type="text"
          name='newPass'
          ref={newPassword}
          value={user.newPass}
          onChange={ChangeVal}
          disabled={UserLogin.password === user.oldPass ? false : true}
          autoComplete="off"
        />
      </section>
      <section className='boxChangePass'>
        <span onClick={() => confirmPassWord.current.focus()}>Confirm New Password</span>
        <input
          type="text"
          name='confirmPass'
          ref={confirmPassWord}
          value={user.confirmPass}
          onChange={ChangeVal}
          disabled={UserLogin.password === user.oldPass ? false : true}
          autoComplete="off"
        />
      </section>

      <button
        id='sumbit'
        disabled={Object.values(user).every((item) => item === '') ? true : false}
        onClick={submit}
      >
        Change Password
      </button>
    </div>
  )
}

export default Change_password