import styled from "styled-components";
import { Spacing } from "./cssConstants";
import { Length } from "./Container";

type positionProps = {
  top?: Spacing | Length;
  left?: Spacing | Length;
  right?: Spacing | Length;
  bottom?: Spacing | Length;
  transform?: [Spacing | Length, Spacing | Length];
};

const StyledPositioned = styled.div<positionProps>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  transform: ${({ transform }) => `translate(${transform?.join(",")})`};
  display: grid;
  place-items: center;
`;

StyledPositioned.defaultProps = {};

function Positioned({
  children,
  top,
  left,
  right,
  bottom,
  transform,
}: {
  children: React.ReactNode;
  top?: Spacing | Length;
  left?: Spacing | Length;
  right?: Spacing | Length;
  bottom?: Spacing | Length;
  transform?: [Spacing | Length, Spacing | Length];
}) {
  return (
    <StyledPositioned
      transform={transform}
      bottom={bottom}
      right={right}
      left={left}
      top={top}
    >
      {children}
    </StyledPositioned>
  );
}

export default Positioned;
