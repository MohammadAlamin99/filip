import React from "react";
import Svg, { Path } from "react-native-svg";

const CalendarIcon = ({
  width = 24,
  height = 24,
  color = "#FFD900",
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
        d="M2 10H22M9 4V6M14 3V6M19 4V6M21 18V10H7V18C7 18.7956 7.31607 19.5587 7.87868 20.1213C8.44129 20.6839 9.20435 21 10 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CalendarIcon;
