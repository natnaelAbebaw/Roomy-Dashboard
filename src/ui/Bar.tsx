import styled from "styled-components";
import { Color } from "./cssConstants";

type BarProps = {
  maxwidth?: string;
  height?: string;
  width?: string;
};

const StyledBar = styled.div<BarProps>`
  width: ${(props) => props.maxwidth};
  height: ${(props) => props.height};
  gap: 3px;
  background-color: ${Color.grey100};
  border-radius: 0.5rem;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: ${(props) => props.width};
    height: 100%;
    background-color: ${Color.brand500};
    border-radius: 0.5rem;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

function Bar({ maxwidth = "15rem", height = "6px", width = "50%" }: BarProps) {
  return (
    <StyledBar maxwidth={maxwidth} height={height} width={width}></StyledBar>
  );
}

export default Bar;
