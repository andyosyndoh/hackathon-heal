import React from "react";

/**
 * StarClusters.tsx
 * Drop <StarClusters /> anywhere in your layout.
 *
 * Uses inline SVGs composed of capsule (rounded-rect) "rice" elements
 * arranged in a circle to form starbursts.
 */

const CapsuleStar = ({ size = 48, rays = 8, capsuleW = 6, capsuleH = 16, opacity = 1 }) => {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - capsuleH / 2 - 2;
  const color = "#EDC865";

  // produce an array of <rect> rotated around center
  const elements = Array.from({ length: rays }).map((_, i) => {
    const angle = (360 / rays) * i;
    // place capsule at top center then rotate around center
    const x = cx - capsuleW / 2;
    const y = cy - radius - capsuleH / 2;
    return (
      <rect
        key={i}
        x={x}
        y={y}
        rx={capsuleW / 2}
        ry={capsuleW / 2}
        width={capsuleW}
        height={capsuleH}
        fill={color}
        opacity={opacity}
        transform={`rotate(${angle} ${cx} ${cy})`}
      />
    );
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      {elements}
    </svg>
  );
};

export default function StarClusters() {
  return (
    <>
      {/* replicate your sample absolute placements, but each contains an SVG star made of capsules */}
      <div className="absolute top-12 right-12" aria-hidden="true">
        <CapsuleStar size={72} rays={9} capsuleW={8} capsuleH={22} opacity={0.7} />
      </div>

      <div className="absolute top-24 right-24" aria-hidden="true">
        <CapsuleStar size={40} rays={8} capsuleW={5} capsuleH={12} opacity={0.6} />
      </div>

      <div className="absolute bottom-24 left-12" aria-hidden="true">
        <CapsuleStar size={56} rays={9} capsuleW={7} capsuleH={18} opacity={0.5} />
      </div>

      <div className="absolute bottom-36 left-24" aria-hidden="true">
        <CapsuleStar size={40} rays={7} capsuleW={5} capsuleH={12} opacity={0.7} />
      </div>

      <div className="absolute top-1/2 right-8" aria-hidden="true" style={{ transform: "translateY(-50%)" }}>
        <CapsuleStar size={44} rays={8} capsuleW={5} capsuleH={14} opacity={0.6} />
      </div>

      <div className="absolute top-1/3 left-8" aria-hidden="true">
        <CapsuleStar size={48} rays={8} capsuleW={6} capsuleH={16} opacity={0.5} />
      </div>
    </>
  );
}