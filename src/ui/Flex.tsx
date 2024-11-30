import styled from "styled-components";
import { Color, Spacing } from "./cssConstants";
import { Length } from "./Container";

export enum FlexDirection {
  Row = "row",
  Column = "column",
}

export enum FlexJustify {
  Start = "flex-start",
  End = "flex-end",
  Center = "center",
  SpaceBetween = "space-between",
  SpaceAround = "space-around",
}

export enum FlexAlign {
  Start = "flex-start",
  End = "flex-end",
  Center = "center",
  Stretch = "stretch",
}

export enum FlexWrap {
  nowrap = "nowrap",
  wrap = "wrap",
  wrapReverse = "wrapReverse",
}

type FlexProps = {
  direction?: FlexDirection;
  justify?: FlexJustify;
  align?: FlexAlign;
  gap?: Spacing;
  mb?: Spacing;
  p?: Spacing[];
  color?: Color;
  width?: string | Length;
  height?: string | Length;
  FlexGrow?: 1 | 0;
  FlexShrink?: 1 | 0;
  FlexBasis?: Length;
  FlexWrap?: FlexWrap;
  minHeight?: Length;
};

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-grow: ${(props) => props.FlexGrow};
  flex-shrink: ${(props) => props.FlexShrink};
  flex-basis: ${(props) => props.FlexBasis};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  gap: ${(props) => props.gap};
  color: ${(props) => props.color};
  margin-bottom: ${(props) => props.mb};
  padding: ${(props) => props.p?.map((space) => space).join(" ")};
  flex-wrap: ${(props) => props.FlexWrap};
  min-height: ${(props) => props.minHeight};
`;
Flex.defaultProps = {
  direction: FlexDirection.Row,
  justify: FlexJustify.Start,
  align: FlexAlign.Start,
  gap: Spacing.s16,
};

export default Flex;
