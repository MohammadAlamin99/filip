import React from "react";
import Svg, { Path } from "react-native-svg";

const CupIcon = ({
  width = 24,
  height = 24,
  color = "#FCD34D",
  strokeWidth = 1.5,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M15 8H17C17.5304 8 18.0391 8.21071 18.4142 8.58579C18.7893 8.96086 19 9.46957 19 10C19 10.5304 18.7893 11.0391 18.4142 11.4142C18.0391 11.7893 17.5304 12 17 12H14.5M5 19H16M5 6L5.64 12.398C5.7387 13.385 6.20061 14.3001 6.93607 14.9658C7.67153 15.6314 8.62806 16 9.62 16H10.38C11.3719 16 12.3285 15.6314 13.0639 14.9658C13.7994 14.3001 14.2613 13.385 14.36 12.398L15 6H5Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CupIcon;
