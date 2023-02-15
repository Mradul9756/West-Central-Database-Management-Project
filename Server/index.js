// intializing packages 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors"); // to access back-end api

// establish mysql connection
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Sanjay9756#@",
    database: "WestCentral"
})

// intializing middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// why using nodemon ?
// using nodemon as server to automatically restart the server after any changes

// create api to get all the data from the database to display in front-end in table component
app.get("/api/get", (req,res) =>{
    const sqlGet = "SELECT * FROM fake_contact_list";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

// columns to delete - boone_st_bash, WCDP, HEART, Youth, Racial_Justice, Neighbor_Day_BA
// to add - Events_Attended, isDonor, Areas_of_Interest

// to perform add operation, fetch from the front-end using post
app.post("/api/post", (req, res)=>{
    // query to generate new id everytime user wants to add a new record
    const addId = "Select max(Id)+1 as maxId from fake_contact_list"
    let newId = 0

        db.query(addId, (error, result) => {
        newId = result[0].maxId
        console.log(newId)
        const { Fname,Lname,Org,Position,Phone,Other_phone,Email,WC_Resident,Notes,Allow_photos,Want_info,Fallows_conversation,
            Durrett_mtg,Hobbies,Skill_to_share,Address,Events_Attended, isDonor, Areas_of_Interest} = req.body;
        const sqlInsert = "INSERT INTO fake_contact_list (Id, fname,lname,org,position,phone,Other_phone,email,WC_resident,notes,Allow_photos,Want_info,Fallows_conversation,durrett_mtg,hobbies,skill_to_Share,address,Events_Attended, isDonor, Areas_of_Interest) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        db.query(sqlInsert,[newId, Fname,Lname,Org,Position,Phone,Other_phone,Email,WC_Resident,Notes,Allow_photos,Want_info,Fallows_conversation,
            Durrett_mtg,Hobbies,Skill_to_share,Address,Events_Attended, isDonor, Areas_of_Interest], (error, result) => {
                if (error){
                    console.log(error);
                }
            } )
    })
})

// perform delete operation (delete specific records using id)
app.delete("/api/remove/:Id", (req, res)=>{
    const { Id } =req.params;
    const sqlRemove = "DELETE FROM fake_contact_list WHERE Id = ?";
    db.query(sqlRemove,Id, (error, result) => {
            if (error){
                console.log(error);
            }
        });
    });
// get the record with a First name (for edit operation)
app.get("/api/get/:Id", (req,res) =>{
    const{ Id } = req.params;
    const sqlGet = "SELECT * FROM fake_contact_list WHERE Id = ?";
    db.query(sqlGet, Id, (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

// perform edit operation on a selected record
app.put("/api/update/:Id", (req,res) =>{
    const{ Id } = req.params;
    const {Fname,Lname,Org,Position,Phone,Other_phone,Email,WC_Resident,Notes,Allow_photos,Want_info,Fallows_conversation,
        Durrett_mtg,Hobbies,Skill_to_share,Address,Events_Attended, isDonor, Areas_of_Interest } = req.body;
    
    const sqlUpdate = "UPDATE fake_contact_list SET Fname=?,Lname=?,org=?,position=?,phone=?,Other_phone=?,email=?,WC_resident=?,notes=?,Allow_photos=?,Want_info=?,Fallows_conversation=?,durrett_mtg=?,hobbies=?,skill_to_Share=?,address=?,Events_Attended=?, isDonor=?, Areas_of_Interest=?  WHERE Id = ?";
    db.query(sqlUpdate, [Fname,Lname,Org,Position,Phone,Other_phone,Email,WC_Resident,Notes,Allow_photos,Want_info,Fallows_conversation,
        Durrett_mtg,Hobbies,Skill_to_share,Address,Events_Attended, isDonor, Areas_of_Interest,Id], (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

// create the route to the server
app.get("/", (req, res) => {
    /////////////// test sql connection by update query ///////////////
    // const sqlupdate = 
    //     "update WC_contact_list set Name ='Sam Abbott' where ID = 1";
    // db.query(sqlupdate, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // });
});

app.post('/api/login', async (req, res) => {
   
    sqlVerify = "select pin from cred where id=1"
    db.query(sqlVerify,(err, result) =>{
        console.log(result[0].pin, req.body.pin)

        if(result[0].pin == req.body.pin){
            return res.status(200).send({status:"true"})
        }
        else {
         return res.status(401).send({status: "false"})
        }
    })
    
});

app.post("/sort", (req, res) => {
    const sortBy = req.body.sortField; //get user input
    let sqlGet = "";
    if (sortBy === "Events_Attended") {
      //return a sorted list of the people who attended the most events
      sqlGet =
        "SELECT *, LENGTH(Events_attended) - LENGTH(REPLACE(Events_attended, ',', '')) + 1 AS events_attended_count FROM fake_contact_list ORDER BY events_attended_count DESC";
    } else {
      sqlGet = `SELECT * FROM fake_contact_list ORDER BY ${sortBy}`; //sort by user input
    }
    db.query(sqlGet, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Error in sorting the data" });
      }
      res.send(result); //send results
    });
  });
  


// define port: 3001
// define port: 5000
app.listen(5000, () => {
    console.log("Server is running on port 5000");
})