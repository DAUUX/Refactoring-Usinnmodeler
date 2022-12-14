import DiagramCard from "../../../components/DiagramCard";

function Documents() {
    return (
        <div className="flex-fill h-100">
            {/* NavBar aqui */}
            <h3>Documentos</h3>

            {/* Tabs aqui, dentro das tabs o container */}

            <div className="container">

                <div className="row">
                    <div className="col-12 col-md-4 col-lg-3">
                        <DiagramCard/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Documents;