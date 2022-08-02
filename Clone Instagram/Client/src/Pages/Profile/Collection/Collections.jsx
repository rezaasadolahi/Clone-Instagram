import { useRef, useState, startTransition } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
//* Icons
import { AiOutlineClose } from "react-icons/ai"
import { BsChevronLeft, BsCheckLg } from "react-icons/bs"
//* CSS
import './Scss/Content_Collections.scss'
//* Redux 
import { getUserInfoLogin } from '../../../Redux/Action/Creator'









function Content_Collections() {
    const [nameCollectionValue, setNameCollectionValue] = useState('')
    const UserLogin = useSelector(state => state.Reducer.Get_Info_Account)
    const Dispatch = useDispatch()
    const Modal_addConnection = useRef()
    const [addFromSaved, setAddFromSaved] = useState(false)
    const [selectedImg, setSelectedImg] = useState([])

    const addCollection = () => {
        Modal_addConnection.current.style.display = 'block'
        const body = document.querySelector('body')
        if (Modal_addConnection.current.style.display === 'block') {
            body.style.overflow = 'hidden'
        }
    }

    const CloseModal = () => {
        setAddFromSaved(false)
        setNameCollectionValue('')
        Modal_addConnection.current.style.display = 'none'
        const body = document.querySelector('body')
        if (Modal_addConnection.current.style.display === 'none') {
            return body.style.overflow = 'auto'
        }
    }

    const nextHandle = () => {
        setAddFromSaved(!addFromSaved)
    }

    const arrowLeft = () => {
        setAddFromSaved(false)
        setNameCollectionValue('')
    }

    const select_post_Saved_For_Collection = (item) => {
        if (selectedImg?.find((value) => value === item)) {
            return setSelectedImg(
                selectedImg?.filter((value) => value._id !== item._id)
            )
        } else {
            startTransition(() => {
                setSelectedImg([...selectedImg, item])
            })
        }
    }

    const done = async () => {
        CloseModal()

        await axios.post('http://localhost:6070/createcollection', {
            name_collection: nameCollectionValue,
            content_collection: selectedImg,
            ID_People: UserLogin._id
        }).then(res => {
                if (res.status === 200) {
                    return axios.post('http://localhost:6070/findeonepeople', { id: UserLogin?._id })
                        .then(res => Dispatch(getUserInfoLogin(res.data)))
                }
            })
    }










    return (
        <div id='Content_Collection'>
            <section id='add-Collection'>
                <p id='about-Add-Collection'>Only you can see what you've saved</p>
                <p id='new-collection' onClick={addCollection}>+ New Collection</p>
                {/* Modal */}
                <div id='modal-add-collection' ref={Modal_addConnection}>
                    <section id='area-modal' onClick={() => CloseModal()}></section>
                    {/* Enter name collection and go to the next step  */}
                    {!addFromSaved &&
                        <section id='body-modal'>
                            <div id='header-Modal'>
                                <p id='title-header'>New Collection</p>
                                <AiOutlineClose id='close-modal' onClick={() => CloseModal()} />
                            </div>

                            <div id='box-enter-Collection-name'>
                                <input
                                    type="text"
                                    name="name_collection"
                                    placeholder='Collection name'
                                    value={nameCollectionValue}
                                    onChange={(event) => setNameCollectionValue(event.target.value)}
                                    translate='no'
                                    spellCheck='false'
                                    autoComplete='off'
                                    required
                                />
                            </div>

                            <div id='box-next'>
                                <button
                                    disabled={!nameCollectionValue}
                                    onClick={nextHandle}
                                >
                                    Next
                                </button>
                            </div>
                        </section>
                    }

                    {/* Add from all saveposts */}
                    {addFromSaved &&
                        <section id='add-From-saved'>
                            <div id='header'>
                                <AiOutlineClose id='close-modal' onClick={() => CloseModal()} />
                                <p id='title-header'>New Collection</p>
                                <BsChevronLeft id='arrowLeft' onClick={arrowLeft} />
                            </div>
                            <div id='body_modal'>
                                <section>
                                    {
                                        UserLogin?.savePost?.map(item => (
                                            <div id='box-img' key={item._id}>
                                                <div
                                                    id='box-selected-img'
                                                    style={{ display: selectedImg?.find((value) => value === item) && 'block' }}
                                                    onClick={() => select_post_Saved_For_Collection(item)}
                                                >
                                                    {
                                                        selectedImg?.find((value) => value === item)
                                                        && <BsCheckLg id='checkSelected' />
                                                    }
                                                </div>
                                                <img
                                                    src={item.content}
                                                    alt="image saved"
                                                    loading='lazy'
                                                    draggable='false'
                                                />
                                            </div>
                                        ))
                                    }
                                </section>
                            </div>
                            <div id='box-done'>
                                <button onClick={() => done()}>Done</button>
                            </div>
                        </section>
                    }
                </div>
            </section>

            <section id='collections'>
                <section id='Box-All-Saved'>
                    <p>All post</p>
                    {
                        UserLogin?.savePost?.slice(0, 4).map(item => (
                            <img key={item._id}
                                src={item.content}
                                alt="image saved"
                                loading='lazy'
                                draggable='false'
                                width='150'
                                height='150'
                            />
                        ))
                    }
                </section>

                {/* Collection create */}
                {
                    UserLogin?.collections?.slice(0, 4).map(item => (
                        <section id='Box-Connections' key={item._id}>
                            <p>{item.name_collection}</p>
                            {item.content_collection.map(item => (
                                <img
                                    key={item._id}
                                    src={item.content}
                                    alt="image saved"
                                    loading='lazy'
                                    draggable='false'
                                />
                            ))
                            }
                            <section style={{ width: '150px', height: '150px' }}></section>
                        </section>
                    ))
                }
                <section style={{ width: '26.46%', height: '300px', }}></section>
            </section>
        </div>
    )
}


export default Content_Collections