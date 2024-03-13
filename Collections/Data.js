const mongoose = require('mongoose');

const atlasUri = 'mongodb+srv://itunit:ITunit@cluster0.q9ejcln.mongodb.net/pcup';

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB Atlas (inventory)");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB Atlas:", e);
  });

const mySchema = new mongoose.Schema({
  RecFrom: {
    type: String,
  },
  Department: {
    type: String,
  },
  InvenTag: {
    type: String,
  },
  Desc: {
    type: String,
  },
  Quantity: {
    type: Number,
  },
  Unit: {
    type: String,
  },
  Amount: {
    type: String,
  },
  EndUser: {
    type: String,
  },
  Date: {
    type: String,
  },
});

const Menu = mongoose.model('IT', mySchema);

module.exports = Menu;