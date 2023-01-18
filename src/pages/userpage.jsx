import { useState, useEffect } from "react";
import LoggedIn from "../components/LoggedIn";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import axios from "axios";

function Mainpage ({Username, UserId, loggedIn, role}) {

const url = "http://localhost:8080/EksamenBackend_war_exploded/api/player/create"
const [data, setData] = useState([])
const [player, setPlayer] = useState({
    "playerName": "",
    "playerEmail": "",
    "playerPhonenumber": null,
    "playerStatus": ""
});
const [user, setUser] = useState([])
const [theLocation, setTheLocation] = useState([])
const navigate = useNavigate();
const hell = "null";



useEffect(() => {

    console.log(role)
     fetch("http://localhost:8080/EksamenBackend_war_exploded/api/player/get+"+Username)
    .then(res =>{
        if(res.ok){
            return res.json()
        }
    }).then(jsonResponse => setUser(jsonResponse))

     fetch("http://localhost:8080/EksamenBackend_war_exploded/api/match/all")
        .then(res =>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => setData(jsonResponse))
}, [])

const handleSpecificGuide = (guide) =>{
    navigate('/SingleCharityPage', {
        state: { guide: guide },
    })
}
function generateGuideObj(guide){
    
    const guideObj = {
        id: guide.id,
        gender: guide.gender,
        birthYear: guide.birthYear,
        profile: guide.profile,
        imageUrl: guide.imageUrl
    }
    return guideObj
}

const handleDelete = (index) => {
    console.log(index);
    axios.delete(`http://localhost:8080/EksamenBackend_war_exploded/api/match/${index}`)
        setData([...data]);

    }
function findLocation(id){
    hell = axios.get(`http://localhost:8080/EksamenBackend_war_exploded/api/location/${id}`)
    return hell.city;
}
function handel(e){
    const newPlayer = {...player}
    newPlayer[e.target.id] = e.target.value
    setPlayer(newPlayer)
    console.log(newPlayer)
}
function submit(e){
    e.preventDefault();
    var roleurl = "http://localhost:8080/EksamenBackend_war_exploded/api/user/player+"+UserId
    axios.get(roleurl)
    axios.post(url, {
        playerName: player.playerName,
        playerEmail: player.playerEmail,
        playerPhonenumber: player.playerPhonenumber,
        playerStatus: player.playerStatus,
    })
        .then(res => {
            console.log(res.data)
            window.location.reload(false);
        })
}

return(
   
    <div>
        {!loggedIn ? (<div className='greeting'>Please log in or create an account <PostForm/> </div>) :
        (<div>
        Hello, {Username}
        {role !== "user" ? (<div><b> </b></div>) : (
                    <form onSubmit={(e)=> submit(e)}>
                    <input onChange={(e)=>handel(e)} id="playerName" value={player.playerName} placeholder={"Name"} type={"text"}></input>
                    <br/>
                    <input onChange={(e)=>handel(e)} id="playerEmail" value={player.playerEmail} placeholder={"Email"} type={"text"}></input>
                    <br/>
                    <input onChange={(e)=>handel(e)} id="playerPhonenumber" value={player.playerPhonenumber} placeholder={"Phonenumber"} type={"number"}></input>
                    <br/>
                    <input onChange={(e)=>handel(e)} id="playerStatus" value={player.playerStatus} placeholder={"Status"} type={"text"}></input>
                    <br/>
                    
                    <button>submit</button>
                </form>
        )}
        {role !== "player,user" ? (<div><b> </b></div>) : 
        (
        <div>
            <h>Personal List</h>
            <thead>
            <tr>
                <th>Opponent Team:</th>
                <th>Judge:</th>
                <th>Type:</th>
                <th>indoors:</th>
                <th>location:</th>
                <th></th>

            </tr>
        </thead>
        </div>
        
                    )}{data.map(item => ( 
                        <tbody>
                            <tr>
                                <br />
                                <td>{item.opponentTeam}</td>
                                <td>{item.judge}</td>
                                <td>{item.type}</td>
                                <td>{(item.inDoors === true ? 'yes' : 'no')}</td>
                                <td>{item.locationID}</td>
                
                                <br />
                
                                <td>{role !=="admin" ? (<div><b> </b></div>):(<div><button onClick={() =>handleDelete(item.id)}>Slet</button></div>)}</td>
                                
                            </tr>
                        
                        </tbody>
                
                
                    ))}
        
        <table>
        <thead>
            <tr>
                <th>Opponent Team:</th>
                <th>Judge:</th>
                <th>Type:</th>
                <th>indoors:</th>
                <th>location:</th>
                <th></th>
                {role !== "admin" ? (<b> </b>) :(<div>
                <th>
                    Fjern Match
                </th>
                </div>)}
                

            </tr>
        </thead>
    {data.map(item => ( 
        <tbody>
            <tr>
                <br />
                <td>{item.opponentTeam}</td>
                <td>{item.judge}</td>
                <td>{item.type}</td>
                <td>{(item.inDoors === true ? 'yes' : 'no')}</td>
                <td>{item.locationID}</td>

                <br />

                <td>{role !=="admin" ? (<div><b> </b></div>):(<div><button onClick={() =>handleDelete(item.id)}>Slet</button></div>)}</td>
                
            </tr>
        
        </tbody>


    ))}

</table>

</div>)}
    </div>


)






}
export default Mainpage