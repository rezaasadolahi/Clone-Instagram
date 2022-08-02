const { Collection } = require('../Model/Collection')




exports.findAllCollection = (req, res) => {
    Collection.find((error, data) => {
        if (error) return res.send(error)
        res.status(200).send(data)
    }).populate('content_collection').populate('ID_People')
}



exports.findeOneCollection = (req, res) => {
    const id = req.body.id

    if (id) {
        return Collection.findById(id, (error, data) => {
            if (error) {
                return res.status(500).send({ message: err.message || "Error retrieving user with id" })
            } else {
                return res.send(data)
            }
        }).populate('content_collection')
    }
}