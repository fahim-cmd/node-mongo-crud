const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId


const password =  'L2Z8zwavz.3u$5!';

const uri = "mongodb+srv://myMangoUser:L2Z8zwavz.3u$5!@cluster0.omrot.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); //dirname mean = directory name
})


client.connect(err => {
  const collection = client.db("organicdb").collection("product");
  
  app.get("/products", (req, res) => {
    collection.find({}).limit(4)     //sobgula documents amk deo
    .toArray((err, documents) => {
      res.send(documents)
    })   //array te convert kore pathay dibo

  })

  app.get("/upProduct/:id", (req, res) => {
    collection.find({_id: ObjectId(req.params.id)})
    .toArray((err, documents) => {
        res.send(documents[0])
    })
  })

  app.post("/addProduct", (req, res) => {
    const product = req.body;
    collection.insertOne(product)
    .then(result => {
      console.log('data added successfully')
      res.send('success')
    })
  })

  app.delete('/delete/:id', (req, res) => {
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result => {
      console.log(result)
    })
  })
  
});

app.listen(3000)