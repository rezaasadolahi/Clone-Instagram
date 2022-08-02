const { Posts } = require('../Model/Posts')




exports.findeAllpost = (req, res) => {
    Posts.find((error, data) => {
        if (error) return res.send(error)
        res.status(200).send(data)
    })
}



exports.findPostsOnePeople = (req, res) => {
    const id = req.body.id

    if (id) {
        Posts.findById(id, (error, data) => {
            if (error) {
                return res.status(500).send({ message: "Error retrieving user with id" })
            } else {
                return res.send(data)
            }
        })
    }
}
