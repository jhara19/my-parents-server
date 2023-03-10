const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const categories = require('catigories.json');
// const courses = require('products.json');


app.get('/', async (req,res) => {
    res.send('Our Resale-shop');

});

// user: safa-collection
// pass: wlF3z9yo7VUwICXx


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kcsknjp.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{

  const categoriesCollection = client.db('safa-collection').collection('categories');
  const productsCollections = client.db('safa-collection').collection('products');
  const bookingsCollections = client.db('safa-collection').collection('bookings')

  app.get('/categories', async (req, res) => {
      const query = {};
      const categories = await categoriesCollection.find(query).toArray();
      res.send(categories);
  });

  //Categories get with id
  app.get('/categories/:id', async (req, res) => {
    const id = req.params.id;
    const query = {category_id: id};
    const result = await productsCollections.find(query).toArray();
    res.send(result);
  });

   //products get with id
   app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const query = {category_id: id};
    const result = await productsCollections.find(query).toArray();
    res.send(result);
  });

app.get('/bookings', async (req, res) => {
  const email = req.query.email;
  const query = {
    email: email
  };
  const bookings = await bookingsCollections.find(query).toArray();
  res.send(bookings);

})



  //POST BOOKINGS
  app.post('/bookings', async (req, res) => {
     const booking = req.body;
     console.log(booking);
     const result = await bookingsCollections.insertOne(booking);
     res.send(result);
  }) 
}
  finally{

  }
}
run().catch(err => console.log(err));












// async function run() {
//     try{
        

//         // Show category 
//         app.get('/categories', async(req,res) =>{
//           const query = {};
//           const cursor = categoryCollection.find(query);
//           const category = await cursor.toArray();
//           res.send(category)
//         });


//     }
    
//     finally{

//     }

// }
// run().catch((e) => console.log(e));







app.listen(port, () => {
  console.log(`resale-shop server is running on port',${port}`)
})
































// const express = require("express");
// const app = express();
// const cors = require("cors");
// const {
//   MongoClient,
//   ServerApiVersion,
//   ObjectId,
//   ObjectID,
// } = require("mongodb");
// const port = process.env.PORT || 5000;

// require("dotenv").config();

// app.use(cors());
// app.use(express.json());

// const categories = require("./data/categories.json");
// const products = require("./data/products.json");


// // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ct9it9z.mongodb.net/?retryWrites=true&w=majority`;
// // const client = new MongoClient(uri, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   serverApi: ServerApiVersion.v1,
// // });

// async function run() {
//   try {
//     const categoryCollection = client.db("resalePort").collection("categories");
//     const productCollection = client.db("resalePort").collection("products");
//     const userCollection = client.db("resalePort").collection("users");
//     const orderCollection = client.db("resalePort").collection("orders");
//     const wishlistCollection = client.db("resalePort").collection("wishList");

//     const advertisedCollection = client
//       .db("resalePort")
//       .collection("advertised");

//     app.get("/categories", async (req, res) => {
//       const query = {};
//       const categories = await categoryCollection.find(query).toArray();
//       res.send(categories);
//     });

//     app.get("/singleCategory", async (req, res) => {
//       const category = req.query.category;
//       const query = { category_name: category };
//       const result = await categoryCollection.findOne(query);
//       res.send(result);
//     });

//     app.get("/category/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = {
//         sub_category: id,
//       };
//       const product = await productCollection.find(query).toArray();
//       res.send(product);
//     });

//     app.get("/user", async (req, res) => {
//       const email = req.query.email;

//       const query = { email: email };
//       result = await userCollection.findOne(query);

//       res.send(result);
//     });

//     app.get("/statusdUser", async (req, res) => {
//       const status = req.query.status;
//       const query = { status: status };

//       const result = await userCollection.find(query).toArray();
//       console.log(result);
//       res.send(result);
//     });

//     app.get("/myProducts", async (req, res) => {
//       const email = req.query.email;
//       const query = { email: email };
//       const products = await productCollection.find(query).toArray();
//       res.send(products);
//     });

//     app.put("/myProducts/:id", async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: ObjectId(id) };
//       const option = { upsert: true };
//       const updatedStatus = {
//         $set: {
//           advertised: true,
//         },
//       };
//       const result = await productCollection.updateOne(
//         filter,
//         updatedStatus,
//         option
//       );
//       console.log(result);
//       res.send(result);
//     });

