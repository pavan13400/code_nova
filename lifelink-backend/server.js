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
app.post("/patient", async (req,res)=>{

try{

const newPatient = new Patient(req.body);

await newPatient.save();

res.json({message:"Patient saved"});

}catch(err){
res.status(500).json({error:err.message});
}

});

app.listen(5000,()=>{
console.log("Server running on port 5000");
});