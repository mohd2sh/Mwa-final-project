const event = require('../models/event');

const pageSize = 5;
module.exports.get = async (req, res) => {


    let objFilter = queryBuildForGet(req);

    let query = event.find(objFilter);

    if (req.body.filter) {
        let { pageNumber } = req.body.page;
        query = query.skip(pageNumber * pageSize).limit(pageSize);

    }
    let result = await query.transform((data) => data.map(a => a._doc));

    res.json({ succes: 1, data: result })
}

module.exports.getById = async (req, res) => {
    let id = req.params.id;
    let result = await event.findById(id);

    res.json({ succes: 1, data: result._doc })
}

module.exports.create = async (req, res, next) => {
    try {
        await event.create(req.body);
        res.json({ success: 1 });
    }
    catch (err) {
        next(new Error(err.message));
    }

}

module.exports.update = async (req, res, next) => {
    try {
        await event.updateOne({ _id: req.params.id }, req.body);
        res.json({ success: 1 });
    }
    catch (err) {
        next(new Error(err.message));
    }

}

module.exports.delete = async (req, res, next) => {
    try {
        await event.deleteOne({ _id: req.params.id });
        res.json({ success: 1 });
    }
    catch (err) {
        next(new Error(err.message));
    }

}

module.exports.addParticipants = async (req, res, next) => {
    try {
        let eventId = req.params.id;
        //Add participant into specific event.
        await event.updateOne({ _id: eventId }, {
            $push: { participants: req.body }
        });
        res.json({ success: 1 });
    }
    catch (err) {
        next(new Error(err.message));
    }

}


module.exports.removeParticipants = async (req, res, next) => {
    try {
        let eventId = req.params.id;
        let participantId = req.params.participant_id;

        //Add participant into specific event.
        await event.updateOne({ _id: eventId }, {
            $pull: { 'participants': { _id: participantId } }
        }

        );
        res.json({ success: 1 });
    }
    catch (err) {
        next(new Error(err.message));
    }

}



function queryBuildForGet(req) {
    let { lng, lat, userId, type } = req.query;
    if (lng && lat) {
        return {
            'participants._id': { $ne: req.user.id },
            'start': { $gt: new Date() },
            'location.location': {
                "$near":
                {
                    "$geometry": {
                        "type": "Point",
                        "coordinates": [lng, lat]
                    },
                    $maxDistance: 5000
                }

            },
            // 'location.location': { $near: [lng, lat] },

        };
    }
    if (userId) {
        if (type == null) {
            //Get events where the user  participating in it
            return { 'participants._id': userId };

        } else {
            switch (type) {
                case 'upcoming':
                    return { 'participants._id': userId, 'start': { $gt: new Date() } };
                case 'manage':
                    return { 'managedBy': req.user.id };
                default: //case 'past':
                    return { 'participants._id': userId, 'start': { $lt: new Date() } }

            }
        }
    }
    //Get events where the user not participating in it
    return { 'participants._id': { $ne: req.user.id } };
}
