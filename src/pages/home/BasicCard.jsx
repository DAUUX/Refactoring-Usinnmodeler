export default function BasicCard({ imagem, titulo, paragrafo }) {
  return (
    <div className="col d-flex align-items-center p-sm-3 bg-white rounded-3">
      <img src={imagem} className="pe-2 pe-sm-4 d-block" alt="" />
      <div>
        <h2 className="fs-5 fw-bolder">{titulo}</h2>
        <p className="fw-bold">{paragrafo}</p>
      </div>
    </div>
  );
}
