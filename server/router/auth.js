const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middleware/authenticate");
const ObjectId = require("mongodb").ObjectID;
require("../db/conn");

const User = require("../model/userSchema");

const Transporter = require("../model/transporterSchema");

const Truck = require("../model/truckSchema");

const Booking = require("../model/bookingSchema");

const History = require("../model/HistorySchema");
const { update } = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello from router");
});

// using promises
// router.post("/register",async(req,res)=>{
//   // console.log({message : req.body});
//   const{name, email, phone, work, password, cpassword}= req.body;

//   if(!name|| !email|| !phone|| !work||!password|| !cpassword){
//     return res.status(422).json({error : "Plz filled the field properly"});
//   }
//   User.findOne({email : email})
//     .then((userExits)=>{
//       if(userExits){
//         return res.status(422).json({erro:" User Exists"});
//       }
//       const user = new User({name,email,phone,work,password,cpassword});
//       user.save().then(()=>{
//         res.status(201).json({message:"user registerd successfully"});
//       }).catch((err)=>res.status(500).json({error : "Failed"}))
//     }).catch(err =>{console.log(err);});
// });

//register route
router.route("/register").post(async (req, res) => {
  const { name, email, phone, work, password, cpassword, dob } = req.body;
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.phone);
  console.log(req.body.work);
  console.log(req.body.password);
  console.log(req.body.cpassword);
  console.log(req.body.dob);
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill the field properly" });
  } else {
    try {
      const userExits = await User.findOne({ email: email });
      if (userExits) {
        console.log("User Exits");
        return res.status(422).json({ err: " User Exists" });
      } else if (password != cpassword) {
        console.log("Error password not matching");
        return res.status(422).json({ err: " password not matching" });
      } else {
        const user = new User({
          name,
          email,
          phone,
          work,
          password,
          cpassword,
          dob,
        });
        const userRegister = await user.save();
        console.log("${user} user Register success");
        console.log(userRegister);
        res.status(201).json({ message: "user registerd successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

router.route("/addTruck").post(async (req, res) => {
  const {
    name,
    number,
    pickupcity,
    dropcity,
    company,
    capacitty,
    transemail,
    price,
  } = req.body;
  console.log(req.body.name);
  console.log(req.body.number);
  console.log(req.body.pickupcity);
  console.log(req.body.dropcity);
  console.log(req.body.company);
  console.log(req.body.company);
  console.log(req.body.transemail);
  const status = "true";
  if (!name || !number || !pickupcity || !dropcity || !company || !transemail) {
    return res.status(422).json({ error: "Plz fill the field properly" });
  }
  try {
    const truckExits = await Truck.findOne({ number: number });
    if (truckExits) {
      console.log("truck Exits");
      return res.status(422).json({ err: " truck Exists" });
    } else {
      const truck = new Truck({
        name,
        number,
        pickupcity,
        dropcity,
        company,
        capacitty,
        status,
        transemail,
        price,
      });
      const truckRegister = await truck.save();
      console.log("admin Register success");
      console.log(truckRegister);
      res.status(201).json({ message: "Truck registerd successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.route("/transporter/update/:id").post(async (req, res) => {
  const { id } = req.params.id;
  const { name, number, pickupcity, dropcity, capacitty, price } = req.body;
  if (!name || !pickupcity || !dropcity || !capacitty || !price) {
    return res.status(422).json({ error: "Plz fill the field properly" });
  }
  try {
    const r = await Truck.updateOne(
      { number: number },
      { $set: { name, pickupcity, dropcity, capacitty, price } }
    );
    console.log(r);
    res.json({ message: "Truck updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: "Plz fill the field properly" });
  }
});

router.route("/transporter/deleteTruck/:id").post(async (req, res) => {
  const id = req.body.id;
  try {
    const r = await Truck.findOneAndDelete({ number: id });
    console.log(r);
    res.json({ message: "Truck Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: "Problem in deletion" });
  }
});

router.route("/count").get(async (req, res) => {
  const countTruck = await Truck.countDocuments();
  const countTransporter = await Transporter.countDocuments();
  const countCustomer = await User.countDocuments();
  res.json({ countTruck, countTransporter, countCustomer });
});

router.route("/trucklist").post(async (req, res) => {
  const { transemail } = req.body;
  console.log(req.body.transemail);
  if (!transemail) {
    return res.status(422).json({ error: "Pls fill the field properly" });
  }
  try {
    const truckList = await Truck.find({ transemail: transemail });
    console.log(truckList);
    res.json(truckList);
  } catch (err) {
    console.log(err);
  }
});

router.route("/truck").post(async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    const truckList = await Truck.findById({ _id: id });
    console.log(truckList);
    res.json(truckList);
  } catch (err) {
    console.log(err);
  }
});
router.route("/truck/:number").post(async (req, res) => {
  const number = req.body.number;
  console.log(number);
  try {
    const truckList = await Truck.findOne({ number: number });
    console.log(truckList);
    res.json(truckList);
  } catch (err) {
    console.log(err);
  }
});

router.route("/userTruckList").post(async (req, res) => {
  const { pickupcity, dropcity, capacitty } = req.body;
  console.log(req.body.pickupcity);
  console.log(req.body.dropcity);
  try {
    const truckList = await Truck.find({
      pickupcity: pickupcity,
      dropcity: dropcity,
      capacitty: { $gt: capacitty },
    });
    if (truckList.length <= 0) res.json({ err: "No Truck Found" });
    else {
      console.log(truckList);
      // console.log(truckList[0].company);
      res.json(truckList);
    }
  } catch (err) {
    console.log(err);
  }
});

router.route("/registerTransporter").post(async (req, res) => {
  const { name, email, phone, company, address, password, cpassword } =
    req.body;
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.phone);
  console.log(req.body.company);
  console.log(req.body.password);
  console.log(req.body.cpassword);
  if (!name || !email || !phone || !company || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill the field properly" });
  }
  try {
    const transporterExits = await Transporter.findOne({
      email: email,
      company: company,
    });
    if (transporterExits) {
      console.log("Admin Exits");
      return res.status(422).json({ err: " Transporter already exists" });
    } else if (password != cpassword) {
      console.log("Error password not matching");
      return res.status(422).json({ err: " password not matching" });
    } else {
      const transporter = new Transporter({
        name,
        email,
        phone,
        company,
        address,
        password,
        cpassword,
      });
      const transRegister = await transporter.save();
      console.log(transporter + "transporter Register success");
      console.log(transRegister);
      res.status(201).json({ message: "Transporter registerd successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route
router.post("/signin", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Plz fill the field properly" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        return res.status(400).json({ error: "invalid pass or email" });
      } else {
        return res.status(200).json({ message: "Login Success", token: token });
      }
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
  res.json({ token });
});

router.post("/Transsignin", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Plz fill the field properly" });
    } else {
      const transLogin = await Transporter.findOne({ email: email });
      if (transLogin) {
        const isMatch = await bcrypt.compare(password, transLogin.password);
        token = await transLogin.generateTransporterAuthToken();
        console.log(token);

        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        if (!isMatch) {
          return res.status(400).json({ error: "invalid pass or email" });
        } else {
          return res
            .status(200)
            .json({ message: "Login Success", token: token });
        }
      } else {
        return res.status(400).json({ error: "Invalid credentials" });
      }
    }
  } catch (err) {
    console.log(err);
  }
  res.json({ token });
});

//booking
router.route("/booking").post(async (req, res) => {
  try {
    const {
      user,
      pickupcity,
      dropcity,
      date,
      weight,
      adminemail,
      truckid,
      typeofgoods,
      price,
      Address1,
      Address2,
    } = req.body;
    const status = false;
    const bookingId = Booking.countDocuments() + 1;
    const transconfirm = false;
    const book = new Booking({
      bookingId,
      user,
      pickupcity,
      dropcity,
      date,
      weight,
      transemail: adminemail,
      truckid,
      typeofgoods,
      price,
      Address1,
      Address2,
      transconfirm,
      status,
    });
    const bookReq = book.save();
    console.log(bookReq);
    res.status(201).json({ message: "Booking data saved successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.route("/bookingRequests").post(async (req, res) => {
  try {
    const transemail = req.body.transemail;
    const result = await Booking.find({
      transemail: transemail,
      transconfirm: false,
    });
    if (result.length <= 0) {
      res.json({ err: "No Booking Request" });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
  }
});
router.route("/transConfirm").post(async (req, res) => {
  try {
    const {
      user,
      pickupcity,
      dropcity,
      date,
      weight,
      transemail,
      truckNo,
      typeofgoods,
      price,
      transconfirm,
      status,
    } = req.body;
    console.log(req.body.date);
    const r = await Booking.findOneAndUpdate(
      {
        user,
        pickupcity,
        dropcity,
        date,
        weight,
        transemail,
        truckid: truckNo,
        typeofgoods,
        price,
      },
      { $set: { transconfirm: transconfirm, status: status } }
    );

    // await Booking.deleteMany({user, pickupcity,dropcity,date,weight,transemail,truckid:truckNo,typeofgoods,price}).then(res => {console.log(res)});
    // const r = Truck.findOneAndUpdate({number:truckNo},{$set:{status:false}},{new:true});
    const history = new History({
      user,
      pickupcity,
      dropcity,
      date,
      weight,
      transemail,
      truckNo,
      typeofgoods,
      price,
      status,
      transconfirm: transconfirm,
    });
    const historyCon = await history.save().then((res) => {
      console.log(res);
    });
    console.log(historyCon);
    if (transconfirm === true)
      res.status(200).json({ message: "Booking confirmed successfully" });
    else res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.log(err);
  }
});
router.route("/trans/history").post(async (req, res) => {
  if (req.body.role == "customer") {
    try {
      const user = req.body.user;
      const result = await Booking.find({ user: user });
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const transemail = req.body.transemail;
      const result = await Booking.find({ transemail: transemail });
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
});

// router.route('/trans/delivery').post(async(req,res)=>{
//   const{{_id},truckNo}= req.body;
//   const r = History.findByIdAndUpdate({_id:Object(_id)},{$set:{status:true}})
//   console.log(r);
//   const s = Truck.findOneAndUpdate({number:truckNo},{$set:{status:true}})
//   res.json({message:"Delivery confirmed successfully"});
// })

router.route("/trucks").get(async (req, res) => {
  try {
    var truckList = await Truck.find();
    res.status(200).json(truckList);
  } catch (err) {
    console.log(err);
  }
});

router.route("/transporterList").get(async (req, res) => {
  try {
    var transporters = await Truck.find();
    console.log(transporters);
    res.status(200).json(transporters);
  } catch (err) {
    console.log(err);
  }
});

router.route("/logout").get((req, res) => {
  res.clearCookie("jwt");
  res.status(200).send({ message: "User logout" });
  console.log("Success");
});

//about page
router.route("/about").get(Authenticate, (req, res) => {
  res.send("Hello about World");
  console.log(req.rootUser);
  res.send(req.rootUser);
});

module.exports = router;
