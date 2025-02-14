import { useEffect, useState } from "react";

function AddUsersToInvite(props) {
    const [email, setEmail]             = useState('');    
    const [permission, setPermission]   = useState(1);   
    const [id, setId]                   = useState(null); 

    
    useEffect( ()=>{
        props.addUser(id, email, permission); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, permission]);

    useEffect(()=>{
        setId(props.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=>{
        setEmail('');
    }, [props.wasInvited]);
    

    return (
        <div className="row mb-3 d-flex align-items-center"> 
            <span className="col-6 col-sm-7">
                <input name="email" type="text" className="form-control" placeholder="E-mail" value={email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete="email" aria-label="campo e-mail para compartilhar diagrama"/> 
            </span>
            <span className="col-4 col-sm-3 col-lg-4">
                <select name="permissão" className="form-select" aria-label="selecionar permissão" onChange={(e)=>{setPermission(e.target.value)}}>
                    <option value={1}>Leitor</option>
                    <option value={2}>Editor</option>
                </select>
            </span>
            <span className="col-2 col-lg-1 d-flex justify-content-end outline-black">
                <button
                    className={`btn text-primary border border-primary px-0 ${!props.visibleButton && 'disabled'}`}
                    onClick={() => props.onDelete(props.id)}
                    tabIndex={!props.visibleButton ? -1 : 0}
                    style={{width:"43px", minWidth:"43px"}}
                    aria-label="remover a linha de dados"
                >
                    <i className="bi bi-dash-lg" />
                </button>
            </span>
        </div>                        
    )
}

export default AddUsersToInvite;