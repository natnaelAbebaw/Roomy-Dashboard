import styled, { css } from "styled-components";
import { Color, Spacing } from "./cssConstants";

export enum Length {
  Auto = "auto",
  Full = "100%",
  "L1/2" = "50%",
  "L1/3" = "33.333333%",
  "L2/3" = "66.666667%",
  "L1/4" = "25%",
  "L-1/2" = "-50%",
  "L-1/3" = "-33.333333%",
  "L-2/3" = "-66.666667%",
  "L-1/4" = "-25%",
  "-Full" = "-100%",
  fitContent = "fit-content",
  maxContent = "max-content",
  minContent = "min-content",
  Vh100 = "100vh",
  Vh50 = "50vh",
  Vh25 = "25vh",
  Vh75 = "75vh",
  Vw25 = "25vw",
  Vw75 = "75vw",
  Vw50 = "50vw",
  Vw100 = "100vw",
  L2 = "2rem",
  L4 = "4rem",
  L8 = "8rem",
  L12 = "12rem",
  L16 = "16rem",
  L18 = "18rem",
  L20 = "20rem",
  L24 = "24rem",
  L28 = "28rem",
  L30 = "30rem",
  L32 = "32rem",
  L36 = "36rem",
  L40 = "40rem",
  L44 = "44rem",
  L48 = "48rem",
  L52 = "52rem",
  L56 = "56rem",
  L60 = "60rem",
  L64 = "64rem",
  L68 = "68rem",
  L72 = "72rem",
  L76 = "76rem",
  L80 = "80rem",
  L84 = "84rem",
  L88 = "88rem",
  L92 = "92rem",
  L96 = "96rem",
  L100 = "100rem",
  L104 = "104rem",
  L108 = "108rem",
  L112 = "112rem",
  L116 = "116rem",
  L120 = "120rem",
  L124 = "124rem",
  L128 = "128rem",
  L132 = "132rem",
}

export enum Overflow {
  Auto = "auto",
  Hidden = "hidden",
  Scroll = "scroll",
  Visible = "visible",
}

type ContainerProps = {
  width?: string | Length;
  height?: string | Length;
  maxHeight?: string | Length;
  minHeight?: string | Length;
  minWidth?: string | Length;
  maxWidth?: string | Length;
  margin?: Spacing[];
  mB?: Spacing;
  mL?: Spacing;
  mR?: Spacing;
  mT?: Spacing;
  padding?: (Spacing | Length)[];
  pB?: Spacing;
  pL?: Spacing;
  pR?: Spacing;
  pT?: Spacing;
  border?: Spacing;
  borderColor?: Color;
  bB?: Spacing;
  bL?: Spacing;
  bR?: Spacing;
  bT?: Spacing;
  bg?: Color;
  boxShadow?: BoxShadow;
  borderRadius?: Spacing;
  overflow?: Overflow;
  position?: Position;
};

export enum Position {
  absolute = "absolute",
  relative = "relative",
}

export enum BoxShadow {
  Default = "0 0 1rem rgba(0, 0, 0, 0.1)",
  Normal = "0 2px 8px rgba(0, 0, 0, 0.06)",
  Medium = "0 4px 16px rgba(0, 0, 0, 0.08)",
  Large = "0 8px 24px rgba(0, 0, 0, 0.1)",
  None = "none",
}

const Container = styled.div<ContainerProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-height: ${({ maxHeight }) => maxHeight};
  min-height: ${({ minHeight }) => minHeight};
  min-width: ${({ minWidth }) => minWidth};
  max-width: ${({ maxWidth }) => maxWidth};
  margin: ${({ margin }) => margin?.map((space) => space).join(" ")};
  margin-bottom: ${({ mB }) => mB};
  margin-left: ${({ mL }) => mL};
  margin-right: ${({ mR }) => mR};
  margin-top: ${({ mT }) => mT};
  padding: ${({ padding }) => padding?.map((space) => space).join(" ")};
  padding-bottom: ${({ pB }) => pB};
  padding-left: ${({ pL }) => pL};
  padding-right: ${({ pR }) => pR};
  padding-top: ${({ pT }) => pT};
  background-color: ${({ bg }) => bg};
  border-radius: ${({ borderRadius }) => borderRadius};
  scroll-behavior: smooth;
  overflow: ${({ overflow }) => overflow};
  position: ${({ position }) => position};
  ${({ border }) =>
    border &&
    css<ContainerProps>`
      border: ${({ border }) => border} solid
        ${({ borderColor }) => (borderColor ? borderColor : Color.grey300)};
    `}

  ${({ bB }) =>
    bB &&
    css<ContainerProps>`
      border-bottom: ${({ bB }) => bB} solid
        ${({ borderColor }) => (borderColor ? borderColor : Color.grey300)};
    `}
  
        ${({ bL }) =>
    bL &&
    css<ContainerProps>`
      border-left: ${({ bL }) => bL} solid
        ${({ borderColor }) => (borderColor ? borderColor : Color.grey300)};
    `}

        ${({ bR }) =>
    bR &&
    css<ContainerProps>`
      border-right: ${({ bR }) => bR} solid
        ${({ borderColor }) => (borderColor ? borderColor : Color.grey300)};
    `}

        ${({ bT }) =>
    bT &&
    css<ContainerProps>`
      border-top: ${({ bT }) => bT} solid
        ${({ borderColor }) => (borderColor ? borderColor : Color.grey300)};
      background-color: ${({ bg }) => bg};
    `}

        ${({ boxShadow }) =>
    boxShadow &&
    css<ContainerProps>`
      box-shadow: ${({ boxShadow }) => boxShadow};
    `}
`;

Container.defaultProps = {};

export default Container;
