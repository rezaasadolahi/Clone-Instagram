const { People } = require('../Model/Peoples')
const { Posts } = require('../Model/Posts')




exports.registerUser = async (req, res) => {
    const { firstName, lastName, username, password, email } = req.body

    if (!username || !email || !password) return res.json({ errorMessage: 'fill the all field' })

    if (await People.findOne({ username })) return res.send('User already exists')

    const newPeople = await People.create({ firstName, lastName, username, email, password })

    if (newPeople) {
        return res.status(201).json({
            _id: newPeople._id,
            firstName,
            lastName,
            username,
            email,
            password,
        })
    } else {
        res.send('Was not registered')
    }
}



exports.Login = (req, res) => {
    const { user_email_phone, password } = req.body


    if (user_email_phone?.match('@gmail.com')) {
        People.findOne({ email: user_email_phone }, (error, user) => {
            user?.password === password
                ?
                res.send({ message: 'Login successfull', user: user })
                :
                res.send({ message: error || 'User not registerd' })
        }).populate('followers').populate('following').populate('block').populate('story').populate('posts').populate('savePost').populate('collections').populate({
            path: 'collections',
            populate: {
                path: 'content_collection'
            }
        })
    }
    if (!user_email_phone?.match('@gmail.com')) {
        return People.findOne({ username: user_email_phone }, (error, user) => {
            user?.password === password
                ?
                res.send({ message: 'Login successfull', user: user })
                :
                res.send({ message: error || 'User not registerd' })
        }).populate('followers').populate('following').populate('block').populate('story').populate('posts').populate('savePost').populate('collections').populate({
            path: 'collections',
            populate: {
                path: 'content_collection'
            }
        })
    }
    if (user_email_phone?.match(/[0-9](\d{2}){4}$/)) {
        return People.findOne({ phone: user_email_phone }, (error, user) => {
            user?.password === password
                ?
                res.send({ message: 'Login successfull', user: user })
                :
                res.send({ message: error || 'User not registerd' })
        }).populate('followers').populate('following').populate('block').populate('story').populate('posts').populate('savePost').populate('collections').populate({
            path: 'collections',
            populate: {
                path: 'content_collection'
            }
        })
    }
}



exports.updateFirstName = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { firstName: req.body.firstName })
        .then(data => {
            res.send(data)
        })
}



exports.updateLastName = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { lastName: req.body.lastName })
        .then(data => {
            res.send(data)
        })
}



exports.updateUserName = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { username: req.body.username })
        .then(data => {
            res.send(data)
        })
}



exports.updatePassWord = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { password: req.body.password })
        .then(data => {
            res.send(data)
        })
}



exports.updateEmail = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { email: req.body.email })
        .then(data => {
            res.send(data)
        })
}



exports.updateBio = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { bio: req.body.bio })
        .then(data => {
            res.send(data)
        })
}



exports.updatePhone = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { phone: req.body.phone })
        .then(data => {
            res.send(data)
        })
}



exports.UpdatePicProfile = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { profile_pic: req.body.picPro })
        .then(data => {
            res.send(data)
        })
}



exports.UpdatePosts_add = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { $push: { posts: req.body.posts } })
        .then(data => {
            res.send(data)
        })
}



exports.UpdatePosts_remove = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { $pull: { posts: req.body.idPosts } })
        .then(data => {
            res.send(data)
        })
}



exports.UpdateHighlight = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { highlight: req.body.highlight })
        .then(data => {
            res.send(data)
        })
}



exports.UpdatePrivate_account = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { Private_account: req.body.Private_account })
        .then(data => {
            res.send(data)
        })
}



exports.Followers = async (req, res) => {
    if (!await People.findOne({ followers: req.body.idPeople })) {
        return await People.findOneAndUpdate({ _id: req.body.id }, { $push: { followers: req.body.idPeople } })
            .then(data => {
                res.send(data)
            })
    } else {
        await People.findOneAndUpdate({ _id: req.body.id }, { $pull: { followers: req.body.idPeople } })
            .then(data => {
                res.send(data)
            })
    }
}



exports.Following = async (req, res) => {
    if (!await People.findOne({ following: req.body.idPeople })) {
        return await People.findOneAndUpdate({ _id: req.body.id }, { $push: { following: req.body.idPeople } })
            .then(data => {
                res.send(data)
            })
    } else {
        await People.findOneAndUpdate({ _id: req.body.id }, { $pull: { following: req.body.idPeople } })
            .then(data => {
                res.send(data)
            })
    }
}



exports.Block = async (req, res) => {
    if (!await People.findOne({ block: req.body.idPeople })) {
        return await People.findOneAndUpdate({ id: req.body.id }, { $push: { block: req.body.idPeople } })
            .then(data => {
                res.send(data)
            })
    } else {
        await People.findOneAndUpdate({ _id: req.body.id }, { $pull: { block: req.body.idPeople } })
            .then(data => {
                res.send(data)
            })
    }
}



exports.UpdateWebsite = async (req, res) => {
    await People.findOneAndUpdate({ _id: req.body.id }, { website: req.body.website })
        .then(data => {
            res.send(data)
        })
}



exports.UpdateSave = async (req, res) => {
    const { idPost, idPeople } = req.body

    if (!await People.findOne({ savePost: idPost })) {
        return await People.findOneAndUpdate({ _id: idPeople }, { $push: { savePost: idPost } })
            .then(data => {
                if (data.username) {
                    return Posts.findByIdAndUpdate({ _id: idPost }, { $push: { savePeople: idPeople } })
                        .then(data => res.send(data))
                }
                res.send(data)
            })
    } else {
        await People.findOneAndUpdate({ _id: idPeople }, { $pull: { savePost: idPost } })
            .then(data => {
                if (data.username) {
                    return Posts.findByIdAndUpdate({ _id: idPost }, { $pull: { savePeople: idPeople } })
                        .then(data => res.send(data))
                }
                res.send(data)
            })
    }
}

