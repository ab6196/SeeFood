'use strict';

var express = require('express');
var fs = require('fs');
var util = require('util');
var mime = require('mime');
var multer = require('multer');
// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
// var upload = multer({dest: 'uploads/'});

// const {Storage} = require('@google-cloud/storage');
var bodyParser = require('body-parser');
// var config = {
//     projectId: 'my-expense-keeper',
//     keyFilename: './keyFile.json'
//   };
 
//   let vision = require('@google-cloud/vision')({
//     projectId: 'my-expense-keeper',
//     keyFilename: './keyFile.json'
//   });


  // Creates a client
var app = express();
var cors = require('cors');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {

    cb(null, "new.jpg");
  }
});

const upload = multer({ storage });
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename : './keyFile.json'
})

// Database Atlas
const mongoDBURI = 'mongodb+srv://admin:admin@cluster0-wwrhi.gcp.mongodb.net/test?retryWrites=true&w=majority';
// mongoose.connect(mongoDBURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// mongoose.connection
//   .once('open', () => console.log("Connection to MongoDB Successful"))
//   .on('error', (err) => {
//     console.log('Error Occurred:', err);
//   });


// Using MongoClient

// MongoClient.connect(mongoDBURI, (err, db)=> {
//   if (err) throw err;
//   var dbo = db.db("recipes");
//   dbo.collection("RAW_recipes").find({ "name": { $in: [/dosa/] } }).limit(1).toArray(function (err, result) {
//     if (err) throw err;
//     console.log(result);
//     recipeResult = result;
//     db.close();
//   });
// });





// const projectId = 'ethereal-icon-259321';
// const keyFilename = './keyFile.json';
// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage({projectId, keyFilename});
// storage
//   .getBuckets()
//   .then((results) => {
//     const buckets = results[0];

//     console.log('Buckets:');
//     buckets.forEach((bucket) => {
//       console.log(bucket.name);
//     });
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
//   });
// try {
//     const [buckets] =  storage.getBuckets();
  
//     console.log('Buckets:');
//     buckets.forEach(bucket => {
//       console.log(bucket.name);
//     });
//   } catch (err) {
//     console.error('ERROR:', err);
//   }
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharinggg
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data

app.use(bodyParser.json());

// Simple upload form
var form = '<!DOCTYPE HTML><html><body>' +
  "<form method='post' action='/upload' enctype='multipart/form-data'>" +
  "<input type='file' name='image'/>" +
  "<input type='submit' /></form>" +
  '</body></html>';

app.get('/', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(form);
});


app.get('./uploadImage', function(req, res, next) {
    
})
let detectedResult = {};
app.post('/recognizeImage',async function(req,res){
  let result = {};
  await client.webDetection('./uploads/new.jpg')
  .then(async results => {
    console.log(results[0]);
      const labels = results[0].labelAnnotations;
      //Test
      // const foodOrNot = results[0].labelAnnotations;
      // console.log("Labels:",results[0].labelAnnotations);
      console.log("Best Labels:",results[0].webDetection.bestGuessLabels);
      console.log("BGL", results[0].webDetection.webEntities[0].description);
      // console.log(foodOrNot);
      labels.forEach(label=> console.log(label.description));
      result = results[0].webDetection.bestGuessLabels[0];
      
      
    res.writeHead(200,{
      'Content-Type' : 'text/plain'
  })
  console.log(results[0].webDetection.bestGuessLabels);
  detectedResult = results[0].webDetection.bestGuessLabels[0].label;

  // res.end(results[0].webDetection.bestGuessLabels[0].label);
    if ((results[0].webDetection.webEntities[0].description).includes("cuisine") || (results[0].webDetection.webEntities[0].description).includes("restaurant")){
      res.end(results[0].webDetection.webEntities[1].description);
    }
    else{
      res.end(results[0].webDetection.webEntities[0].description);
    }
  })
  .catch(err => {
      // console.log("ERROR", err);
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
    })
    res.end("Error");
  }) 
});
// app.get('/getRestaurants', async function(req, res){
//   let request = req.params;
//   axios.get()
// });


app.get('/getRecipe', async function(req,res){
  MongoClient.connect(mongoDBURI, (err, db) => {
    if (err){
      res.writeHead(400, {
        'Content-Type' : 'text/plain'
      })
      res.end("Error");
    }
    var dbo = db.db("recipes");
    let decodeDish = decodeURIComponent(req.query['dish']);
    console.log(decodeDish);
    let dishComponents = decodeDish.split(" ");
    console.log(dishComponents);
    let toQuery = [];
    toQuery.push(RegExp(decodeDish));
    dishComponents.forEach(elem => {
      toQuery.push(RegExp(elem));
    });
    console.log(toQuery);
    // let dish = RegExp(req.params.dish, 'i');
    let dish = RegExp(decodeDish, 'i');
    dbo.collection("RAW_recipes").find({ "name": { $in: [dish] } }).limit(1).toArray(function (err, result) {
      if (err){
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Error");
      }
      console.log(result);
      // res.writeHead(200, {
      //   'Content-Type': 'text/plain'
      // })
      // res.end(result);
      db.close();
      res.json(result);
      
    });
  });
});

// Get the uploaded image
// Image is uploaded to req.file.path
// Turn image into Base64 so we can display it easily

function base64Image(src) {
  var data = fs.readFileSync(src).toString('base64');
  return util.format('data:%s;base64,%s', mime.lookup(src), data);
}
app.post('/upload_file', upload.any(), (req, res) => {
  res.send();
});
app.listen(3001);
console.log("Server Listening on port 3001");

// 325c24f9017a3f8559d862d2a75105c0