import React from 'react';

export default function QuadrantIcon({ sourceX, sourceY, targetX, targetY, icon }) {
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;

  function getQuadrant(dx, dy) {
    if (dx > 0 && dy > 0) {
      return 'Quadrante IV'; 
    } else if (dx < 0 && dy > 0) {
      return 'Quadrante III'; 
    } else if (dx < 0 && dy < 0) {
      return 'Quadrante II'; 
    } else if (dx > 0 && dy < 0) {
      return 'Quadrante I'; 
    }
  }

  const quadrant = getQuadrant(dx, dy);

  // Variáveis para definir a posição do ícone e os deslocamentos com base no quadrante
  let iconX = targetX;
  let iconY = targetY;

  let offsetX = 10; 
  let offsetY = 10;

  console.log(quadrant);
  switch (quadrant) {
    case 'Quadrante I': 
      console.log('Quadrante I'); 
      offsetX = -25; 
      offsetY = 15; 
      iconX = targetX + offsetX;
      iconY = targetY + offsetY;
      break;
    case 'Quadrante II': 
      console.log('Quadrante II'); 
      offsetX = 40; 
      offsetY = 10;  
      iconX = targetX + offsetX - 30; 
      iconY = targetY + offsetY;
      break;
    case 'Quadrante III':
      console.log('Quadrante III'); 
      offsetX = 30; 
      offsetY = -20; 
      iconX = targetX + offsetX - 30; 
      iconY = targetY + offsetY - 30;
      break;
    case 'Quadrante IV':
      console.log('Quadrante IV');
      offsetX = -30; 
      offsetY = -15; 
      iconX = targetX + offsetX;
      iconY = targetY + offsetY - 30;
      break;
    default:
      iconX = targetX; 
      iconY = targetY; 
      break;
  }

  return (
    <svg
      x={iconX} 
      y={iconY} 
      width="30" 
      height="30"
      viewBox="0 0 24 24"
      fill="black"
    >
      {icon}
    </svg>
  );
}
