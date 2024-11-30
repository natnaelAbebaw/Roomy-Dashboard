import React from "react";
import { Font } from "./cssConstants";

type IconProps = React.ComponentProps<"div"> & {
  children: React.ReactElement;
  fontSize?: Font;
};

function Icon({ children, fontSize = Font.fs24, ...props }: IconProps) {
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { fontSize: fontSize, ...props })
  );
}

export default Icon;
