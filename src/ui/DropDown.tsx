import styled, { css } from "styled-components";
import { HiChevronDown } from "react-icons/hi2";
import { useClickOutside } from "../CustomHooks/useClickOutside";
import PopupBox from "./PopupBox";
import { BoxShadow, Length } from "./Container";
import { Color, Font, Spacing } from "./cssConstants";
import Flex, { FlexAlign, FlexJustify } from "./Flex";
import Text from "./Text";

type DropDownProps = {
  dropDownList: { label: string; value: number | string }[];
  selected: { label: string; value: number | string };
  onSelected: (selected: { label: string; value: number | string }) => void;
  options?: ContainerProps;
  disabled?: boolean;
  toRight?: boolean;
  toTop?: boolean;
};

type ContainerProps = {
  width?: string | Length;
  height?: string | Length;
  maxHeight?: string | Length;
  minHeight?: string | Length;
  minWidth?: string | Length;
  maxWidth?: string | Length;
  margin?: Spacing[];
  mB?: Spacing;
  mL?: Spacing;
  mR?: Spacing;
  mT?: Spacing;
  padding?: (Spacing | Length)[];
  pB?: Spacing;
  pL?: Spacing;
  pR?: Spacing;
  pT?: Spacing;
  border?: Spacing;
  borderColor?: Color;
  bB?: Spacing;
  bL?: Spacing;
  bR?: Spacing;
  bT?: Spacing;
  bg?: Color;
  boxShadow?: BoxShadow;
  borderRadius?: Spacing;
  left?: Spacing;
  right?: Spacing;
};

type DropDownContainerProps = {
  options?: ContainerProps;
  showDropdown: boolean;
};

const StyleDownDrop = styled.div<DropDownContainerProps>`
  position: relative;
  width: ${({ options }) => options?.width};
  height: ${({ options }) => options?.height};
  max-height: ${({ options }) => options?.maxHeight};
  min-height: ${({ options }) => options?.minHeight};
  min-width: ${({ options }) => options?.minWidth};
  max-width: ${({ options }) => options?.maxWidth};
  margin: ${({ options }) => options?.margin?.map((space) => space).join(" ")};
  margin-bottom: ${({ options }) => options?.mB};
  margin-left: ${({ options }) => options?.mL};
  margin-right: ${({ options }) => options?.mR};
  margin-top: ${({ options }) => options?.mT};
  padding: ${({ options }) =>
    options?.padding?.map((space) => space).join(" ")};
  padding-bottom: ${({ options }) => options?.pB};
  padding-left: ${({ options }) => options?.pL};
  padding-right: ${({ options }) => options?.pR};
  padding-top: ${({ options }) => options?.pT};
  background-color: ${({ options }) => options?.bg};
  border-radius: ${({ options }) => options?.borderRadius};
  scroll-behavior: smooth;

  ${({ options }) =>
    options?.border &&
    css<DropDownContainerProps>`
      border: ${({ options }) => options?.border} solid
        ${({ options }) =>
          options?.borderColor ? options?.borderColor : Color.grey300};
    `}

  ${({ showDropdown }) =>
    showDropdown &&
    css`
      box-shadow: 0 0 1px 1px var(--color-brand-200);
    `}
`;

const SelectButton = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  cursor: pointer;
`;
const StyleList = styled.div`
  padding: 8px 2.4rem;
  width: max-content;
`;

const StyleListBox = styled.div`
  border-bottom: 1px solid var(--color-grey-100);
  width: 100%;
  text-align: start;
  &:hover {
    background-color: var(--color-grey-100);
    cursor: pointer;
  }
`;

const StyledPopupBox = styled(PopupBox)<{ toRight: boolean; toTop: boolean }>`
  width: fit-content;
  padding: 5px;
  top: 110%;
  right: ${({ toRight }) => (toRight ? "0" : "auto")};
  ${({ toTop }) =>
    toTop
      ? css`
          bottom: 100%;
          top: auto;
        `
      : css`
          top: 110%;
          bottom: auto;
        `};
`;

export default function DropDown({
  dropDownList,
  selected,
  onSelected,
  options,
  disabled = false,
  toRight,
  toTop = false,
}: DropDownProps) {
  const {
    clickState: showDropdown,
    setClickState: setShowDropdown,
    ref,
  } = useClickOutside<HTMLDivElement>();
  return (
    <StyleDownDrop showDropdown={showDropdown && !disabled} options={options}>
      <SelectButton onClick={() => setShowDropdown(!showDropdown)}>
        <Flex
          width={Length.Full}
          align={FlexAlign.Center}
          justify={FlexJustify.SpaceBetween}
        >
          <Text fontSize={Font.fs14}>{selected.label}</Text>
          <HiChevronDown />
        </Flex>
      </SelectButton>
      {showDropdown && (
        <StyledPopupBox
          left={"110%"}
          toTop={toTop}
          toRight={toRight!}
          ref={ref}
        >
          {dropDownList.map((item, index) => (
            <StyleListBox>
              <StyleList
                key={index}
                onClick={() => {
                  onSelected(item);
                  setShowDropdown(false);
                }}
              >
                {item.label}
              </StyleList>
            </StyleListBox>
          ))}
        </StyledPopupBox>
      )}
    </StyleDownDrop>
  );
}
