const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();
// app.use(bodyParser.urlencoded({ extended: true }));


const createRouter = function (collection) {

  const router = express.Router();

  //This is the MongoDB
  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

    router.get('/:userId', (req, res) => {
      const userId = req.params.userId;
      collection
      .find({userId: userId})
      .toArray()
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
    });

    router.post('/', (req, res) => {
      const newPosition = req.body; 
      collection.insertOne(newPosition)
      .then((result) => {
      res.json(result.ops[0])
      })
      .catch ((err) => {
        console.error(err);
        res.status(500);
        res.json({status: 500, error: err });
      });  
    })

    router.delete('/:id', (req, res) => {
      const id = req.params.id;
      collection.deleteOne({_id: ObjectID(id)})
      .then(result =>{
        res.json(result)
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({status: 500, error: err});
      });
    });

    router.put('/:id', (req, res) => {
      const id = req.params.id;
      const updatedPositions = req.body;
      collection
      .updateOne({_id: ObjectID(id)},
      {$set: updatedPositions})
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.status(500);
        res.json({status:500, error: err });
      });
    });

 
  
    return router;
  };

  module.exports = createRouter;