const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const port = 8080;
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');

const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js');

app.use(express.static(path.join(__dirname,'/public')))
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended : true} ));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);

// Connecting the database
main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err)
  })
async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


// Root Route 
app.get('/', (req,res) => {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'));
  // res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.send("Server is Working");
})
app.get('/', (req, res) => {
  // Logic to fetch data from your database or any other source
  const serverMessage = "Data from the server";

  res.json({ serverMessage });
});

app.use('/listings', listings);
app.use('/listings/:id/reviews', reviews)

app.all('*', (req,res,next) => {
  next(new ExpressError(404, "Page Not Found!"));
})

app.use((err,req,res,next) => {
  let { status = 500, message = "Something Went Wrong!" } = err;
  res.status(status).render('error.ejs', { message });
  // res.status(status).send(message);
})

app.listen(port, (req,res) => {
  console.log(`Server is running on port ${port}`);
});