import styled, { css } from "styled-components";
import { Length } from "./Container";

type ImageGalleryProps = {
  height?: Length | string;
  width?: Length | string;
  columnSpan?: [number, number][];
  rowSpan?: [number, number][];
  column?: number;
  row?: number;
};

const ImageGallery = styled.div<ImageGalleryProps>`
  display: grid;
  grid-template-columns: repeat(${({ column }) => column}, 1fr);
  grid-template-rows: repeat(${({ row }) => row}, 1fr);
  gap: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 3rem;
  height: ${({ height }) => height};
  width: ${({ width }) => width};

  ${({ columnSpan }) =>
    columnSpan &&
    columnSpan.map(
      ([index, span]) =>
        css`
          img:nth-child(${index}) {
            grid-column: span ${span};
          }
        `
    )}

  ${({ rowSpan }) =>
    rowSpan &&
    rowSpan.map(
      ([index, span]) =>
        css`
          img:nth-child(${index}) {
            grid-row: span ${span};
          }
        `
    )}
`;
ImageGallery.defaultProps = {
  height: Length.L52,
  width: Length.Full,
  columnSpan: [],
  rowSpan: [],
  column: 4,
  row: 2,
};

export default ImageGallery;
