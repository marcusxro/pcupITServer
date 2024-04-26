const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Inventory = require('./Collections/Data')
const app = express();
const port = 8080;
const { ObjectId } = require('mongodb');

app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.send("connected")
})

app.post('/sendData', async (req, res) => {
  const {
    RecFrom,
    InvenTag,
    Department,
    Desc,
    Status,
    Quantity,
    Unit,
    Amount,
    EndUser,
    Date
  } = req.body;
  try {
    const reportsCreate = new Inventory({
      RecFrom: RecFrom,
      InvenTag: InvenTag,
      Department: Department,
      Desc: Desc,
      Quantity: Quantity,
      Unit: Unit,
      Amount:Amount,
      EndUser: EndUser,
      Status: Status,
      Date
    });

    await reportsCreate.save();
    res.status(201).json({ message: 'Report created successfully' });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Error creating report' });
  }
});

app.put('/edit/:item', async (req, res) => {
  const itemId = req.params.item
  const {
    RecFrom,
    Department,
    InvenTag,
    Desc,
    Quantity,
    Status,
    Unit,
    Amount,
    EndUser,
    Date

  } = req.body;
  try {
    const result = await Inventory.findByIdAndUpdate(itemId, {
    $set: {
      RecFrom: RecFrom,
      Department: Department,
      InvenTag: InvenTag,
      Desc: Desc,
      Quantity: Quantity,
      Unit: Unit,
      Amount:Amount,
      Status: Status,
      EndUser: EndUser,
      Date
    }
    });
    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Error creating report' });
  }
});

app.get('/GetData', async (req, res) => {
  Inventory.find()
  .then((data) => {
    res.json(data)
  }).catch((err) => {
    console.log(err)
  })
})
app.delete("/item/:id", async (req, res) => {
  const itemId = req.params.id; //delete item from client
  const data = await Inventory;
  const result = await data.deleteOne({ _id: new ObjectId(itemId) }); //finds the particular id to be deleted
  if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send('Invalid ObjectId format'); //if invalid. this is  required
  } if (result.deletedCount === 1) { //success
    res.send("Document deleted successfully");
  } else {
    res.status(404).send("Document not found");
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});