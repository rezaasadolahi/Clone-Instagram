import { useState, useEffect } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import "emoji-mart/css/emoji-mart.css"
import { Picker } from "emoji-mart"
//* Icons
import { FiSearch, FiSend, FiBookmark } from "react-icons/fi"
import { AiOutlineCloseCircle, AiOutlineClose } from "react-icons/ai"
import { MdOutlineExplore, MdFavoriteBorder, MdHomeFilled, MdOutlineCached } from "react-icons/md"
import { CgProfile, CgAddR } from "react-icons/cg"
import { BsCaretUpFill, BsEmojiSmile } from "react-icons/bs"
import { IoMdSettings } from "react-icons/io"
import name_insta from './Icons/Name_insta.svg'
import { BsArrowLeft } from "react-icons/bs"
//* CSS
import './Scss/Header.scss'
//* Components
import DnD from './Dnd and Sortable in modal/Drag and Drop File/DnD'
//* Action Creator
import { getUserInfoLogin } from '../../Redux/Action/Creator'





// List emoji
const defaultEmoji = {
    id: "heart_eyes",
    name: "Smiling Face with Heart-Shaped Eyes",
    short_names: ["heart_eyes"],
    colons: ":heart_eyes:",
    emoticons: [],
    unified: "1f60d",
    skin: null,
}





