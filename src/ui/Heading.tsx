import styled from "styled-components";
import { Color, Font, Spacing } from "./cssConstants";
import { KnownTarget } from "styled-components/dist/types";
import { FontWeight } from "./Text";

export enum HeadingElement {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
}

type HeadingProps = {
  fs?: Font;
  as?: KnownTarget | HeadingElement;
  mb?: Spacing;
  fontWeight?: FontWeight;
  color?: Color;
};

const Heading = styled.div<HeadingProps>`
  font-size: ${(props) => props.fs};
  margin-bottom: ${(props) => props.mb};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  text-transform: capitalize;
`;

Heading.defaultProps = {
  fs: Font.fs16,
  mb: Spacing.s16,
  as: HeadingElement.H1,
  fontWeight: FontWeight.Medium,
};

export default Heading;
