import React from 'react';

const ArrowHeadMarkerStartEnd = () => (
  <svg>
  <defs>
    <marker
      id="arrowhead-start"
      markerWidth="10"
      markerHeight="7"
      refX="0"
      refY="3.5"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <polygon points="10 0, 0 3.5, 10 7" fill="black" />
    </marker>
    <marker
      id="arrowhead-end"
      markerWidth="10"
      markerHeight="7"
      refX="10"
      refY="3.5"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <polygon points="0 0, 10 3.5, 0 7" fill="black" />
    </marker>
  </defs>
</svg>
);

export default ArrowHeadMarkerStartEnd;
