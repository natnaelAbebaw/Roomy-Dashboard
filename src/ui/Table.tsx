import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: var(--color-grey-100);
`;

export const Td = styled.td`
  padding: 1rem;
`;
export const Th = styled.th`
  padding: 1rem;
  text-align: start;
  text-transform: uppercase;
  font-size: 1.4rem;

  &:first-child {
    border-top-left-radius: 5px;
  }

  &:last-child {
    border-top-right-radius: 5px;
  }
`;

export const TableBody = styled.tbody`
  /* background-color: var(--color-grey-100); */
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid var(--color-grey-100);
`;
