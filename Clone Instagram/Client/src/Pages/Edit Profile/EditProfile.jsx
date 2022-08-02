import { useRef, useEffect, useLayoutEffect } from 'react'
//* CSS
import './Scss/EditProfile.scss'
//* Component
import Edite_profile from './Content front of aside/Edite profile/Edite profile'
import Change_password from './Content front of aside/Change password/Change password'













function EditProfile() {
    const firstLabel = useRef()


    useLayoutEffect(() => {
        setTimeout(() => {
            const LabelBox = document.querySelectorAll('label')
            const content_editePro = document.getElementById('content-editePro')
            const content_ChangePassword = document.getElementById('content-ChangePassword')
            const content_Apps_and_website = document.getElementById('content-Apps-and-website')
            const content_Email_notification = document.getElementById('content-Email-notification')
            const content_Push_notification = document.getElementById('content-Push-notification')
            const content_Manage_contacts = document.getElementById('content-Manage-contacts')
            const content_Privacy_and_security = document.getElementById('content-Privacy-and-security')
            const content_Ads = document.getElementById('content-Ads')
            const content_Login_activity = document.getElementById('content-Login-activity')
            const content_Emails_from_Instagram = document.getElementById('content-Emails-from-Instagram')
            const content_Help = document.getElementById('content-Help')
            LabelBox.forEach(item => {
                item.addEventListener('click', () => {
                    (
                        item.getAttribute('for') === 'box1' ?
                            content_editePro.style.display = 'block' :
                            content_editePro.style.display = 'none'
                    ) && (
                            item.getAttribute('for') === 'box2' ?
                                content_ChangePassword.style.display = 'block' :
                                content_ChangePassword.style.display = 'none'
                        ) && (
                            item.getAttribute('for') === 'box3' ?
                                content_Apps_and_website.style.display = 'block' :
                                content_Apps_and_website.style.display = 'none'
                        ) && (
                            item.getAttribute('for') === 'box4' ?
                                content_Email_notification.style.display = 'block' :
                                content_Email_notification.style.display = 'none'
                        ) && (
                            item.getAttribute('for') === 'box5' ?
                                content_Push_notification.style.display = 'block' :
                                content_Push_notification.style.display = 'none'
                        ) && (
                            item.getAttribute('for') === 'box6' ?
                                content_Manage_contacts.style.display = 'block' :
                                content_Manage_contacts.style.display = 'none'
                        ) && (
                            item.getAttribute('for') === 'box7' ?
                                content_Privacy_and_security.style.display = 'block' :
                                content_Privacy_and_security.style.display = 'none'
                        ) && (
                            item.getAttribute('for') === 'box8' ?
                                content_Ads.style.display = 'block' :
                                content_Ads.style.display = 'none'
                        ) && (
                            item.getAttribute('for') === 'box9' ?
                                content_Login_activity.style.display = 'block' :
                                content_Login_activity.style.display = 'none'
                        ) && (
                            item.getAttribute('for') === 'box10' ?
                                content_Emails_from_Instagram.style.display = 'block' :
                                content_Emails_from_Instagram.style.display = 'none'
                        ) && (
                            item.getAttribute('for') === 'box11' ?
                                content_Help.style.display = 'block' :
                                content_Help.style.display = 'none'
                        )

                    console.clear()
                })
            })
        }, 1)
    }, [])


    useEffect(() => {
        setTimeout(() => firstLabel.current.click(), 1)
    }, [])







    return (
        <div id="manage-all">
            <aside>
                <input type="radio" name="box" id="box1" hidden defaultChecked />
                <label ref={firstLabel} htmlFor="box1">Edite profile</label>

                <input type="radio" name="box" id="box2" hidden />
                <label htmlFor="box2">Change password</label>

                <input type="radio" name="box" id="box3" hidden />
                <label htmlFor="box3">Apps and website</label>

                <input type="radio" name="box" id="box4" hidden />
                <label htmlFor="box4">Email notification</label>

                <input type="radio" name="box" id="box5" hidden />
                <label htmlFor="box5">Push notification</label>

                <input type="radio" name="box" id="box6" hidden />
                <label htmlFor="box6">Manage contacts</label>

                <input type="radio" name="box" id="box7" hidden />
                <label htmlFor="box7">Privacy and security</label>

                <input type="radio" name="box" id="box8" hidden />
                <label htmlFor="box8">Ads</label>

                <input type="radio" name="box" id="box9" hidden />
                <label htmlFor="box9">Login activity</label>

                <input type="radio" name="box" id="box10" hidden />
                <label htmlFor="box10">Emails from Instagram</label>

                <input type="radio" name="box" id="box11" hidden />
                <label htmlFor="box11">Help</label>
            </aside>
            <section id="content-front-Of-label">
                <div id="content-editePro"><Edite_profile /></div>
                <div id="content-ChangePassword"><Change_password /></div>
                <div id="content-Apps-and-website">Content Apps and website</div>
                <div id="content-Email-notification">Content Email notification</div>
                <div id="content-Push-notification">Content Push notification</div>
                <div id="content-Manage-contacts">Content Manage contacts</div>
                <div id="content-Privacy-and-security">Content Privacy and security</div>
                <div id="content-Ads">Content Ads</div>
                <div id="content-Login-activity">Content Login activity</div>
                <div id="content-Emails-from-Instagram">Content Emails from Instagram</div>
                <div id="content-Help">Content Help</div>
            </section>
        </div>
    )
}

export default EditProfile