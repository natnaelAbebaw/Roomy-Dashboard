import { FaAngleDown } from "react-icons/fa";
import { useClickOutside } from "../CustomHooks/useClickOutside";
import Input from "./Input";
import PopupBox from "./PopupBox";
import styled from "styled-components";
import GuestPickerDialog from "./GuestPickerDialog";
import { Font, Spacing } from "./cssConstants";
import Flex from "./Flex";

import {
  SearchFormActionType,
  useGlobalContext,
} from "../context/GlobalContext";

type GuestPickerProps = {
  numOfGuests: number;
  onChangeNumOfGuests: (guest: number | ((s: number) => number)) => void;
};

const StyledGuestPicker = styled.div`
  position: relative;
  width: 100%;
`;

const StyledFaAngleDown = styled(FaAngleDown)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;

function GuestPicker({ onChangeNumOfGuests, numOfGuests }: GuestPickerProps) {
  const {
    clickState: showGuestPicker,
    setClickState: setShowGuestPicker,
    ref,
  } = useClickOutside<HTMLDivElement>();
  const { searchFormState } = useGlobalContext();
  return (
    <StyledGuestPicker>
      <Flex
        onClick={() => setShowGuestPicker(true)}
        onFocus={() => setShowGuestPicker(true)}
      >
        <Input
          type="text"
          value={`${numOfGuests} Guests`}
          readOnly
          id="guests"
          padding={[Spacing.s8, Spacing.zero]}
          fontSize={
            searchFormState === SearchFormActionType.stickyOnTop
              ? Font.fs14
              : Font.fs16
          }
        />
        <StyledFaAngleDown className="down" />
      </Flex>
      {showGuestPicker && (
        <PopupBox ref={ref}>
          <GuestPickerDialog
            numOfGuests={numOfGuests}
            onChangeNumOfGuests={onChangeNumOfGuests}
          />
        </PopupBox>
      )}
    </StyledGuestPicker>
  );
}

export default GuestPicker;
