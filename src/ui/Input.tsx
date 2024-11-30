import styled, { css } from "styled-components";
import { Length } from "./Container";
import { Color, Font, Spacing } from "./cssConstants";
import { FontWeight } from "./Text";

type InputProps = {
  width?: string | Length;
  color?: Color;
  padding?: (Spacing | Length)[];
  pB?: Spacing;
  pL?: Spacing;
  pR?: Spacing;
  pT?: Spacing;
  fontSize?: Font;
  fontWeight?: FontWeight;
  border?: Spacing;
  borderColor?: Color;
  borderRadius?: Spacing;
  bB?: Spacing;
  bL?: Spacing;
  bR?: Spacing;
  bT?: Spacing;
  bg?: Color;
};

const Input = styled.input<InputProps>`
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  padding: ${({ padding }) => padding?.map((space) => space).join(" ")};
  padding-bottom: ${({ pB }) => pB};
  padding-left: ${({ pL }) => pL};
  padding-right: ${({ pR }) => pR};
  padding-top: ${({ pT }) => pT};
  border-radius: ${({ borderRadius }) => borderRadius};
  border: none;
  color: ${({ color }) => color};
  background-color: ${({ bg }) => bg};
  &::placeholder {
    font-family: inherit;
    font-size: ${({ fontSize }) => fontSize};
    font-weight: regular;
    color: var(--color-grey-500);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 1px 1px var(--color-brand-200);
  }

  ${({ border }) =>
    border &&
    css<InputProps>`
      border: ${({ border }) => border} solid
        ${({ borderColor }) => (borderColor ? borderColor : Color.grey300)};
    `}

  ${({ bB }) =>
    bB &&
    css<InputProps>`
      border-bottom: ${({ bB }) => bB} solid
        ${({ borderColor }) => (borderColor ? borderColor : Color.grey300)};
    `}
  
        ${({ bL }) =>
    bL &&
    css<InputProps>`
      border-left: ${({ bL }) => bL} solid
        ${({ borderColor }) => (borderColor ? borderColor : Color.grey300)};
    `}

        ${({ bR }) =>
    bR &&
    css<InputProps>`
      border-right: ${({ bR }) => bR} solid
        ${({ borderColor }) => (borderColor ? borderColor : Color.grey300)};
    `}

        ${({ bT }) =>
    bT &&
    css<InputProps>`
      border-top: ${({ bT }) => bT} solid
        ${({ borderColor }) => (borderColor ? borderColor : Color.grey300)};
      background-color: ${({ bg }) => bg};
    `}
`;

Input.defaultProps = {
  width: Length.Full,
  color: Color.grey600,
  padding: [Spacing.zero],
  fontSize: Font.fs16,
  fontWeight: FontWeight.Regular,
  bg: Color.grey0,
};

export default Input;
