import styled from "styled-components";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const StyleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.6rem 0;
  gap: 4rem;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-300);
`;
const StyledButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;
const StyledCicleButton = styled.button`
  background: none;
  font-size: 3rem;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-700);
  &:hover {
    color: var(--color-brand-900);
  }

  &:disabled {
    color: var(--color-brand-200);
  }

  &:active {
    transform: scale(0.9);
  }
`;
type GuestPickerProps = {
  numOfGuests: number;
  onChangeNumOfGuests: (guest: number | ((s: number) => number)) => void;
};
function GuestPickerDialog({
  numOfGuests,
  onChangeNumOfGuests,
}: GuestPickerProps) {
  function handleIncrement() {
    onChangeNumOfGuests((s) => s + 1);
  }
  function handleDecrement() {
    onChangeNumOfGuests((s) => s - 1);
  }
  return (
    <StyleDiv>
      <span>Guests</span>
      <StyledButtonBox>
        <StyledCicleButton
          type="button"
          disabled={numOfGuests <= 1}
          onClick={handleDecrement}
        >
          <CiCircleMinus />
        </StyledCicleButton>
        <span>{numOfGuests}</span>
        <StyledCicleButton
          type="button"
          disabled={numOfGuests >= 10}
          onClick={handleIncrement}
        >
          <CiCirclePlus />
        </StyledCicleButton>
      </StyledButtonBox>
    </StyleDiv>
  );
}

export default GuestPickerDialog;
