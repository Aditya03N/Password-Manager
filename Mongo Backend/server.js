const express = require('express');
const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const bodyparser=require("body-parser")
const cors=require('cors')

// Database Name
const dbName = 'PassOp';
const app = express()
require('dotenv').config()
const port = 3000
app.use(cors())
app.use(bodyparser.json())
// Get All the  Password
app.get('/', async(req, res) => {
   await client.connect();
     const db = client.db(dbName);
  const collection = db.collection('PassOp');
  const findResult = await collection.find({}).toArray();

  res.send(findResult)
})

// ?save a password
app.get('/', async(req, res) => {
   await client.connect();
     const db = client.db(dbName);
  const collection = db.collection('PassOp');
  const findResult = await collection.find({}).toArray();

  res.send(req.body)
})

app.post('/', async(req, res) => {
  password=req.body
   await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('PassOp');
  const findResult = await collection.insertOne(password);

  res.send({ success: true, result: { ...password, _id: findResult.insertedId } })
  console.log(req.body)})

app.delete('/', async(req, res) => {
  const password=req.body
   await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('PassOp');
  const findResult = await collection.deleteOne(password);

  res.send({sucess:true,result:findResult})
  
})

app.listen(port, () => {
  console.log(`Example app listening on port http//:localhost:${port}`)
})