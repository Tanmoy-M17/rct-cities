import axios from 'axios';
import React, { useEffect, useState } from 'react'
import City from './City';

const Country = () => {
const [Countries, setCountries] = useState([]);
const [Value, setValue] = useState("");
const [Country, setCountry] = useState("")

const adddata=()=>{
  axios({
    method: 'post',
    url: 'http://localhost:8080/country',
    data: {
     country:Value
    }}).then((res)=>{ getData()});
}
const handelsubmit=()=>{
    adddata();
    setCountry(Value);
  setValue("");
}

const getData=async()=>{
  let r= await axios.get(`http://localhost:8080/country`);
     setCountries(r.data);
}
useEffect(()=>{
  getData();
},[])
  return (
    <div>Country
      <div>
          <select onChange={(e)=>{setCountry(e.target.value)}}>
            {Countries.map((country)=>(
            <option key={country.id} value={country.country}>{country.country}</option>
            ))}
          </select>
          <br />

          <input type="text" value={Value} placeholder='Enter Country' onChange={(e)=>{setValue(e.target.value)}} />
          <button onClick={()=>{handelsubmit()}}>Add COuntry</button>
      </div>

      <City country={Country}/>
    </div>
  )
}

export default Country