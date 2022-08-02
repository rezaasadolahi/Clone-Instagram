const { People } = require('../Model/Peoples')




exports.findeAllPeople = (req, res) => {
    People.find({}, (error, data) => {
        if (error) return res.send(error)
        res.status(200).send(data)
    })
}



exports.findeOnePeople = (req, res) => {
    const id = req.body.id

    if (id) {
        return People.findById(id, (error, data) => {
            if (error) {
                return res.status(500).send({ message: err.message || "Error retrieving user with id" })
            } else {
                return res.send(data)
            }
        }).populate('followers')
            .populate('following')
            .populate('block')
            .populate('story')
            .populate('posts')
            .populate('savePost')
            .populate({
                path: 'collections',
                populate: {
                    path: 'content_collection'
                }
            })

    }
}
