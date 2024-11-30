import styled from "styled-components";
import "./ReactShimmer.css";

import { Spacing } from "./cssConstants";
import { TableRow, Td } from "./Table";
import { ShimmerDiv } from "shimmer-effects-react";
import ContainerDimensions from "react-container-dimensions";

type ShimmerProps = {
  height?: number;
  width?: number;
  mb?: string;
  br?: string;
};

const StyledShimmerBox = styled(ShimmerDiv)<ShimmerProps>`
  margin-bottom: ${(props) => props.mb};
  border-radius: ${(props) => props.br};
`;

function TableShimmer() {
  return (
    <TableRow>
      {new Array(7).fill(0).map(() => (
        <Td>
          <div>
            <ContainerDimensions
              children={({ width }) => (
                <StyledShimmerBox
                  className="custom-shimmer"
                  width={width}
                  height={20}
                  br={Spacing.s6}
                />
              )}
            ></ContainerDimensions>
          </div>
        </Td>
      ))}
    </TableRow>
  );
}
export default TableShimmer;
