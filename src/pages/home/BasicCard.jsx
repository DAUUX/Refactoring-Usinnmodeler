export default function BasicCard({ imagem, titulo, paragrafo }) {
  return (
    <div className="col d-flex align-items-center p-3 bg-white rounded-3 border border-dark">
      <img src={imagem} className="pe-4 d-block" alt="" />
      <div>
        <h2 className="fs-5 fw-bolder">{titulo}</h2>
        <p className="fw-bold m-0">{paragrafo}</p>
      </div>
    </div>
  );
}
