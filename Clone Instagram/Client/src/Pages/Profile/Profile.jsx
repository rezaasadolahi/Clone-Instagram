import { useRef, useLayoutEffect, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//* Icons
import { AiTwotoneSetting, AiOutlineTable } from "react-icons/ai"
import { MdBookmarkBorder } from "react-icons/md"
import { TiContacts } from "react-icons/ti"
//* CSS
import './scss/Profile.scss'
//* Components
const Content_post = lazy(() => import('./Content post/Content_post'))
const Collections = lazy(() => import('./Collection/Collections'))









function Profile() {
  const UserLogin = useSelector(state => state.Reducer.Get_Info_Account)
  const navigate = useNavigate()
  const postLabel = useRef()

  useLayoutEffect(() => {
    setTimeout(() => postLabel.current.click(), 1)

    setTimeout(() => {
      const label = document.querySelectorAll('label')
      const content_posts = document.getElementById('content-posts')
      const content_save = document.getElementById('content-save')
      const content_tagged = document.getElementById('content-tagged')


      label.forEach(item => {
        item.addEventListener('click', () => {

          (item.getAttribute('for') === 'post' ?
            content_posts.style.display = 'block' :
            content_posts.style.display = 'none'
          ) &&
            (item.getAttribute('for') === 'saved' ?
              content_save.style.display = 'block' :
              content_save.style.display = 'none'
            )
            &&
            (
              item.getAttribute('for') === 'tagged' ?
                content_tagged.style.display = 'block' :
                content_tagged.style.display = 'none'
            )
        })
      })
    }, 1)
  }, [])











  return (
    <div id='Profile'>
      <section id='manage-all-profile'>

        <section id='picPro-otherDetail-Header'>
          <div id='box1'>
            <img
              src={UserLogin.profile_pic}
              id='picture'
              alt="This is profile picture"
              width="50px" height="45px"
              draggable={false}
              loading='lazy'
            />
          </div>

          <div id='box2'>
            <section id='idPage-EditProfile-Setting'>
              <p>{UserLogin.username}</p>
              <button onClick={() => {
                navigate('/editprofile', { replace: true })
                document.title = 'Edit profile • Instagram'
              }}
              >
                Edit profile
              </button>
              <AiTwotoneSetting id='setting' />
            </section>

            <section id='posts-followers-following'>
              <div id='posts'>
                <span>{UserLogin.posts?.length}</span>
                <span>posts</span>
              </div>
              <div id='followers'>
                <span>{UserLogin.followers?.length}</span>
                <span>followers</span>
              </div>
              <div id='following'>
                <span>{UserLogin.following?.length}</span>
                <span>following</span>
              </div>
            </section>

            <div id='biography'>
              <p>
                {UserLogin?.bio}
              </p>
            </div>
          </div>
        </section>
        <hr />
        <div id='posts-saved-tagged'>
          <input type="radio" name="clicked-part" id="post" defaultChecked hidden />
          <label ref={postLabel} htmlFor="post" id='part-posts'>
            <AiOutlineTable id='icon-post' />
            POSTS
          </label>

          <input type="radio" name="clicked-part" id="saved" hidden />
          <label htmlFor="saved" id='part-saved'>
            <MdBookmarkBorder id='icon-save' />
            SAVED
          </label>

          <input type="radio" name="clicked-part" id="tagged" hidden />
          <label htmlFor="tagged" id='part-tagged '>
            <TiContacts id='icon-tagge' />
            TAGGED
          </label>
        </div>

        <div id='content-below-label'>
          <div id='manage-all-content'>
            <section id='content-posts'>
              <Suspense fallback={<h1>Loading...</h1>}>
                <Content_post />
              </Suspense>
            </section>
            <section id='content-save'>
              <Suspense fallback={<h1>Loading...</h1>}>
                <Collections />
              </Suspense>
            </section>

            <section id='content-tagged'>

            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile