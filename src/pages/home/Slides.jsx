import Alex from "../../assets/img/Alex.jpeg";
import Ana_Marcia from "../../assets/img/Ana_Marcia.jpeg";
import Anna_Beatriz from "../../assets/img/Anna_Beatriz.jpeg";
import Caio from "../../assets/img/Caio.jpg";
import Clara from "../../assets/img/Clara.jpeg";
import Dhioleno from "../../assets/img/Dhioleno.jpeg";
import Glauber from "../../assets/img/Glauber.jpeg";
import Hanna from "../../assets/img/Hanna.jpeg";
import Larissa_Santos from "../../assets/img/Larissa.jpeg";
import Mateus_Andrade from "../../assets/img/Mateus_Andrade.jpeg";
import Milene from "../../assets/img/Milene.jpeg";
import Moisés_Oliveira from "../../assets/img/Moises_Oliveira.jpeg";
import Natalia from "../../assets/img/Natalia.jpeg";
import Thiago from "../../assets/img/Thiago.jpeg";
import Vandeilson from "../../assets/img/Vandeilson.jpeg";
import Victor from "../../assets/img/Victor.jpeg";
import Wilkinis from "../../assets/img/Wilkinis.jpeg";

import styles from "./style.module.scss";

import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function Slides() {
  return (
    <Splide
      aria-label="Membros do projeto"
      options={{
        type: "loop",
        pagination: true,
        perMove: 5,
        perPage: 5,
        breakpoints: {
          700: {
            perPage: 1,
            perMove: 1,
          },
          950:{
            perPage: 2,
            perMove: 2,
          },
          1100:{
            perPage: 3,
            perMove: 3,
          },
          1350: {
            perPage: 4,
            perMove: 4,
          },
        },
      }}
    >
      {membros.map((membro, index) => (
        <SplideSlide key={index} className="py-5 d-flex flex-column">
          <img className={styles.member} src={membro.imagem} alt="" />
          <div className="text-center">
            <h2 className="fs-4 fw-bolder" aria-label={`nome: ${membro.nome}`}>{membro.nome}</h2>
            <p className="fs-5" aria-label={`${membro.nome} tem a função de ${membro.funcao}`}>{membro.funcao}</p>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
}

const membros = [
  {
    nome: "Alex Alan dos Santos",
    funcao: "Requisitos e Design",
    imagem: Alex,
  },
  {
    nome: "Ana Márcia de Lima",
    funcao: "Requisitos e Design",
    imagem: Ana_Marcia,
  },
  {
    nome: "Anna Beatriz Marques",
    funcao: "Orientadora",
    imagem: Anna_Beatriz,
  },
  {
    nome: "Caio Finotti",
    funcao: "Desenvolvimento",
    imagem: Caio,
  },
  {
    nome: "Clara Fonseca",
    funcao: "Teste",
    imagem: Clara,
  },
  {
    nome: "Dhioleno da Silva",
    funcao: "Requisito e Desenvolvimento",
    imagem: Dhioleno,
  },
  {
    nome: "Francisco Wilkinis de Sousa",
    funcao: "Teste",
    imagem: Wilkinis,
  },
  {
    nome: "Glauber Marreiro",
    funcao: "Desenvolvimento",
    imagem: Glauber,
  },
  {
    nome: "Hanna Ranielly Ramos",
    funcao: "Requisitos",
    imagem: Hanna,
  },
  {
    nome: "Larissa Saraiva",
    funcao: "Teste",
    imagem: Larissa_Santos,
  },
  {
    nome: "Mateus Eugênio Andrade",
    funcao: "Desenvolvimento",
    imagem: Mateus_Andrade,
  },
  {
    nome: "Milene Cavalcante",
    funcao: "Requisitos e Design",
    imagem: Milene,
  },
  {
    nome: "Moisés Costa",
    funcao: "Teste",
    imagem: Moisés_Oliveira,
  },
  {
    nome: "Natália Lidia Coelho",
    funcao: "Desenvolvilmento",
    imagem: Natalia,
  },
  {
    nome: "Thiago Torres",
    funcao: "Requisitos e Desenvolvimento",
    imagem: Thiago,
  },
  {
    nome: "Vandeilson Nogueira",
    funcao: "Teste",
    imagem: Vandeilson,
  },
  {
    nome: "Victor Cesar Feitosa",
    funcao: "Teste",
    imagem: Victor,
  },
];
