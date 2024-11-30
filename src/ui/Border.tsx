import styled, { css } from "styled-components";
import { Color, Spacing } from "./cssConstants";

type BorderProps = {
  size?: Spacing;
  m?: Spacing;
  borderType?: BorderType;
};

export enum BorderType {
  buttom = "bottom",
  left = "left",
}

const Border = styled.div<BorderProps>`
  background-color: ${Color.grey200};

  ${(props) =>
    props.borderType === BorderType.buttom &&
    css<BorderProps>`
      border-bottom: ${props.size} solid ${Color.grey300};
      width: 100%;
      margin-block: ${(props) => props.m};
    `}
  ${(props) =>
    props.borderType === BorderType.left &&
    css`
      border-left: ${props.size} solid ${Color.grey300};
      height: 100%;
    `}
`;

Border.defaultProps = {
  size: Spacing.s1,
  m: Spacing.s48,
  borderType: BorderType.buttom,
};

export default Border;
