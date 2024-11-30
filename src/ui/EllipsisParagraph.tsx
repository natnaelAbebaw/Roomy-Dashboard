import styled from "styled-components";
import { Color, Spacing } from "./cssConstants";
type StyledParagraphProps = {
  mb?: Spacing;
};

const EllipsisParagraph = styled.p<StyledParagraphProps>`
  font-size: 1.6rem;
  color: ${Color.grey600};
  margin-bottom: ${({ mb }) => mb};

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 7rem;
  line-height: 1.5;
`;

export default EllipsisParagraph;
