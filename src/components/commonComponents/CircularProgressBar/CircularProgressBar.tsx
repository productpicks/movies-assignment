import React from "react";

type CircularProgressBarProps = {
  percentage: number;
  size?: number;
  strokeWidth?: number;
};

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  size = 120,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex justify-center items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
      >
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="url(#gradient)" // We will define the linear gradient
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />

        <defs>
          <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#4D8C9C" />
            <stop offset="50%" stopColor="#4D8C9C" />
            <stop offset="100%" stopColor="#D6D9FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
