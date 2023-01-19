import './style.scss';

function DiagramCard({name, lastModified, thumbnail}) {
    return (
        <a href="#" className="card text-reset text-decoration-none" id="diagram-card">
            <div className="card-header d-flex">
                <div>
                    <span className="fw-bold">Featured</span><br />
                    <span>Modificado há dois dias</span>
                </div>

                <div className="dropdown ms-auto">
                    <button className="btn px-2 pe-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-three-dots-vertical"></i>
                    </button>

                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#"> <i className="bi bi-share-fill"></i> Compartilhar</a></li>
                        <li><a className="dropdown-item" href="#"> <i className="bi bi-trash3-fill"></i> Excluir</a></li>
                    </ul>

                </div>

            </div>
            <div className="card-body p-0">
                <img className='w-100' src="https://via.placeholder.com/350x180" alt="Thumbnail do diagrama" />
            </div>
        </a>
    )
}

export default DiagramCard;