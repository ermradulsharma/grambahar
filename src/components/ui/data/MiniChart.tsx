import React from 'react';

interface MiniChartProps {
  data: number[];
  color?: string;
}

export default function MiniChart({ data, color = 'var(--nature-green)' }: MiniChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const width = 100;
  const height = 30;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ width: '100px', height: '30px', opacity: 0.8 }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%' }}>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  );
}
