const mongoose = require("mongoose");

try {
    const response =mongoose.connect("mongodb+srv://ZarakKhan:Zarakkhan1234@legalai.fnaibbg.mongodb.net/AppLogin")

if(response){
    console.log("Connection Successfully");
}
} catch (error) {
    console.log(error)
}
