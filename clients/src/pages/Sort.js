import React, { useState } from "react";
import axios from "axios";
import "./sort.css"
const SortForm = () => {
  const [sortField, setSortField] = useState("");
  const [data, setData] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    // Make a POST request to the backend with the sort field

    //Make sure they actually sort by some field
    if (sortField === "") {
      console.log("Please select a field to sort by");
      return;
    }
    axios({
      method: "POST",
      data: {
        sortField: sortField,
      },
      url: "http://localhost:5000/sort",
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Sort by:
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="" disabled>
              Select field
            </option>
            <option value="Fname">First Name</option>
            <option value="Lname">Last Name</option>
            <option value="id">Id</option>
            <option value="Phone">Phone</option>
            <option value="Events_Attended">Events Attended</option>
          </select>
        </label>
        <button type="submit">Sort</button>
      </form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table>
          <thead>
          <tr className='tr'>
                        <th style={{textAlign: "center"}}>Id </th>
                        <th style={{textAlign: "center"}}>First Name</th>
                        <th style={{textAlign: "center"}}>Last Name</th>
                        <th style={{textAlign: "center"}}>Phone </th>
                        <th style={{textAlign: "center"}}>Events Attended</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.Id}</td>
                <td>{item.Fname}</td>
                <td>{item.Lname}</td>
                <td>{item.Phone}</td>
                <td>{item.Events_Attended}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SortForm;
