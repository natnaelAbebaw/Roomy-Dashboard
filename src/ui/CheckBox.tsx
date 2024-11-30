import styled from "styled-components";
import { Spacing } from "./cssConstants";

type CheckBoxProps = {
  size?: number;
  gap?: Spacing;
};
const CheckBox = styled.div<CheckBoxProps>`
  & label {
    display: block;
    position: relative;
    padding: 0 0 0 ${(props) => props.gap};
    font-size: 1.6rem;
    cursor: pointer;
    user-select: none;
    & label:hover input ~ span {
      background-color: var(--color-brand-700);
    }

    & input:checked ~ span {
      background-color: var(--color-brand-700);
    }

    & span::after {
      content: "";
      position: absolute;
      display: none;
    }

    & input:checked ~ span:after {
      display: block;
    }

    & span:after {
      left: ${({ size }) => `${size! * 0.3}px`};
      top: ${({ size }) => `${size! * 0.1}px`};
      width: ${({ size }) => `${size! * 0.3}px`};
      height: ${({ size }) => `${size! * 0.6}px`};
      border: solid var(--color-grey-0);
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  & span {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: ${({ size }) => `${size}px`};
    aspect-ratio: 1;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-300);
    border-radius: 3px;
  }
`;

CheckBox.defaultProps = {
  size: 20,
  gap: Spacing.s32,
};

export default CheckBox;
