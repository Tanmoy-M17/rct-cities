import axios from 'axios';
import React, { useEffect, useState } from 'react'

const City = (props) => {
    const[Table,setTable]=useState([]);
    const[Page, setPage]=useState(1);
    const[Limit, setLimit]=useState(10);    
    const[Total,setTotal]=useState(0)
    // const [Sortby, setSortby]=useState("");
    const getData=async()=>{
        let r= await axios.get(`http://localhost:8080/cities?_page=${Page}&_limit=${Limit}`);
           setTable(r.data);
           setTotal(Number(r.headers["x-total-count"]))
      }
      useEffect(()=>{
        getData();
      },[Page,Limit])

  const [Form, setForm] = useState({
    city_name:"",
    population:"",
    country:""
});
const handelOnChange=(e)=>{
    let{name,value}=e.target;
        setForm({
            ...Form,
            [name]:value
        });
    }

const Submit=(event)=>{
    event.preventDefault()
    axios({
        method: 'post',
        url:`http://localhost:8080/cities`,
        data: Form
      }).then(()=>{getData()});
}
const deleteItem = (id) => {
    axios.delete(`http://localhost:8080/cities/${id}`)
    .then(()=>{getData()})
  }
  const handelSort=(value)=>{
   let data= [...Table].sort((a,b)=>((b[value])-(a[value])));
   setTable(data);
   
  }

return (
<div>city
    <form onSubmit={Submit}>
        <div>
            <label>Name :</label>
            <input type="text" name='city_name' onChange={handelOnChange} value={Form.city_name} placeholder='Enter Name...' />
        </div>
        <div>
            <label>Popolation :</label>
            <input type="number" name='population'onChange={handelOnChange} value={Form.population} placeholder='Enter Population...' />
        </div>
        <div>
            <label>Country :</label>
            <input type="text" name='country' value={Form.country} onChange={handelOnChange}/>
            </div>
            <button type='submit'>Add City</button>
            </form>
            <br />

            <h1>Table</h1>
                <div>
                <label>Sort By</label>
            <select onChange={(e)=>handelSort(e.target.value)}>
                            <option value="">select an option</option>
                            <option value="population">Population</option>
                            
                    </select>
                </div>
            <table>
                <thead>
                <tr>
                <th>Name</th>
                <th>Population</th>
                <th>Country</th>
                <th>Operation</th>
                </tr>
                </thead>

                <tbody>
                {Table.map((data)=>(
                <tr key={data.id}>
                <td>{data.city_name}</td>
                <td>{data.population}</td>
                <td>{data.country}</td>
                <td><button onClick={()=>deleteItem(data.id)}>Delete</button></td>
                </tr>
                ))}
                </tbody>
                
            </table>
                    <button disabled={Page<=1} onClick={()=>setPage(Page-1)}>{"<"}</button>
                    <select onChange={(e)=>setLimit(e.target.value)}>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                    </select>
                    <button disabled={Total<=Page*Limit} onClick={()=>setPage(Page+1)}>{">"}</button>
        </div>
        
)}

export default City