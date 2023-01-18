import React, {useState} from "react";
import Axios from "axios";


function UpdateMatches(){
    const [data, setData] = useState({
        "id": null,
        "opponentTeam": "",
        "judge": "",
        "type": "",
        "inDoors": "",
        "locationID":"",
    
    });

    function submit(e){
        var url = "http://localhost:8080/EksamenBackend_war_exploded/api/match/"+data.id
        e.preventDefault();
        Axios.put(url, {
            opponentTeam: data.opponentTeam,
            judge: data.judge,
            type: data.type,
            inDoors: data.inDoors,
            locationID: data.locationID,
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
            <text>EDITOR</text>
            <form onSubmit={(e)=> submit(e)}>
            <input onChange={(e)=>handel(e)} id="id" value={data.id} placeholder={"id"} type={"number"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="opponentTeam" value={data.opponentTeam} placeholder={"Opponent Team"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="judge" value={data.judge} placeholder={"Judge"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="type" value={data.type} placeholder={"Type"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="inDoors" value={data.inDoors} placeholder={"InDoors (shall be true or false)"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="locationID" value={data.locationID} placeholder={"locationID"} type={"text"}></input>
                <br/>
                <button>submit</button>
            </form>
        </div>

    )
}
export default UpdateMatches;