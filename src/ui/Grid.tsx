import styled from "styled-components";
import { Spacing } from "./cssConstants";

type gridProps = {
  columGap?: Spacing;
  RowGap?: Spacing;
  columns?: number | string;
  rows?: number | string;
  mb?: Spacing;
};

const Grid = styled.div<gridProps>`
  display: grid;
  grid-template-columns: ${(props) => {
    if (typeof props.columns === "number") {
      return `repeat(${props.columns}, 1fr)`;
    } else {
      return props.columns;
    }
  }};
  grid-template-rows: ${(props) => {
    if (typeof props.rows === "number") {
      return `repeat(${props.rows}, 1fr)`;
    } else {
      return props.rows;
    }
  }};
  column-gap: ${(props) => props.columGap};
  row-gap: ${(props) => props.RowGap};
  margin-bottom: ${(props) => props.mb};
  /* align-items: center; */
  /* justify-content: center; */
  /* justify-items: center; */
`;

Grid.defaultProps = {
  columGap: Spacing.s16,
  RowGap: Spacing.s16,
  columns: "auto",
  rows: "auto",
};

export default Grid;