//     //advertisedProducts
//     app.get("/advertisedProducts", async (req, res) => {
//       let range = req.query.range;
//       range = parseInt(range);
//       const query = {};
//       const products = await advertisedCollection
//         .find(query)
//         .limit(range)
//         .toArray();
//       res.send(products);
//     });

//     app.get("/order", async (req, res) => {
//       const email = req.query.email;
//       const query = { email: email };
//       const orders = await orderCollection.find(query).toArray();
//       res.send(orders);
//     });

//     app.get("/wishList", async (req, res) => {
//       const email = req.query.email;
//       const query = { buyer_email: email };
//       const wishList = await wishlistCollection.find(query).toArray();
//       res.send(wishList);
//     });

//     app.get("/buyers/myBuyer", async (req, res) => {
//       const email = req.query.email;
//       const query = { seller_email: email };
//       const orders = await orderCollection.find(query).toArray();
//       let users = [];

//       orders.forEach((order) => {
//         let matchedFound=false;
//         users.forEach(user=>{
//           if(user === order.email){
//             matchedFound=true;
//           }
//         })
//         if(matchedFound===false) users.push(order.email);
//       });
//       // uses is the list of unique my ordered users.
//       // now, find their info from userCollection

//       const loginUsers = await userCollection.find({}).toArray();
      
//       const myUsers = loginUsers.filter(loginUser => users.includes(loginUser.email));
//       console.log(myUsers);

//       res.send(myUsers);
//     });

//     app.post("/advertisedProducts", async (req, res) => {
//       const advertisedItem = req.body;
//       const query = {
//         image_url: advertisedItem.image_url,
//       };
//       const isFound = await advertisedCollection.findOne(query);
//       if (isFound) {
//         res.send({ message: "alreadyAdded" });
//       } else {
//         const result = await advertisedCollection.insertOne(advertisedItem);
//         res.send(result);
//       }
//     });

//     app.post("/product", async (req, res) => {
//       const product = req.body;
//       const result = await productCollection.insertOne(product);
//       res.send(result);
//     });

//     app.post("/users", async (req, res) => {
//       const user = req.body;
//       const query = { email: user.email };
//       const alreadyUser = await userCollection.findOne(query);
//       if (alreadyUser?.email === user?.email) {
//         res.send({ message: "already a registered user" });
//       }
//       const result = await userCollection.insertOne(user);
//       res.send(result);
//     });

//     app.post("/order", async (req, res) => {
//       const order = req.body;
//       const query = {
//         image_url: order.image_url,
//         email: order.email,
//       };
//       const isFound = await orderCollection.findOne(query);
//       if (isFound) {
//         res.send({ message: "alreadyAdded" });
//       } else {
//         const result = await orderCollection.insertOne(order);
//         res.send(result);
//       }
//     });

//     app.post("/wishList", async (req, res) => {
//       const wishItem = req.body;
//       const query = {
//         image_url: wishItem.image_url,
//         buyer_email: wishItem.buyer_email,
//       };
//       const isFound = await wishlistCollection.findOne(query);
//       if (isFound) {
//         res.send({ message: "alreadyAdded" });
//       } else {
//         const result = await wishlistCollection.insertOne(wishItem);
//         res.send(result);
//       }
//     });

//     app.delete("/user/:id", async (req, res) => {
//       const id = req.params;
//       const filter = { _id: ObjectId(id) };
//       const result = await userCollection.deleteOne(filter);
//       console.log(result);
//       res.send(result);
//     });

//     app.delete("/order/:id", async (req, res) => {
//       const id = req.params;
//       const filter = { _id: ObjectId(id) };
//       const result = await orderCollection.deleteOne(filter);
//       res.send(result);
//     });

//     app.delete("/wishList/:id", async (req, res) => {
//       const id = req.params;
//       const filter = { _id: ObjectId(id) };
//       const result = await wishlistCollection.deleteOne(filter);
//       res.send(result);
//     });
//   } finally {
//   }
// }
// run().catch((err) => console.log("Error: ", err));

// app.listen(port, () => {
//   console.log(`mongodb db server is running, ${port}`);
// });
