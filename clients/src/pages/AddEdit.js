// add and update contact in the same page
import React, {useState, useEffect} from 'react';
import {useParams, Link, Navigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"
import "./AddEdit.css"
import { useNavigate } from 'react-router-dom';

// columns to delete - boone_st_bash, WCDP, HEART, Youth, Racial_Justice, Neighbor_Day_BA
// to add - Events_Attended, isDonor, Areas_of_Interest

const intialState = {
    Id: "",Fname: "",Lname: "",Org: "",Position: "",Phone: "",Other_phone: "",Email: "",WC_Resident: "",
    Notes: "",Allow_Photos: "",Want_Info: "",Fallows_Conversation: "",Durrett_mtg: "",Hobbies: "",Skill_to_share: "",Address: "",
    Events_Attended: "", isDonor: "", Areas_of_Interest: ""
};


const AddEdit = () =>{
    const [state, setState] = useState(intialState);

    const {Fname,Lname,Org,Position,Phone,Other_phone,Email,WC_Resident,Notes,Allow_photos,Want_info,Fallows_conversation,
        Durrett_mtg,Hobbies,Skill_to_share,Address,Events_Attended, isDonor, Areas_of_Interest} = state;
    
    // for timeout setting
    const navigate = useNavigate();
    
    // to get the id from the table (use for record update)
    const {Id} =  useParams();

    // only run when we have the fname (user is updating the existing contact)
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${Id}`)
        .then((resp) => setState({...resp.data[0]}))
    }, [Id]);
   
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Fname){
            alert("please provide value for First Name");
        } else{
            if(!Id){
                axios.post("http://localhost:5000/api/post",{
                    Id, Fname,Lname,Org,Position,Phone,Other_phone,Email,WC_Resident,Notes,Allow_photos,Want_info,Fallows_conversation,
                    Durrett_mtg,Hobbies,Skill_to_share,Address,Events_Attended, isDonor, Areas_of_Interest
                })
                .then(() => {
                    setState({Id: "",Fname: "",Lname: "",Org: "",Position: "",Phone: "",Other_phone: "",Email: "",WC_Resident: "",
                    Notes: "",Allow_Photos: "",Want_Info: "",Fallows_Conversation: "",Durrett_mtg: "",Hobbies: "",Skill_to_share: "",Address: "",
                    Events_Attended: "", isDonor: "", Areas_of_Interest: ""});
                })
                .catch((err) => toast.error(err.response.data));
                alert("Contact Added Successfully")
                navigate("/")
            
            } else{
                axios.
                    put(`http://localhost:5000/api/update/${Id}`,{
                    Id, Fname,Lname,Org,Position,Phone,Other_phone,Email,WC_Resident,Notes,Allow_photos,Want_info,Fallows_conversation,
                    Durrett_mtg,Hobbies,Skill_to_share,Address,Events_Attended, isDonor, Areas_of_Interest
                })
                .then(() => {
                    setState({Id:"",Fname: "",Lname: "",Org: "",Position: "",Phone: "",Other_phone: "",Email: "",WC_Resident: "",
                    Notes: "",Allow_Photos: "",Want_Info: "",Fallows_Conversation: "",Durrett_mtg: "",Boone_St_Bash: "",WCDP: "",
                    Racial_Justice: "",HEART: "",Youth: "",Hobbies: "",Skill_to_share: "",Address: "",Neighbor_Day_BA: ""});
                })
                .catch((err) => toast.error(err.response.data));
                alert("Contact Updated Successfully")
                navigate("/")
            }
    }
    };


    const handleInputChange = (e) => {
        const{ name, value } = e.target;
        setState({ ...state, [name]: value});
    };

    return(
        <div style={{margin: "100px"}}>
            <form style = {{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor='Fname'>First Name</label>
<input
             type="text"
             id="Fname"
             name="Fname"
             placeholder='Matthew'
             value={Fname || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Lname'>Last Name</label>
<input
             type="text"
             id="Lname"
             name="Lname"
             placeholder='Abbott'
             value={Lname || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Org'>Organization Name</label>
<input
             type="text"
             id="Org"
             name="Org"
             placeholder='XYZ Inc'
             value={Org || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Position'>Position</label>
<input
             type="text"
             id="Position"
             name="Position"
             placeholder='Manager'
             value={Position || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Phone'>Phone Number</label>
<input
             type="text"
             id="Phone"
             name="Phone"
             placeholder='123-456-7890'
             value={Phone || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Other_phone'>Other Phone Number</label>
<input
             type="text"
             id="Other_phone"
             name="Other_phone"
             placeholder='098-765-4321'
             value={Other_phone || ""}
             onChange={handleInputChange}
             />
                <label htmlFor='Email'>Email</label>
<input
             type="text"
             id="Email"
             name="Email"
             placeholder='example@Email.com'
             value={Email || ""}
             onChange={handleInputChange}
             />
<label htmlFor='WC_Resident'>WC Resident</label>
<input
             type="text"
             id="WC_Resident"
             name="WC_Resident"
             placeholder='yes or no'
             value={WC_Resident || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Notes'>Notes</label>
<input
             type="text"
             id="Notes"
             name="Notes"
             placeholder='Additional information'
             value={Notes || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Allow_photos'>Allow Photos</label>
<input
             type="text"
             id="Allow_photos"
             name="Allow_photos"
             placeholder='yes or no'
             value={Allow_photos || ""}
             onChange={handleInputChange}
             />
                <label htmlFor='Want_info'>Want Info</label>
                <input
                type="text"
                id="Want_info"
                name="Want_info"
                placeholder='yes or no'
                value={Want_info || ""}
                onChange={handleInputChange}
                />
                <label htmlFor='Fallows_conversation'>Fallows Conversation</label>
<input
             type="text"
             id="Fallows_conversation"
             name="Fallows_conversation"
             placeholder='yes or no'
             value={Fallows_conversation || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Durrett_mtg'>Durrett Mtg</label>
<input
             type="text"
             id="Durrett_mtg"
             name="Durrett_mtg"
             placeholder='yes or no'
             value={Durrett_mtg || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Hobbies'>Hobbies</label>
<input
             type="text"
             id="Hobbies"
             name="Hobbies"
             placeholder='Hobbies'
             value={Hobbies || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Skill_to_share'>Skill to Share</label>
<input
             type="text"
             id="Skill_to_share"
             name="Skill_to_share"
             placeholder='Skills'
             value={Skill_to_share || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Address'>Address</label>
<input
             type="text"
             id="Address"
             name="Address"
             placeholder='123 Main St'
             value={Address || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Events_Attended'>Events Attended</label>
<input
             type="text"
             id="Events_Attended"
             name="Events_Attended"
             placeholder='Youth, HEART, WCDP, Boone st bash...'
             value={Events_Attended || ""}
             onChange={handleInputChange}
             />
<label htmlFor='isDonor'>isDonor</label>
<input
             type="text"
             id="isDonor"
             name="isDonor"
             placeholder='Yes or No'
             value={isDonor || ""}
             onChange={handleInputChange}
             />
<label htmlFor='Areas_of_Interest'>Areas of Interest</label>
<input
             type="text"
             id="Areas_of_Interest"
             name="Areas_of_Interest"
             placeholder='Areas of Interest'
             value={Areas_of_Interest || ""}
             onChange={handleInputChange}
             />

                {/* <button type = "submit"> Submit</button> */}
                <button type = "Submit">Submit</button> 
                {/* <button type = "submit" value={Fname ? "Update" : "Save"}>Save</button> */}
                {/* <Link to="/">
                    <input type="button" value="Go Back" />
                </Link> */}
            </form>
        </div>
    )
} 

export default AddEdit;