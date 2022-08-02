import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
//* CSS
import './Scss/Edite profile.scss'
//* Action Creator
import { getUserInfoLogin } from '../../../../Redux/Action/Creator'







function Edite_profile() {
    const UserLogin = useSelector(state => state.Reducer.Get_Info_Account)
    const Dispatch = useDispatch()

    // State
    const [firstName, setFirstName] = useState(UserLogin?.firstName)
    const [username, setUsername] = useState(UserLogin?.username)
    const [website, setWebsite] = useState(UserLogin?.website)
    const [bio, setBio] = useState(UserLogin?.bio)
    const [email, setEmail] = useState(UserLogin?.email)
    const [phone, setPhone] = useState(UserLogin?.phone)
    const [PhotoSelected, setPhotoSelected] = useState('')
    const [picPro, setPicpro] = useState('')
    // Ref
    const nameRef = useRef()
    const userNameRef = useRef()
    const Website = useRef()
    const Bio = useRef()
    const Email = useRef()
    const PhoneNumber = useRef()
    const Gender = useRef()
    // checked input open modal
    const [checked, setChecked] = useState(false)
    // Ref
    const filePhoto = useRef('')


    const sumbit = async () => {
        await axios.put('http://localhost:6070/updatefirstname', { id: UserLogin?._id, firstName })
            .then(res => {
                if (res.status === 200) {
                    axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
                        .then(res => Dispatch(getUserInfoLogin(res.data)))
                }
            })

        await axios.put('http://localhost:6070/updateusername', { id: UserLogin?._id, username })
            .then(res => {
                if (res.status === 200) {
                    axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
                        .then(res => Dispatch(getUserInfoLogin(res.data)))
                }
            })

        await axios.put('http://localhost:6070/updatewebsite', { id: UserLogin?._id, website })
            .then(res => {
                if (res.status === 200) {
                    axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
                        .then(res => Dispatch(getUserInfoLogin(res.data)))
                }
            })

        await axios.put('http://localhost:6070/updatebio', { id: UserLogin?._id, bio })
            .then(res => {
                if (res.status === 200) {
                    axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
                        .then(res => Dispatch(getUserInfoLogin(res.data)))
                }
            })

        await axios.put('http://localhost:6070/updateemail', { id: UserLogin?._id, email })
            .then(res => {
                if (res.status === 200) {
                    axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
                        .then(res => Dispatch(getUserInfoLogin(res.data)))
                }
            })

        await axios.put('http://localhost:6070/updatephone', { id: UserLogin?._id, phone })
            .then(res => {
                if (res.status === 200) {
                    axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
                        .then(res => Dispatch(getUserInfoLogin(res.data)))
                }
            })
    }

    // Set picture for profile
    const ChangeImgPro = async (event) => {
        setPhotoSelected(event.target.files[0])
        setChecked(false)
        let overflowContent = document.getElementById('content-front-Of-label')
        overflowContent.style.overflow = 'hidden auto'

        // Upload post to site
        const formData = new FormData()
        formData.append('file', PhotoSelected)
        formData.append('upload_preset', 'mockinsta')
        await axios.post('https://api.cloudinary.com/v1_1/reza0021/image/upload', formData)
            .then(res => setPicpro(res.data?.url))
            .catch(error => console.log(error.message))
    }
    useEffect(() => {
        if (picPro !== '') {
            axios.put('http://localhost:6070/updatepicpro', { id: UserLogin?._id, picPro })
                .then(res => {
                    if (res.status === 200) {
                        axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
                            .then(res => Dispatch(getUserInfoLogin(res.data)))
                    }
                })
            setPhotoSelected('')
            setPicpro('')
        }
    }, [picPro])








    return (
        <div id='Edite_profile'>

            <section id='imgPro-id-changeProfile'>
                <div>
                    <img
                        src={UserLogin.profile_pic}
                        alt="This is profile picture"
                        width="50px" height="45px"
                        draggable={false}
                    />
                </div>
                <div>
                    <p>{UserLogin.username}</p>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="editeProModal"
                        id='openModalEditePro'
                        hidden
                    />
                    <label htmlFor='box1'>
                        <p align='center' onClick={() => {
                            setChecked(true)
                            let overflowContent = document.getElementById('content-front-Of-label')
                            overflowContent.style.overflow = 'hidden'
                        }}
                        >
                            Change profile photo
                        </p>
                    </label>

                    <div id="modal">
                        <label htmlFor="box1" id="closeArea" tabIndex="0" onClick={() => {
                            setChecked(false)
                            let overflowContent = document.getElementById('content-front-Of-label')
                            overflowContent.style.overflow = 'hidden auto'
                        }}>
                        </label>

                        <section id="box-modal">
                            <center id='modal-header'><p>Change Profile Photo</p></center>
                            <hr />
                            <div id='modal-body-EditPro'>
                                <button onClick={() => filePhoto.current.click()}>
                                    <input
                                        type="file"
                                        ref={filePhoto}
                                        onChange={(event) => ChangeImgPro(event)}
                                        hidden
                                    />
                                    Upload Photo
                                </button>
                                <hr className='hr-modalBody' />
                                <button>Remove Current Photo</button>
                                <hr className='hr-modalBody' />
                                <button onClick={() => {
                                    setChecked(false)
                                    let overflowContent = document.getElementById('content-front-Of-label')
                                    overflowContent.style.overflow = 'hidden auto'
                                }}>
                                    Cancel
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            <section id='name'>
                <span onClick={() => nameRef.current.focus()}>Name</span>
                <input
                    type='text'
                    name='firstName'
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    size='33'
                    autoComplete='off'
                    ref={nameRef}
                />
                <p id='about'>
                    Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                    <br />
                    <br />
                    You can only change your name twice within 14 days.
                </p>
            </section>
            <section id='username'>
                <span onClick={() => userNameRef.current.focus()}>Username</span>
                <input
                    type='text'
                    name='username'
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    size='33'
                    autoComplete='off'
                    ref={userNameRef}
                />
                <p id='about' style={{ textAlignLast: 'left' }}>
                    In most cases, you'll be able to change your username back to miss.hasti.0 for another 5 days. Learn more
                </p>
            </section>
            <section id='Website'>
                <span onClick={() => Website.current.focus()}>Website</span>
                <input
                    type='text'
                    name='website'
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    size='33'
                    autoComplete='off'
                    ref={Website}
                />
            </section>
            <section id='Bio'>
                <span onClick={() => Bio.current.focus()}>Bio</span>
                <textarea
                    name='bio'
                    ref={Bio}
                    rows="3"
                    autoComplete='off'
                    cols="36"
                    value={bio}
                    spellCheck='false'
                    onChange={(event) => setBio(event.target.value)}
                >
                </textarea>
                <p id='about'>
                    Personal information
                    Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.
                </p>
            </section>
            <section id='Email'>
                <span onClick={() => Email.current.focus()}>Email</span>
                <input
                    type='text'
                    name='email'
                    size='33'
                    autoComplete='off'
                    ref={Email}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </section>
            <section id='PhoneNumber'>
                <span onClick={() => PhoneNumber.current.focus()}>Phone number</span>
                <input
                    type='text'
                    name='phone'
                    size='33'
                    autoComplete='off'
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    ref={PhoneNumber}
                />
            </section>
            <button id='confirmPhoneNumber'>Confirm phone number</button>
            <section id='Gender'>
                <span onClick={() => Gender.current.focus()}>Gender</span>
                <input
                    type='text'
                    name='gender'
                    size='33'
                    autoComplete='off'
                    ref={Gender}
                />
            </section>
            <section id='Similar-account'>
                <span>Similar account suggestions</span>
                <input type='checkbox' />
                <span>
                    Include your account when recommending similar accounts people might want to follow.
                </span>
            </section>

            <section id='submit-deactivate'>
                <span onClick={sumbit}>Submit</span>
                <span>Temporarily deactivate my account</span>
            </section>

        </div>
    )
}

export default Edite_profile