import './style.scss';

function DiagramCard({name, lastModified, thumbnail}) {
    return (
        <a href="#" class="card text-reset text-decoration-none" id="diagram-card">
            <div class="card-header d-flex">
                <div>
                    <span className="fw-bold">Featured</span><br />
                    <span>Modificado há dois dias</span>
                </div>

                <div class="dropdown ms-auto">
                    <button class="btn px-2 pe-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>

                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"> <i class="bi bi-share-fill"></i> Compartilhar</a></li>
                        <li><a class="dropdown-item" href="#"> <i class="bi bi-trash3-fill"></i> Excluir</a></li>
                    </ul>

                </div>

            </div>
            <div class="card-body p-0">
                <img className='w-100' src="https://via.placeholder.com/350x180" alt="Thumbnail do diagrama" />
            </div>
        </a>
    )
}

export default DiagramCard;