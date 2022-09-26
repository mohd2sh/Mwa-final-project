const attachment = require('../models/attachment');

const mongoose = require('mongoose');
const uuidv4 = require('uuid').v4; // I chose v4 ‒ you can select others



module.exports.upload = async (req, res, next) => {

    let file = req.files.myFile;



    const blobName = file.name;
    //Generate a unique name for it.
    const extention = blobName.split('.')[1];
    var uniqueFileName = uuidv4() + "." + extention;

    const blockBlobClient = req.containerClient.getBlockBlobClient(uniqueFileName);

    //Upload it to azure blob storage
    const uploadBlobResponse = await blockBlobClient.upload(file.data, file.size);

    //Save it into db
    let attachmentObj = {
        fileName: blobName,
        fileUrl: blockBlobClient.url
    };
    let result = await attachment.create(attachmentObj)

    attachmentObj._id = result._id;


    res.json({ success: 1, data: attachmentObj })
}


