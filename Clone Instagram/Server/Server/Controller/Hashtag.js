const { Hashtag } = require('../Model/Hashtag')





exports.CreateHashtag = async (req, res) => {
    const { nameHashtag, contentHashtag, peopleUsed } = req.body

    const datee = new Date()
    const TodayDate = datee.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    const todayTime = `${datee.getHours()}:${datee.getMinutes()}:${datee.getSeconds()}:${datee.getMilliseconds()}`

    const newHashtag = await Hashtag.create({
        nameHashtag,
        contentHashtag,
        peopleUsed,
        date: TodayDate,
        time: todayTime
    })

    if (newHashtag) {
        res.send({
            _id: newHashtag._id,
            nameHashtag,
            contentHashtag,
            peopleUsed,
            date: newHashtag.date,
            time: newHashtag.time
        })
    } else {
        res.send('Was not Posted')
    }
}