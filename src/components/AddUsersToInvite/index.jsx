import { useEffect, useState } from "react";

function AddUsersToInvite(props) {
    const [email, setEmail]             = useState('');    
    const [permission, setPermission]   = useState(1);   
    const [id, setId]                   = useState(null); 

    
    useEffect( ()=>{
        props.addUser(id, email, permission); 
    }, [email]);
    
    useEffect( ()=>{
        props.addUser(id, email, permission); 
    }, [permission]);
    

    useEffect(()=>{
        setId(props.id);
    }, []);

    useEffect(()=>{
        setEmail('');
    }, [props.wasInvited]);
    

    return (
        <div className="row mb-3" > 
            <span className="col-9">
                <input type="text" className="form-control" placeholder="E-mail" value={email} onChange={(e)=>{setEmail(e.target.value)}}/> 
            </span>
            <span className="col">
                <select className="form-select" onChange={(e)=>{setPermission(e.target.value)}}>
                    <option value={1}>Leitor</option>
                    <option value={2}>Editor</option>
                </select>
            </span>
        </div>                        
    )
}

export default AddUsersToInvite;