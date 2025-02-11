import { useState, useEffect } from "react";
import api from "../../services/api";
import { Toast } from "../Toast";


function ExportDiagramModal({id, onExportDiagram, diagramSVG}) {
    const formatOptions = ["png", "jpeg", "webp", "pdf", "svg"];
    const [format, setFormat]   = useState();

    useEffect(()=>{
        document.getElementById(id).addEventListener('show.bs.modal', event => {
            setFormat('');
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    async function getDiagramImg(format, svg) {
        onExportDiagram(true);

        try {
            const data = {format, svg};        
            if (data.format === '5'){
                const blob = new Blob([svg], {type: "image/svg+xml"});
                const blobUrl = URL.createObjectURL(blob);

                window.open(blobUrl, '_blank');
            } else {
                const response = await api.post(`diagrams/export`, data);
                let imgBuffer = response.data.img;
                let imgFormat = response.data.format;

                let base64ImageData;
                let contentType;

                if (imgFormat === 'pdf') {
                    base64ImageData = 'data:application/pdf;base64,' + imgBuffer;
                    contentType = 'application/pdf';
                } else {
                    base64ImageData = 'data:image/' + imgFormat + ';base64,' + imgBuffer;
                    contentType = 'image/' + imgFormat;
                }
                
                const byteCharacters = atob(base64ImageData.substr(`data:${contentType};base64,`.length));
                const byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                    const slice = byteCharacters.slice(offset, offset + 1024);

                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    const byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }
                const blob = new Blob(byteArrays, {type: contentType});
                const blobUrl = URL.createObjectURL(blob);

                window.open(blobUrl, '_blank');

            }

            Toast('success', 'Diagrama exportado com sucesso!', "checkCircle");

        
        } catch (error) {
        
            Toast('error', error, "errorCircle");
        
        }
        onExportDiagram(false);
    }

    function exportDiagram(e){
        let value = e.target.value;
        setFormat(value);
        let event = null;
        document.getElementById(id).click();
        
        switch(formatOptions[value-1]) {
            case "":
                break;
            default:
                const getSVG = (event) => {
                    getDiagramImg(value, diagramSVG === "" ? event.detail.svg : diagramSVG);        
                }
                window.addEventListener('sendDiagramSVG', getSVG , { once: true });
                event = new CustomEvent('generateDiagramSVG');
                window.dispatchEvent(event);
        }
    }    

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="ExportDiagramModalLabel">
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ExportDiagramModalLabel">Exportar diagrama</h5>
                        <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">                        
                        <div className="input-group mb-3">
                            <select
								disabled={false}								
								value={format}
								className={`form-select`}
								name="format"
                                onChange={(e)=>{
                                    exportDiagram(e)
                                }}
							>
								<option value="" disabled hidden> Formato </option>
								{ formatOptions.map((item, index) => 
									<option value={index+1} key={index} > {item.toLocaleUpperCase()} </option>
								)}
							</select>                            
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default ExportDiagramModal;