const express = require('express');
require('dotenv').config()
const fileUpload = require('express-fileupload')
const userRouters = require('./routers/userRoutes')
const locationRouters = require('./routers/locationRoutes');
const eventRouters = require('./routers/eventRoutes');
const attachentRouters = require('./routers/attachmentRoutes');

const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

const path = require('path');
const fs = require('fs')

const mongoose = require('mongoose');
const jwtMiddleware = require('./middlewares/jwtMiddleware');

//Azure blob storage
const { BlobServiceClient } = require("@azure/storage-blob");
const connStr = process.env.Azure_Storage_ConnectionString;
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
const containerClient = blobServiceClient.getContainerClient('test');
const port = process.env.PORT || 3000;

app.use((req, res, next) => {

    req.containerClient = containerClient;

    if (mongoose.connection.readyState === 1) {//already connected

    }
    else {
        mongoose.connect(`mongodb+srv://mohd2sh:${process.env.DB_Password}@cluster0.iefm1mk.mongodb.net/finalProject?retryWrites=true&w=majority`)
    }

    req.db = mongoose.connection;
    next();
})

var morgan = require('morgan')
 

app.use(morgan('dev'))

app.use('/static', express.static( 'static'))

app.get('/',async (req,res)=>{
    fs.createReadStream(path.join(__dirname, 'static','index.html')).pipe(res);
})

app.use(fileUpload({
    //limits: { fileSize: 50 * 1024 * 1024 },
}));


app.use('/api/auth', userRouters);

app.use(jwtMiddleware);

app.use('/api/attachment', attachentRouters);
app.use('/api/location', locationRouters);
app.use('/api/event', eventRouters);

app.all('*',async (req,res)=>{
    fs.createReadStream(path.join(__dirname, 'static','index.html')).pipe(res);
})

app.use((err, req, res, next) => {

    res.status(400);
    res.json({ error: err.message })
})
app.listen(port, () => {
    console.log('listing on 3000')
})
