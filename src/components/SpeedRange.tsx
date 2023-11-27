import React from 'react'
import { SpeedRangeProps } from '../interfaces';

const SpeedRange: React.FC<SpeedRangeProps> = ({ ...props }) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center gap-2 bg-white p-3 rounded-md shadow-sm">
      <input
        type="range"
        min="0"
        max={props.maxSpeed - 1}
        step="1"
        onChange={props.onChange}
        value={props.speed}
        className="h-1 w-56 bg-blue-200 rounded-lg appearance-none"
      />
    </div>
  );
};

export default SpeedRange