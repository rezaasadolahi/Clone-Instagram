import { useEffect, useRef, useState } from 'react'
import { Picker } from "emoji-mart"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
//* Icons
import { FaComment, FaRegComment } from "react-icons/fa"
import { FiSend } from "react-icons/fi"
import { AiFillHeart, AiOutlineClose } from "react-icons/ai"
import { TbHeart } from "react-icons/tb"
import { BsThreeDots } from "react-icons/bs"
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
    BsDownload,
    BsEmojiSmile
} from "react-icons/bs"
import { HiOutlineBookmark } from "react-icons/hi"
//* Redux
import { getUserInfoLogin } from '../../../Redux/Action/Creator'
// CSS
import './Scss/Content_post.scss'





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







function Content_post() {
    const Dispatch = useDispatch()
    const ref_modalSeePost = useRef()
    const ref_ModalMenu = useRef()
    const UserLogin = useSelector(state => state.Reducer.Get_Info_Account)


    // when click on a post
    const [ItemPost, setItemPost] = useState({})
    const captionComment = useRef()

    const handleBoxPost = (item) => {
        ref_modalSeePost.current.style.display = 'block'
        setItemPost(item)
        const body = document.querySelector('body')
        if (ref_modalSeePost.current.style.display === 'block') {
            body.style.overflow = 'hidden'
        }
    }
    const CloseModalPost = () => {
        ref_modalSeePost.current.style.display = 'none'
        const body = document.querySelector('body')
        setIsEmoji(false)
        if (ref_modalSeePost.current.style.display === 'none') {
            return body.style.overflow = 'auto'
        }
    }

    // List emoji
    const [emojii, setEmoji] = useState(defaultEmoji)
    const [isEmoji, setIsEmoji] = useState(false)
    const [comment, setComment] = useState('')
    const onSelectEmoji = (emoji) => {
        setEmoji(emoji)
        setComment(comment + emojii.native)
    }

    // modal see post / Like - Comment - Save - Share
    const LikePost = async () => {
        return await axios.put('http://localhost:6070/updatelikepost', { idPost: postUser[nowContent]?._id, idPeople: UserLogin?._id })
            .then(res => {
                if (res.status === 200) {
                    return axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
                        .then(res => Dispatch(getUserInfoLogin(res.data)))
                }
            })
    }

    const bookMarks = async () => {
        return await axios.put('http://localhost:6070/updatesave', { idPost: postUser[nowContent]?._id, idPeople: UserLogin?._id })
            .then(res => {
                if (res.status === 200) {
                    return axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
                        .then(res => Dispatch(getUserInfoLogin(res.data)))
                }
            })
    }

    //-> Content in modal and arrow Next content and arrow Previous content
    const [postUser, setPostUser] = useState([])
    const [nowContent, setnowContent] = useState()

    useEffect(() => {
        document.title = 'Profile • Instagram'
        setPostUser(UserLogin.posts)
    }, [])

    useEffect(() => {
        setPostUser(UserLogin?.posts?.sort((a, b) => Number(b.time.replaceAll(':', '')) - Number(a.time.replaceAll(':', ''))))
    }, [UserLogin.posts])

    useEffect(() => {
        setnowContent(postUser?.findIndex(x => x._id === ItemPost._id))
    }, [ItemPost])


    // Modal Menu - Delete, Edit post
    const [modalMenuPost, setModalMenuPost] = useState('')

    const OpenMenuPost = (post) => {
        setModalMenuPost(post)

        ref_ModalMenu.current.style.display = 'block'
        setIsEmoji(false)
        const body = document.querySelector('body')
        if (ref_ModalMenu.current.style.display === 'block') {
            return body.style.overflow = 'hidden'
        }
    }
    const CloseMenuPost = () => {
        ref_ModalMenu.current.style.display = 'none'
        setIsEmoji(false)
    }


    const deletePost = () => {
    axios.delete('http://localhost:6070/removepost', { idPost: modalMenuPost?._id, idPeople: UserLogin?._id })
            .then(res => {
                if (res.status === 200) {
                    return axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
                        .then(res => Dispatch(getUserInfoLogin(res.data)))
                }
            })


        ref_ModalMenu.current.style.display = 'none'
        ref_modalSeePost.current.style.display = 'none'
        const body = document.querySelector('body')
        if (ref_modalSeePost.current.style.display === 'none') return body.style.overflow = 'auto'
    }


    // Button send comment
    const Btn_SendComment = () => {
    }













    return (
        <div>
            <div>
                {
                    postUser?.map(item => (
                        <div
                            id="box-Post"
                            key={item._id}
                            onClick={() => {
                                handleBoxPost(item)
                                captionComment.current.scrollTop = 0
                            }}
                        >
                            <section id="about-post">
                                <p><AiFillHeart id='like' />{item.like?.length} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <FaComment id='icon-comment' /> {item.comment?.length}</p>
                            </section>
                            <img
                                src={item.content}
                                alt="content post"
                                width='300'
                                height='300'
                                draggable={false}
                                loading='lazy'
                            />
                        </div>
                    ))
                }
                {postUser?.length !== 0 &&
                    <section style={{ width: '300px', height: '300px' }}></section>
                }
            </div>

            {/* Modal See Post */}
            <div id='modal-See-post' ref={ref_modalSeePost}>
                <section id='area-modal' onClick={() => CloseModalPost()}>
                    <AiOutlineClose id='close-modal' />
                </section>
                <BsFillArrowLeftCircleFill
                    id='arrow-circle-left'
                    onClick={() => setnowContent(nowContent - 1)}
                    style={{ display: postUser && postUser[0] === postUser[nowContent] ? 'none' : 'block' }}
                />

                <section id='body-modal'>
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
                    <div id='post-content'>
                        {postUser &&
                            <img
                                src={postUser[nowContent]?.content}
                                alt="content post"
                                width='760'
                                height='auto'
                                draggable={false}
                                loading='lazy'
                            />
                        }
                    </div>
                    <div id='caption-comment' ref={captionComment}>
                        <section>
                            <section>
                                <img
                                    src={UserLogin.profile_pic}
                                    id='pic-profile'
                                    alt="profile picture"
                                    width="50px"
                                    height="50px"
                                    draggable={false}
                                    loading='lazy'
                                />
                                {
                                    !UserLogin._id &&
                                    <>
                                        <p>•</p>
                                        <p>Follow</p>
                                    </>
                                }
                            </section>
                            <section><BsThreeDots onClick={() => OpenMenuPost(postUser[nowContent])} /></section>
                        </section>
                        <hr />
                        {postUser &&
                            <section id='caption'>{postUser[nowContent]?.caption}</section>
                        }
                        <hr />
                        <section id='comment-people'>

                        </section>
                        <hr />
                        <section id='sendComment-Like-Save-share-download'>
                            <article id='like-comment-share'>
                                {postUser && postUser[nowContent]?.like.some(item => item === UserLogin?._id) ?
                                    <TbHeart id='likeed' onClick={() => LikePost()} />
                                    :
                                    <TbHeart id='Nolike' onClick={() => LikePost()} />
                                }
                                <FaRegComment id='comment' />
                                <FiSend id='sendPost' />
                            </article>
                            <div id='save-download'>
                                {postUser && postUser[nowContent]?.savePeople.some(item => item === UserLogin?._id) ?
                                    <HiOutlineBookmark id='BookMark' onClick={() => bookMarks()} />
                                    :
                                    <HiOutlineBookmark id='NoBookMark' onClick={() => bookMarks()} />
                                }
                                <BsDownload id='download' />
                            </div>
                        </section>
                        <section id='Box-sendComment'>

                            <BsEmojiSmile id='emojiSmile' onClick={() => setIsEmoji(!isEmoji)} />
                            <input
                                type="text"
                                style={{ position: 'sticky' }}
                                spellCheck='false'
                                translate='false'
                                placeholder='Add a comment...'
                                value={comment}
                                onChange={(event) => {
                                    setComment(event.target.value)
                                    setIsEmoji(false)
                                }}
                            />
                            <button
                                id='sendPost'
                                disabled={comment ? false : true}
                                onClick={Btn_SendComment}
                            >
                                Post
                            </button>
                        </section>
                    </div>
                </section>
                <BsFillArrowRightCircleFill
                    id='arrow-circle-right'
                    onClick={() => setnowContent(nowContent + 1)}
                    style={{
                        display: postUser && postUser[postUser.length - 1] === postUser[nowContent] ? 'none' : 'block'
                    }}
                />
            </div>


            {/* Menu Post */}
            <div id='modal-menuPost' ref={ref_ModalMenu}>
                <section id='areaClosePost' onClick={CloseMenuPost}></section>
                <section id='body-modal'>
                    <button onClick={() => deletePost()}>Delete</button>
                    <button>Edit</button>
                    <button>Hide like count</button>
                    <button>Turn on commenting</button>
                    <button>Go to post</button>
                    <button onClick={CloseMenuPost}>Cancel</button>
                </section>
            </div>
        </div>
    )
}


export default Content_post