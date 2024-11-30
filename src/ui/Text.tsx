import styled from "styled-components";
import { Color, Font, Spacing } from "./cssConstants";
import { KnownTarget } from "styled-components/dist/types";

export enum TextAlign {
  Center = "center",
  Left = "left",
  Right = "right",
  Justify = "justify",
}

export enum TextTransform {
  Uppercase = "uppercase",
  Lowercase = "lowercase",
  Capitalize = "capitalize",
  None = "none",
}

export enum FontWeight {
  Light = "300",
  Regular = "400",
  Medium100 = "500",
  Medium = "600",
  Bold = "800",
}

export enum TextElement {
  div = "div",
  p = "p",
  span = "span",
  address = "address",
  blockquote = "blockquote",
}

type TextProps = {
  color?: Color;
  fontSize?: Font;
  fontWeight?: FontWeight;
  margin?: Spacing[];
  mB?: Spacing;
  mT?: Spacing;
  mL?: Spacing;
  mR?: Spacing;
  padding?: Spacing[];
  pB?: Spacing;
  pT?: Spacing;
  pL?: Spacing;
  pR?: Spacing;
  textAlign?: TextAlign;
  textTransform?: TextTransform;
  width?: string;
  as?: KnownTarget | TextElement;
  display?: DisplayType;
};

export enum DisplayType {
  Block = "block",
  Inline = "inline",
  InlineBlock = "inline-block",
  None = "none",
}

const Text = styled.div<TextProps>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-align: ${({ textAlign }) => textAlign};
  text-transform: ${({ textTransform }) => textTransform};
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin?.map((space) => space).join(" ")};
  margin-bottom: ${({ mB }) => mB};
  margin-top: ${({ mT }) => mT};
  margin-left: ${({ mL }) => mL};
  margin-right: ${({ mR }) => mR};
  padding: ${({ padding }) => padding?.map((space) => space).join(" ")};
  padding-bottom: ${({ pB }) => pB};
  padding-top: ${({ pT }) => pT};
  padding-left: ${({ pL }) => pL};
  padding-right: ${({ pR }) => pR};
  text-transform: ${({ textTransform }) => textTransform};
  display: ${({ display }) => display};
`;

Text.defaultProps = {
  color: Color.grey700,
  fontSize: Font.fs16,
  fontWeight: FontWeight.Regular,
  margin: [Spacing.zero],
  padding: [Spacing.zero],
  textAlign: TextAlign.Left,
  textTransform: TextTransform.None,
  width: "auto",
  as: TextElement.div,
};

export default Text;
