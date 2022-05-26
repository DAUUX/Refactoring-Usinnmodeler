import "./style.scss";

import { useEffect } from "react";

function Modeler() {

    useEffect(()=>{

        window.createEditor('config/usinnComponents.xml');
    
    }, [])

    return (
        <main className="container-fluid px-0 flex-fill d-flex flex-column">

            <span hidden="hidden"> <input id="source" type="checkbox"/> Source </span>
            <textarea id="xml" hidden="hidden"></textarea>

            <nav id="actionsMenu" className="nav navbar-light shadow-sm py-3 px-5">
                <div id="mainActions"> </div>
                <div id="selectActions" hidden="hidden"> </div>
            </nav>

            <section role="main" className="row flex-fill g-0">
                {/* Menu lateral */}
                <div className="col-2">
                    <center> <div id="toolbar" className="px-3" ></div> </center>
                </div>

                {/* Editor */}
                <div id="graph" className="col-10 bg-white">
                    <center id="splash">
                        <img src="images/loading.gif"/>
                    </center>
                </div>

                <div id="outlineContainer"></div>

                <div id="zoomActions" hidden="hidden"></div>
                <div id="footer" hidden="hidden">
                    <p id="status"> Carregando... </p>
                </div>
            </section>
        </main>
    )
}

export default Modeler;
