const { Schema, model } = require('mongoose')





exports.Hashtag = model('hashtag',
    new Schema({
        nameHashtag: { type: String },
        contentHashtag: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
        peopleUsed: [{ type: Schema.Types.ObjectId, ref: 'people' }],
        date: { type: String },
        time: { type: String }
    })
)