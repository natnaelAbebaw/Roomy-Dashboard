import styled, { css } from "styled-components";
import { useClickOutside } from "../CustomHooks/useClickOutside";
import PopupBox from "./PopupBox";
import { CgClose } from "react-icons/cg";
import Flex, { FlexAlign } from "./Flex";
import Container, { Length } from "./Container";
import { Color, Spacing } from "./cssConstants";
import Button, { ButtonType } from "./Button";
import { BiDownArrow } from "react-icons/bi";
import Positioned from "./Positioned";
import Text from "./Text";
import { HiOutlineCube } from "react-icons/hi2";

const StyledMultiSelect = styled.div`
  position: relative;
`;

const StyledPopupBox = styled(PopupBox)`
  /* width: 100%; */
  padding: 5px;
  top: 110%;
  margin-bottom: 100px;
`;

const SelectedItem = styled(Flex)`
  cursor: pointer;
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const MultiSelectContainer = styled(Flex)<{
  isSelected: boolean;
  isShowDropdown: boolean;
}>`
  flex-wrap: wrap;
  border: 1px solid var(--color-grey-300);
  border-radius: 4px;
  ${({ isSelected }) =>
    isSelected
      ? css`
          padding: 1rem 4rem 1rem 1rem;
        `
      : css`
          padding: 3rem 4rem 3rem 3rem;
        `};
  ${({ isShowDropdown }) =>
    isShowDropdown &&
    css`
      box-shadow: 0 0 1px 1px var(--color-brand-200);
    `};
  position: relative;
  cursor: pointer;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

type multiSelectOptions = {
  selectedItems: {
    label: string;
    value: string | number;
  }[];
  setSelectedItems: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        value: number | string;
      }[]
    >
  >;
  dropDownList: { label: string; value: number | string }[];
  placeholder: string;
  disabled?: boolean;
};

export default function MultiSelect({
  selectedItems,
  setSelectedItems,
  dropDownList,
  placeholder,
  disabled = false,
}: multiSelectOptions) {
  const {
    clickState: showDropdown,
    setClickState: setShowDropdown,
    ref,
  } = useClickOutside<HTMLDivElement>();

  function handleSelect(item: { label: string; value: number | string }) {
    if (selectedItems.some((selectedItem) => selectedItem === item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    // setShowDropdown(false);
  }

  function handleUnselect(item: { label: string; value: number | string }) {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  }

  return (
    <StyledMultiSelect>
      <div>
        <MultiSelectContainer
          isSelected={selectedItems.length > 0}
          isShowDropdown={showDropdown}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target as HTMLElement;
            if (!target.closest(".closeBtn")) {
              setShowDropdown((s) => !s);
            }
          }}
        >
          {!showDropdown && selectedItems.length === 0 && (
            <Placeholder> Click here to add {placeholder}.</Placeholder>
          )}
          {selectedItems.map((item, index) => (
            <Container
              key={index}
              border={Spacing.s1}
              width={Length.fitContent}
              borderRadius={Spacing.s8}
              padding={[Spacing.s6, Spacing.s12]}
              borderColor={Color.brand700}
            >
              <Flex
                align={FlexAlign.Center}
                gap={Spacing.s24}
                p={[Spacing.zero, Spacing.zero]}
              >
                <Flex align={FlexAlign.Center} gap={Spacing.s8}>
                  <HiOutlineCube color={Color.grey500} />
                  <Text color={Color.grey500}>{item.label}</Text>
                </Flex>

                <Button
                  buttonType={ButtonType.Normal}
                  className="closeBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (disabled) return;
                    handleUnselect(item);
                  }}
                >
                  <CgClose color={Color.grey500} />
                </Button>
              </Flex>
            </Container>
          ))}

          <Positioned
            top={Length["L1/2"]}
            right={Spacing.s12}
            transform={[Length["L-1/2"], Length["L-1/2"]]}
          >
            <BiDownArrow />
          </Positioned>
        </MultiSelectContainer>
        {showDropdown && !disabled && (
          <StyledPopupBox ref={ref}>
            {dropDownList.map((item) => (
              <SelectedItem
                align={FlexAlign.Center}
                gap={Spacing.s24}
                p={[Spacing.s8, Spacing.s32]}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(item);
                }}
              >
                <Flex align={FlexAlign.Center} gap={Spacing.s16}>
                  <input
                    type="checkbox"
                    checked={selectedItems.some(
                      (selectedItem) => selectedItem === item
                    )}
                  />
                  <HiOutlineCube color={Color.grey500} />
                  <span>{item.label}</span>
                </Flex>
              </SelectedItem>
            ))}
          </StyledPopupBox>
        )}
      </div>
    </StyledMultiSelect>
  );
}
