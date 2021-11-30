(function(){
  const express = require("express");
  const bodyParser = require("body-parser");
  // const moongoose = require("mongoose");

  const app = express();

  let titles = [];
  let contents = [];

  let currTitle = "";
  let currContent = "";

  // mongoose.connect("url/dbName", {useUrlParser: true});

  // const fruitSchema = new mongoose.Schema ({
  //   name: {
  //     type: String,
  //     required: [true, "Please check your data entry, no name specified"];
  //   },
  //   rating: {
  //     type: Number,
  //     min: 1,
  //     max: 10
  //   },
  //   price: Number
  // });

  // const personSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: [true, "it is required please"]
  //   },
  //   age: Number,
  //   favouriteFruit: fruitShema
  // });

  // const Fruit = mongoose.model("Fruit", fruitSchema);
  // const Person = mongoose.model("Fruit", fruitSchema);

  // const kiwi = new Fruit({
  //   name: "kiwi",
  //   number: 5,
  //   price: 0.80
  // });

  // const john = new Person({
  //   name: "john",
  //   age: 34,
  //   favouriteFruit: kiwi
  // });

  // const apple = new Apple({
  //   name: "Damilola",
  //   number: 8,
  //   price: 1.00
  // });

  // const pineapple = new Apple({
  //   name: "pineapple",
  //   number: 6,
  //   price: 0.80
  // });

  // Fruit.insertMany([kiwi, apple, fruit], (err) => {
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log("successfully saved all the fruits to FruitsDB");
  //   }
  // });

  // Fruit.find((err, fruits) => {
  //   if(err){
  //     console.log(err);
  //   }else{
  //     mongoose.connection.close();

  //     fruits.forEach((item) => {
  //       console.log(item.name);
  //     });
  //   }
  // });

  // Fruits.updateOne({_id: 1}, {name: "peach"}, (err) => {
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log("Successfully updated the document.");
  //   }
  // });

  // Fruits.deleteOne({name: "kiwi"}, (err) => {
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log("Successfully deleted document");
  //   }
  // });

  app.set('view engine', 'ejs');

  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({extended: true}));

  app.get("/", (req, res) => {
    res.render("home", {blogTitles: titles, blogContents: contents});
  });

  app.get("/compose", (req, res) => {
    res.render("compose", {});
  });

  app.post("/", (req, res) => {
    let newBlogTitle = req.body.blogTitle;
    let newBlogContent = req.body.blogContent;

    titles.push(newBlogTitle);
    contents.push(newBlogContent);

    if(newBlogContent.length > 100){
      let encodedBlogTitleStr = encodeURI(newBlogTitle);
      app.get("/" + encodedBlogTitleStr, (req, res) => {
        currTitle = newBlogTitle;
        currContent = newBlogContent;

        res.render("display", {title: currTitle, content: currContent});
      });
    }

    res.redirect("/");
  });

  app.get("/about", (req, res) => {
    res.render("about", {});
  });

  app.get("/contact", (req, res) => {
    res.render("contact", {});
  });

  app.listen(3000, () => {
    console.log("Server running at port 3000");
  });

}());
