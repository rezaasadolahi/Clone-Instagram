const { Schema, model } = require('mongoose')




exports.People = model('people',
    new Schema({
        firstName: String,
        lastName: String,
        username: { type: String, unique: true },
        password: { type: String },
        email: { type: String, unique: true, default: '' },
        bio: { type: String, default: '' },
        phone: { type: String, default: '' },
        profile_pic: { type: String, default: "https://b2n.ir/a94000" },
        followers: [{ type: Schema.Types.ObjectId, ref: 'people' }],
        following: [{ type: Schema.Types.ObjectId, ref: 'people' }],
        request: [{ type: Schema.Types.ObjectId, ref: 'people' }],
        block: [{ type: Schema.Types.ObjectId, ref: 'people' }],
        highlight: [{ type: String }],
        blueTick: { type: Boolean, default: false },
        story: [{ type: String }],
        website: { type: String, default: '' },
        gender: { type: String },
        Private_account: { type: Boolean, default: false },
        posts: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
        savePost: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
        collections: [{ type: Schema.Types.ObjectId, ref: 'collection' }],
    })
)