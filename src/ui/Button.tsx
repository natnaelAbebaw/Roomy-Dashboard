import styled, { css } from "styled-components";
import { Color, Font, Spacing } from "./cssConstants";
import { Length } from "./Container";

const buttonTypes = {
  primary: css<ButtonProps>`
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
  `,

  secondary: css<ButtonProps>`
    background-color: ${(props) => props.backgroundColor};
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.08);
    border: 1px solid ${(props) => props.borderColor};
    color: ${(props) => props.color};
  `,

  outline: css<ButtonProps>`
    border: 1px solid ${(props) => props.borderColor};
    color: ${(props) => props.color};
    background-color: ${Color.grey0};
    border-width: ${({ border }) => border};
    border-color: ${({ borderColor }) => borderColor};
  `,

  normal: css<ButtonProps>`
    font-weight: 600;
    color: ${(props) => props.color};
    font-size: 1.6rem;
    background-color: ${Color.grey0};
    transition: background-color 0.2s;
    &:hover {
      color: ${Color.brand700};
    }
  `,

  underline: css<ButtonProps>`
    border-bottom: 1px solid ${(props) => props.borderColor};
    color: ${(props) => props.color};
    background-color: ${(props) => props.backgroundColor};
  `,

  default: css<ButtonProps>`
    background-color: ${Color.grey0};
    color: ${Color.grey700};
    transition: background-color 0.2s;
    &:hover {
      background-color: ${Color.grey100};
    }
  `,
};

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Outline = "outline",
  Normal = "normal",
  Underline = "underline",
  Default = "default",
}

type ButtonProps = {
  buttonType?: ButtonType;
  backgroundColor?: Color;
  color?: Color;
  borderColor?: Color;
  mb?: Spacing;
  padding?: Spacing[];
  pB?: Spacing;
  pL?: Spacing;
  pR?: Spacing;
  pT?: Spacing;
  fontSize?: Font;
  borderRadius?: Spacing;
  border?: Spacing;
  width?: Spacing | Length;
};

const Button = styled.button<ButtonProps>`
  font-size: ${({ fontSize }) => fontSize};
  text-transform: capitalize;
  border: none;
  border-radius: ${({ borderRadius }) => borderRadius};
  padding: ${({ padding }) => padding?.map((space) => space).join(" ")};
  padding-bottom: ${({ pB }) => pB};
  padding-left: ${({ pL }) => pL};
  padding-right: ${({ pR }) => pR};
  padding-top: ${({ pT }) => pT};
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin-bottom: ${({ mb }) => mb};
  border-width: ${({ border }) => border};
  width: ${({ width }) => width};
  ${({ buttonType }) => buttonTypes[buttonType!]}
`;

Button.defaultProps = {
  buttonType: ButtonType.Primary,
  backgroundColor: Color.brand700,
  color: Color.grey700,
  borderColor: Color.brand700,
  mb: Spacing.s1,
  padding: [Spacing.s2, Spacing.s4],
  fontSize: Font.fs16,
  borderRadius: Spacing.s4,
};

export default Button;
