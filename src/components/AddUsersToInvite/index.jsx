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
        <div className="row mb-3 d-flex align-items-center"> 
            <span className="col-6 col-sm-7">
                <input type="text" className="form-control" placeholder="E-mail" value={email} onChange={(e)=>{setEmail(e.target.value)}}/> 
            </span>
            <span className="col-4 col-sm-3 col-lg-4">
                <select className="form-select" onChange={(e)=>{setPermission(e.target.value)}}>
                    <option value={1}>Leitor</option>
                    <option value={2}>Editor</option>
                </select>
            </span>
            <span className="col-2 col-lg-1 d-flex justify-content-end">
                <button
                    className={`btn text-primary border border-primary px-0 ${!props.visibleButton && 'disabled'}`}
                    onClick={() => props.onDelete(props.id)}
                    style={{width:"43px", minWidth:"43px"}}>
                    <i className="bi bi-dash-lg" />
                </button>
            </span>
        </div>                        
    )
}

export default AddUsersToInvite;