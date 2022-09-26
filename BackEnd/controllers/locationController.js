const location = require('../models/location');
const eventTypesEnum = require('../models/eventTypesEnum')

const mongoose = require('mongoose');

const pageSize = 5;
module.exports.get = async (req, res) => {


    let query = location.find();
    if (req.body.filter) {
        let { pageNumber } = req.body.page;
        query = query.skip(pageNumber * pageSize).limit(pageSize);

    }
    let result = await query.transform((data) => data.map(a => a._doc));

    res.json({ succes: 1, data: result })
}

module.exports.create = async (req, res) => {

    await location.create(req.body);

    res.json({ success: 1 });
}


module.exports.update = async (req, res) => {

    await location.updateOne({ _id: req.params.id }, req.body);

    res.json({ success: 1 });
}

module.exports.delete = async (req, res) => {

    await location.deleteOne({ _id: req.params.id });

    res.json({ success: 1 });
}


module.exports.getEventTypes = async (req, res) => {


    let result = [];
    for (const [key, value] of Object.entries(eventTypesEnum)) {

        let obj = {};
        obj.key = key;
        obj.value = value;
        //obj[key] = value;
        result.push(obj);
    }

    res.json({ success: 1, data: result })


}



