const { Posts } = require('../Model/Posts')
const { People } = require('../Model/Peoples')
const { Collection } = require('../Model/Collection')





exports.AddPost = async (req, res) => {
    const { content, caption, location, ID_People } = req.body

    const datee = new Date()
    const TodayDate = datee.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    const todayTime = `${datee.getHours()}:${datee.getMinutes()}:${datee.getSeconds()}:${datee.getMilliseconds()}`


    const newPost = await Posts.create({
        date: TodayDate,
        time: todayTime,
        content,
        caption,
        location,
        ID_People
    })


    if (newPost) {
        await People.findOneAndUpdate({ _id: ID_People }, { $push: { posts: newPost?._id } })
        return res.send({
            _id: newPost._id,
            date: newPost.date,
            time: newPost.time,
            caption,
            location,
            ID_People
        })
    } else {
        res.send('Was not Posted')
    }
}



exports.UpdateLike = async (req, res) => {
    const { idPost, idPeople } = req.body

    if (!await Posts.findOne({ like: idPeople })) {
        return await Posts.findOneAndUpdate({ _id: idPost }, { $push: { like: idPeople } }).then(data => res.send(data))
    } else {
        await Posts.findOneAndUpdate({ _id: idPost }, { $pull: { like: idPeople } }).then(data => res.send(data))
    }
}



exports.Remove_Post = async (req, res) => {
    const { idPost, idPeople } = req.body

    return await Posts.findOneAndDelete({ _id: idPost })
        .then(data => {
            if (data) {
                People.findOneAndUpdate({ _id: idPeople },
                    { $pull: { posts: idPost, savePost: idPost } }
                ).then(data => {
                    if (data) {
                        Collection.updateMany({}, {
                            $pull: {
                                content_collection: idPost
                            }
                        })
                            .then(data => res.send(data))
                    }
                })
            }
        })
}


