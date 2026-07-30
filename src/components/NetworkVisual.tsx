"use client";

import { motion } from "framer-motion";

const nodes = [
  { x: 60, y: 60 },
  { x: 220, y: 30 },
  { x: 340, y: 110 },
  { x: 150, y: 160 },
  { x: 300, y: 230 },
  { x: 90, y: 250 },
  { x: 380, y: 40 },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 5],
  [2, 4],
  [3, 4],
  [2, 6],
];

export default function NetworkVisual() {
  return (
    <motion.svg
      viewBox="0 0 420 300"
      className="w-full h-auto grid-fade-mask"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#60A5FA"
          strokeWidth="1"
          className="flow-line"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r="10"
            fill="#2563EB"
            fillOpacity="0.08"
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={i === 1 ? 4.5 : 3}
            fill={i === 1 ? "#0A2540" : "#2563EB"}
            className="node-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        </g>
      ))}
    </motion.svg>
  );
}
