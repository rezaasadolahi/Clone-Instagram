const { Collection } = require('../Model/Collection')
const { People } = require('../Model/Peoples')






exports.CreateCollection = async (req, res) => {
    const { name_collection, content_collection, ID_People } = req.body

    const newCollection = await Collection.create({
        name_collection,
        content_collection,
        ID_People
    })

    if (newCollection) {
        await People.findOneAndUpdate({ _id: ID_People }, { $push: { collections: newCollection?._id } })
        return res.send({
            _id: newCollection?._id,
            name_collection,
            content_collection,
            ID_People
        })
    } else {
        res.send('Was not Saved')
    }
}
