import React, {useState} from "react";
import Axios from "axios";


function UpdatePlayer(){
    const [data, setData] = useState({
        "id": null,
        "playerName": "",
        "playerEmail": "",
        "playerPhonenumber": null,
        "playerStatus": "",
    
    });

    function submit(e){
        var url = "http://localhost:8080/EksamenBackend_war_exploded/api/player/"+data.id
        e.preventDefault();
        Axios.put(url, {
            playerName: data.playerName,
            playerEmail: data.playerEmail,
            playerPhonenumber: data.playerPhonenumber,
            playerStatus: data.playerStatus,
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
        console.log(data)
    }
    return(
        <div>
            <form onSubmit={(e)=> submit(e)}>
            <input onChange={(e)=>handel(e)} id="id" value={data.id} placeholder={"id"} type={"number"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="playerName" value={data.playerName} placeholder={"Player Name"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="playerEmail" value={data.playerEmail} placeholder={"Player Email"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="playerPhonenumber" value={data.playerPhonenumber} placeholder={"Player Phonenumber"} type={"number"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="playerStatus" value={data.playerStatus} placeholder={"playerStatus"} type={"playerStatus"}></input>
                <br/>
                
                <button>submit</button>
            </form>
        </div>

    )
}
export default UpdatePlayer;