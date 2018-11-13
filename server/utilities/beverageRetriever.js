const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const beverageSchema = require('../models/beverageModel');
const vinmonopolet = require('vinmonopolet');


// Connection URL
const url = 'mongodb://it2810-15.idi.ntnu.no:27017/';


// Use connect method to connect to the Server

  function unsafeWriteAllToDB(){
      MongoClient.connect(url, function(err, client) {

              assert.equal(null, err);
              let db = client.db("vinmonopolet");
              let i = 0;

              setInterval(() => {
                  console.log("Inserted " + i.toString() + " items until now.")
              }, 1000);

              vinmonopolet
                  .stream.getProducts()
                  .on('data', function(product) {
                      if(1 === 1) {
                          i ++;
                          db.collection("sortiment").insertOne(product, function(err, res) {
                              if (err) throw err;
                          });
                      }
                  })
                  .on('end', function() {
                      console.log("Insterted " + i.toString() + " items.");
                      client.close();
                  });
          }
      )
  }
//  unsafeWriteAllToDB();


class beverageRetriever{
    constructor(){
        mongoose.plugin(mongoosePaginate);
        let connection = mongoose.createConnection(url + 'vinmonopolet');
        this.Beverage = connection.model('Beverage', beverageSchema, 'sortiment');

        mongoosePaginate.paginate.options = {
            lean:  true,
            limit: 20
        };

    }

    getAllFromDB(callback){
        this.Beverage.find( {} ,
        function (err, beverages) {
            callback(beverages)
        });
    }

    getFromQuery(callback, query){
        this.Beverage.find( query , {} , { limit: 20 } ,
            function (err, bev) {
                callback(bev);
            });
    }
}
// Available sorting modes: `price`, `name`, `relevance`
module.exports.beverageRetriever = beverageRetriever;
