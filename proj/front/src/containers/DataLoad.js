import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Table } from "react-bootstrap";
import "../styles/DataLoad.css";
const pat = {
  "data": {
    "patients": [
      {
        "id": "UGF0aWVudHM6NWU4MDc0ZmVkZDYwNzI5Nzk0MTk4MWMz",
        "fName": "update",
        "lName": "ls",
        "mobileNm": "1212121212",
        "emailId": "test@test.com",
        "ParentName": [
          "test",
          "mutation"
        ],
        "visitsDone": {
          "edges": [
            {
              "node": {
                "id": "VmlzaXRzOjVlODRjZTJhOTcwZjgxMDg1YjNiNjNhMg==",
                "date": "2020-04-01T17:20:43",
                "weight": 50,
                "height": 150
              }
            },
            {
              "node": {
                "id": "VmlzaXRzOjVlODRjZTUwOTcwZjgxMDg1YjNiNjNhMw==",
                "date": "2020-04-01T17:30:43",
                "weight": 60,
                "height": 150
              }
            }
          ]
        }
      }
    ]
 }
};


// class DataLoad extends React.Component{
//   render()
// }

export default function DataLoad(){
  const[First_name, setFirst_name]  =  useState("");
  const[last_name, setlast_name]  =  useState("");
  const[mob_num, setmob_num]  =  useState("");

  function validateForm() {
    return ((First_name.length > 0 && last_name.length > 0) || (mob_num > 0)) ;
  }

  aysnc function handleSubmit(event) {
    event.preventDefault();
    try{
      //send a request to fetch data, once fetched load it..
    }catch(e){
      alert(e.message);
    }
    return(
      );
    }
  
    return (
    <div className="DataLoad">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="First_name" bsSize="small">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            autoFocus
            value={First_name}
            onChange={e => setFirst_name(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="last_name" bsSize="small">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            value={last_name}
            onChange={e => setlast_name(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="mob_num" bsSize="small">
          <ControlLabel>Mobile Number</ControlLabel>
          <FormControl
          type = "number"
            value={mob_num}
            onChange={e=> setmob_num(e.target.value)}/>
        </FormGroup>
        <Button block bsSize="small" disabled={!validateForm()} type="submit">
          Search
        </Button>
      </form>
    </div>
    );
}