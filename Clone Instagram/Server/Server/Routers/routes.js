const express = require('express')
const router = express.Router()
//* Controller
const { registerUser,
    Login,
    updateFirstName,
    updateLastName,
    updateUserName,
    updatePassWord,
    updateEmail,
    updateBio,
    updatePhone,
    UpdatePicProfile,
    UpdatePosts_add,
    UpdatePosts_remove,
    UpdateHighlight,
    UpdatePrivate_account,
    Followers,
    Following,
    Block,
    UpdateWebsite,
    UpdateSave,
} = require('../Controller/People')
const { AddPost, UpdateLike, Remove_Post } = require('../Controller/Post')
const { CreateCollection } = require('../Controller/Collection')
const { CreateHashtag } = require('../Controller/Hashtag')
//* Services
const { findeOnePeople, findeAllPeople } = require('../Services/People')
const { findeAllpost, findPostsOnePeople } = require('../Services/Post')
const { findAllCollection, findeOneCollection } = require('../Services/Collection')








//* Controller
//-> People
router.route('/register').post(registerUser)
router.route('/login').post(Login)
router.route('/followers').put(Followers)
router.route('/following').put(Following)
router.route('/updatefirstname').put(updateFirstName)
router.route('/updatelastname').put(updateLastName)
router.route('/updateusername').put(updateUserName)
router.route('/updatepassword').put(updatePassWord)
router.route('/updateemail').put(updateEmail)
router.route('/updatebio').put(updateBio)
router.route('/updatephone').put(updatePhone)
router.route('/updatepicpro').put(UpdatePicProfile)
router.route('/updatepostsadd').put(UpdatePosts_add)
router.route('/updatepostsremove').put(UpdatePosts_remove)
router.route('/updatehighlight').put(UpdateHighlight)
router.route('/updateprivateaccount').put(UpdatePrivate_account)
router.route('/addblock').put(Block)           //?body.  id / idPeople
router.route('/updatewebsite').put(UpdateWebsite)
router.route('/updatesave').put(UpdateSave)
//-> Post
router.route('/addpost').post(AddPost)
router.route('/updatelikepost').put(UpdateLike)
router.route('/updatelikepost').put(UpdateLike)
router.route('/removepost').delete(Remove_Post)
//-> Collection
router.route('/createcollection').post(CreateCollection)
//-> Hashtag
router.route('/createhashtag').post(CreateHashtag)









//* Services
//-> People
router.route('/findeallpeople').get(findeAllPeople)
router.route('/findeonepeople').post(findeOnePeople)      //?body.  id
//-> Post
router.route('/findeallpost').get(findeAllpost)
router.route('/findpostsonepeople').get(findPostsOnePeople)
//-> Collection
router.route('/findallcollection').get(findAllCollection)
router.route('/findeonecollection').post(findeOneCollection)









module.exports = router