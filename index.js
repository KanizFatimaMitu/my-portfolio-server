const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
const cors = require("cors");
const port = process.env.PORT || 5000;

// kanizfatima528
// tmiuicp1Yqdkvdhm

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://kanizfatima528:tmiuicp1Yqdkvdhm@cluster0.agqujne.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const dataCollection = client.db("portfolio").collection("project")
    const textCollection = client.db("portfolio").collection("text")
    const feedbackCollection = client.db("portfolio").collection("feedbackCollection")

    // http://localhost:5000/projects
    app.get('/projects', async (req, res) => {
      const query = {};
      const cursor = dataCollection.find(query);
      const projects = await cursor.toArray();
      res.send(projects);
    })

    // http://localhost:5000/text
    app.post('/text', async (req, res) => {
      const newText = req.body;
      console.log(newText)
      const addText = await textCollection.insertOne(newText)
      res.send(addText)
    })
    // http://localhost:5000/feedback
    app.post('/feedback', async (req, res) => {
      const newFeedback = req.body;
      console.log(newFeedback)
      const addFeedback = await feedbackCollection.insertOne(newFeedback)
      res.send(addFeedback)
    })
    // http://localhost:5000/feedback
    app.get('/feedback', async (req, res) => {
      const query = {};
      const cursor = feedbackCollection.find(query);
      const feedback = await cursor.toArray();
      res.send(feedback);
    })

  }
  finally {

    // await client.close();

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('my portfolio official server')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})