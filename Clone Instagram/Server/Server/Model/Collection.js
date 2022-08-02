const { Schema, model } = require('mongoose')




exports.Collection = model('collection',
    new Schema({
        name_collection: { type: String },
        content_collection: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
        ID_People: { type: Schema.Types.ObjectId, ref: 'people' }
    })
)