import React, {useState} from "react";
import Axios from "axios";


function UpdateLocation(){
    const [data, setData] = useState({
        "id": null,
        "city": "",
        "address": "",
        "conditions": "",
    
    });

    function submit(e){
        e.preventDefault();
        var url = "http://localhost:8080/EksamenBackend_war_exploded/api/location/"+data.id
        Axios.put(url, {
            city: data.city,
            address: data.address,
            conditions: data.conditions,
        })
            .then(res => {
                console.log(res.data)
                window.location.reload(false);
            })
    }

    function handel(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    return(
        <div>
            <form onSubmit={(e)=> submit(e)}>
            <input onChange={(e)=>handel(e)} id="id" value={data.id} placeholder={"id"} type={"number"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="city" value={data.city} placeholder={"City"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="address" value={data.address} placeholder={"Address"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="conditions" value={data.conditions} placeholder={"Condtion"} type={"text"}></input>
                <br/>
                
                <button>submit</button>
            </form>
        </div>

    )
}
export default UpdateLocation;