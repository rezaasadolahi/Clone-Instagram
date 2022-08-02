const { Schema, model } = require('mongoose')




exports.Posts = model('posts',
    new Schema({
        date: String,
        time: String,
        content: [{ type: String }],
        caption: { type: String, default: '' },
        location: { type: String, default: '' },
        like: [{ type: Schema.Types.ObjectId, ref: 'people' }],
        comment: [{ type: Schema.Types.ObjectId, ref: 'people' }],
        ID_People: { type: Schema.Types.ObjectId, ref: 'people' },
        savePeople: [{ type: Schema.Types.ObjectId, ref: 'people' }],
        option: { type: [{ type: String }], default: ['report', 'unFollow'] },
    })
)