function Header() {
    // Redux
    const Dispatch = useDispatch()
    const UserLogin = useSelector(state => state.Reducer.Get_Info_Account)
    // State
    const [value, setValue] = useState('')
    const [isAsideRTmodal, setisAsideRTmodal] = useState(false)
    const [getImagePosts, setGetImagePosts] = useState([])
    const [caption, setCaption] = useState('')
    const [emtyImagesPostModal, setEmtyImagesPostModal] = useState([])
    // Route
    const navigate = useNavigate()
    // checked input open modal
    const [checked, setChecked] = useState(false)


    //* lock scroller browser when Modal is open
    useEffect(() => {
        const body = document.querySelector('body')
        const modal = document.getElementById('modal')
        const openModal = document.getElementById('btnModal')
        const closeArea = document.getElementById('closeArea')
        //---------------------------------------------------------
        openModal.addEventListener('click', () => {
            if (getComputedStyle(modal).display === 'none') {
                body.style.overflow = 'hidden'
            }
        })
        closeArea.addEventListener('click', () => {
            if (getComputedStyle(modal).display === 'block') {
                body.style.overflow = 'auto'
            }
        })
    }, [])


    const LogOut = () => Dispatch(getUserInfoLogin({}))

    // send file to Post
    const [post, setPost] = useState('')

    const nextBtnInModalAddPost = () => {
        console.clear()
        getImagePosts.length !== 0 && setisAsideRTmodal(!isAsideRTmodal)
    }

    const SharePost = async () => {
        setEmtyImagesPostModal([])
        setisAsideRTmodal(false)
        setChecked(false)
        const body = document.querySelector('body')
        body.style.overflow = 'auto'


        // Upload post to site
        const formData = new FormData()
        formData.append('file', ...getImagePosts)
        formData.append('upload_preset', 'mockinsta')
        await axios.post('https://api.cloudinary.com/v1_1/reza0021/image/upload', formData)
            .then(res => setPost(res.data.url))
            .catch(error => console.log(error.message))
    }
    useEffect(() => {
        if (post !== '') {
            axios.post('http://localhost:6070/addpost', { content: post, caption, ID_People: UserLogin._id })
                .then(res => {
                    if (res.status === 200) {
                        axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
                            .then(res => Dispatch(getUserInfoLogin(res.data)))
                    }
                })
            setPost('')
            setCaption('')
        }
    }, [post])

    // List emoji
    const [emojii, setEmojii] = useState(defaultEmoji)
    const [isEmoji, setIsEmoji] = useState(false)
    const onSelectEmoji = (emoji) => {
        setEmojii(emoji)
        setCaption(caption + emojii.native)
    }










    return (
        <header>
            <nav>
                <div id='search'>
                    <img
                        src={name_insta}
                        alt="this is name application"
                        id='name_app'
                        onClick={() => navigate('/', { replace: true })}
                        draggable={false}
                        loading='lazy'
                    />

                    <section id='box-search'>
                        <input
                            type="text"
                            placeholder='Search'
                            translate='no'
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <FiSearch id='icon-search' />
                        <AiOutlineCloseCircle id='clear' onClick={() => setValue('')} />
                    </section>
                </div>

                <div id='option-header'>
                    <MdHomeFilled id='home' />
                    <FiSend id='send' />

                    <section id="m-Add-Post">
                        <input
                            type="checkbox"
                            name="open"
                            id="openModal"
                            checked={checked}
                            hidden
                            onChange={(event) => setChecked(event.target.checked)}
                        />
                        <p htmlFor="openModal" id="btnModal" tabIndex="0" onClick={() => setChecked(true)}>
                            <CgAddR id='addpost' />
                        </p>

                        <div id="modal">
                            <AiOutlineClose id='close-modal' />
                            <p id="closeArea" onClick={() => setChecked(false)}></p>

                            <section id="box-modal">
                                <div id='modal-header'>
                                    {getImagePosts.length !== 0 && isAsideRTmodal ?
                                        <p id='share' onClick={() => SharePost()}>Share</p>
                                        :
                                        <p id={getImagePosts.length !== 0 ? 'next1' : 'next2'} onClick={nextBtnInModalAddPost}
                                        >
                                            Next
                                        </p>
                                    }
                                    <p id='titleHeader'>Select Post</p>
                                    {getImagePosts.length !== 0 && isAsideRTmodal ?
                                        <BsArrowLeft
                                            id='arrowLeft'
                                            onClick={() => {
                                                setisAsideRTmodal(false)
                                                setIsEmoji(false)
                                            }} />
                                        :
                                        ''
                                    }
                                </div>
                                <hr />
                                <div id='modal-body'>
                                    <DnD setGetImagePosts={setGetImagePosts} emtyImagesPostModal={emtyImagesPostModal} />
                                </div>
                            </section>
                            {getImagePosts.length !== 0 && isAsideRTmodal ?
                                <section id='asideModel' hidden={isAsideRTmodal ? false : true}>
                                    <textarea
                                        cols='43'
                                        id='caption'
                                        name='caption'
                                        placeholder='Write a caption...'
                                        value={caption}
                                        maxLength={2200}
                                        translate='false'
                                        autoComplete='false'
                                        spellCheck='false'
                                        onChange={(event) => {
                                            setCaption(event.target.value)
                                            setIsEmoji(false)
                                        }}
                                    >
                                    </textarea>
                                    <div id='emiji-limitWord'>
                                        <section id='emoji' onClick={() => setIsEmoji(!isEmoji)}>
                                            <BsEmojiSmile />
                                        </section>
                                        <section id='limitWord'>{caption.length}/2,200</section>
                                        {isEmoji &&
                                            <div id='list-emoji'>
                                                <Picker
                                                    onSelect={onSelectEmoji}
                                                    title="Heres all of them"
                                                    emoji="point_up"
                                                    showSkinTones={false}
                                                />
                                            </div>
                                        }
                                    </div>
                                </section>
                                :
                                ''
                            }
                        </div>
                    </section>

                    <MdOutlineExplore id='explorer' />

                    <section id="m-like">
                        <DropdownButton id="dropdown-basic-button" title={<MdFavoriteBorder id='likes' />}>
                            <BsCaretUpFill id='triangle' />

                            <Dropdown.Item>
                                <div id='second-box'>

                                </div>
                            </Dropdown.Item>
                        </DropdownButton>
                    </section>

                    <section id="m-Profile">
                        <DropdownButton id="dropdown-basic-button" title={<CgProfile id='profile' />}>
                            <BsCaretUpFill id='triangle' />

                            <section id='detail-profile'>
                                <Dropdown.Item>
                                    <Link
                                        onClick={() => {
                                            document.title = 'Profile • Instagram'
                                            console.clear()
                                        }}
                                        to='/profile'
                                        replace={true}
                                    >
                                        <CgProfile id='d-profile' />
                                        <span>Profile</span>
                                    </Link>
                                </Dropdown.Item>

                                <Dropdown.Item>
                                    <Link to={'/'}>
                                        <FiBookmark id='d-bookmark' />
                                        <span>Saved</span>
                                    </Link>
                                </Dropdown.Item>

                                <Dropdown.Item>
                                    <Link to={'/'}>
                                        <IoMdSettings id='d-setting' />
                                        <span>Setting</span>
                                    </Link>
                                </Dropdown.Item>

                                <Dropdown.Item>
                                    <Link to={'/'}>
                                        <MdOutlineCached id='d-cashed' />
                                        <span>Switch Account</span>
                                    </Link>
                                </Dropdown.Item>

                                <Dropdown.Item>
                                    <Link onClick={() => LogOut()} to={'/'}>
                                        <div id='logout'>
                                            <span>Log Out</span>
                                        </div>
                                    </Link>
                                </Dropdown.Item>
                            </section>
                        </DropdownButton>
                    </section>
                </div>
            </nav>
        </header >
    )
}

export default Header