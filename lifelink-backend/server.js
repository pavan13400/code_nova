const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose.connect(
"mongodb+srv://mani200510134_db_user:GxaX_RfSapseE4Q@cluster0.dpkgaef.mongodb.net/Information?retryWrites=true&w=majority"
)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* Schema */
// const ReportSchema = new mongoose.Schema({

// name:String,
// age:String,
// blood:String,
// allergies:[String],
// meds:[String],
// surgeries:[String],
// contacts:[String],

// bp:String,
// pulse:String,
// severity:String,

// hospital:{
// h_name:String,
// vicinity:String
// }

// });
const patientSchema = new mongoose.Schema(
{
    name: String,
    age: Number,
    blood: String,

    allergies: [String],
    meds: [String],
    surgeries: [String],
    contacts: [String],

    bp: String,
    pulse: Number,
    severity: String,

    hospital: {
        h_name: String,
        vicinity: String
    }
},
{
    collection: "Patients"
}
);

const Patient = mongoose.model("Patient", patientSchema);

/* API */
// app.post("/patient", async (req,res)=>{

//         try{

//         const newPatient = new Patient(req.body);

//         // await newPatient.save();

//         // res.json({message:"Patient saved"});

//         newPatient.save()
//         .then(()=>console.log("Patient stored"))
//         .catch(err=>console.log(err));

//         res.json({message:"Report received"});

//         }catch(err){
//         res.status(500).json({error:err.message});
//         }

// });

app.listen(5000,"0.0.0.0",()=>{
console.log("Server running on port 5000");
});

app.get("/", (req,res)=>{
  res.send("Server is working");
});

app.post("/patient", async (req,res)=>{

    console.log("===== REQUEST RECEIVED =====");
    console.log(req.body);

    try{

    const newPatient = new Patient(req.body);

    newPatient.save()
    .then(()=>console.log("Saved to MongoDB"))
    .catch(err=>console.log("Mongo Error:",err));

    res.json({status:"ok"});

    }catch(err){

    console.log("SERVER ERROR:",err);
    res.status(500).json({error:err.message});

    }

});

app.listen(5000,()=>{
console.log("Server running on port 5000");
});