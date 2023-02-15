// generated snippet
// table component work
import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import "./Home.css"
import {toast} from "react-toastify";
import axios from "axios";

// columns to delete - boone_st_bash, WCDP, HEART, Youth, Racial_Justice, Neighbor_Day_BA
// to add - Events_Attended, isDonor, Areas_of_Interest

const Home = () => {

    const [data, setData] = useState([]);
    // fetch all data from mysql database using api
    // using async for api 
    // http://localhost:5000/api/get - backend API
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    // intial app load will fetch all the data from backend
    // table is in the container tableContainer to easily change css
    // body is also a container (later used to change overflow)
    useEffect(() =>{
        loadData();
    }, []);

    const deleteContact = (Id) => {
        if(window.confirm(`Are you sure you want to delete this Contact?`)) {
            axios.delete(`http://localhost:5000/api/remove/${Id}`);
            alert("Contact deleted successfully");
            setTimeout(() => loadData(), 500);
        }
    }
    const handleAuth = () => {
        localStorage.clear()
        window.location.reload()
    }

    return(
        <div className='Body' style={{marginTop: "15px"}}>
            <h1 className='WestCentralHeading'> West Central  Contacts</h1>
            <Link to="/addContact">
                <button type='AddNewContact'>Add a New Contact</button>
            </Link>
            <Link to="/sort">
                <button type='sort'>Sort Fields</button>
            </Link>
            <button className='logOutBtn' onClick={handleAuth}> log out</button>
            <div className='TableContainer'>
                <div className="styled-table">
                <thead>
                    <tr className='tr'>
                        <th style={{textAlign: "center"}}>ACTION</th>
                        <th style={{textAlign: "center"}}>Id</th>
                        <th style={{textAlign: "center"}}>First Name</th>
                        <th style={{textAlign: "center"}}>Last Name </th>
                        <th style={{textAlign: "center"}}>Organization</th>
                        <th style={{textAlign: "center"}}>Position </th>
                        <th style={{textAlign: "center"}}>Phone </th>
                        <th style={{textAlign: "center"}}>Other Phone</th>
                        <th style={{textAlign: "center"}}>Email </th>
                        <th style={{textAlign: "center"}}>WC Resident </th>
                        <th style={{textAlign: "center"}}>Notes </th>
                        <th style={{textAlign: "center"}}>Allow Photos </th>
                        <th style={{textAlign: "center"}}>Want Info </th>
                        <th style={{textAlign: "center"}}>Fallows Conversation </th>
                        <th style={{textAlign: "center"}}>Durrett mtg </th>
                        <th style={{textAlign: "center"}}>Hobbies</th>
                        <th style={{textAlign: "center"}}>Skill to Share</th>
                        <th style={{textAlign: "center"}}>Address</th>
                        <th style={{textAlign: "center"}}>Events Attended</th>
                        <th style={{textAlign: "center"}}>isDonor</th>
                        <th style={{textAlign: "center"}}>Areas of Interest</th>
                      
                        {/* First Name,Last Name,Organization,Position,Phone,Other Phone,Email,WC Resident,Notes,Allow Photos,Want Info,Fallows Conversation,
                        Durrett mtg,Boone St Bash,WCDP,Racial Justice,Heart,Youth,Hobbies,Skill to Share,Address,Neighbor day_BA  */}
                    </tr>
                </thead>
                <tbody>
                {/* FName,LName,Org,Position,Phone,Other_phone,Email,WC_resident,Notes,Allow_photos,Want_info,Fallows_conversation,
                Durrett_mtg,Boone_st_Bash,WCDP,Racial_justice,HEART,Youth,Hobbies,Skill_to_Share,Address,Neighbor_day_BA */}
                    {data.map((item, index) => {
                        return(
                            <tr key={item.id}>
                                <td>
                                    <Link to={`/update/${item.Id}`}>
                                    <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteContact(item.Id)}>Delete</button>
                                    <Link to={`/view/${item.Id}`}>
                                    <button className='btn btn-view'>View</button>
                                    </Link>
                                </td>
                                <td>{index+1}</td>
                                <td>{item.Fname}</td>
                                <td>{item.Lname}</td>
                                <td>{item.Org}</td>
                                <td>{item.Position}</td>
                                <td>{item.Phone}</td>
                                <td>{item.Other_phone}</td>
                                <td>{item.Email}</td>
                                <td>{item.WC_Resident}</td>
                                <td>{item.Notes}</td>
                                <td>{item.Allow_photos}</td>
                                <td>{item.Want_info}</td>
                                <td>{item.Fallows_conversation}</td>
                                <td>{item.Durrett_mtg}</td>
                                <td>{item.Hobbies}</td>
                                <td>{item.Skill_to_share}</td>
                                <td>{item.Address}</td>
                                <td>{item.Events_Attended}</td>
                                <td>{item.isDonor}</td>
                                <td>{item.Areas_of_Interest}</td>
                            </tr>
                        )
                    })}
                </tbody>
                </div>
            </div>
        </div>
    );
};
export default Home;
