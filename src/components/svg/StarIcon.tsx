import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const StarIcon = ({ width = 16, height = 16, color = '#FFCE31' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <G clipPath="url(#clip0)">
        <Path
          d="M15.5 6.3H9.775L8 0.75L6.225 6.3H0.5L5.125 9.725L3.375 15.25L8 11.825L12.625 15.25L10.85 9.7L15.5 6.3Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default StarIcon;
