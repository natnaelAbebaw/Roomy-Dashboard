import styled, { css } from "styled-components";
import BrandLogo from "./BrandLogo";
import Button, { ButtonType } from "./Button";
import { Color, Spacing } from "./cssConstants";
import {
  SearchFormActionType,
  useGlobalContext,
} from "../context/GlobalContext";
import { Length } from "./Container";
type StyleHeaderProps = {
  searchFormState?: SearchFormActionType;
  isFixed?: string | undefined;
  mb?: string;
  padding?: (Spacing | Length)[];
};

const StyleHeader = styled.header<StyleHeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--color-grey-0);
  transition: all 0.1s;
  position: relative;
  z-index: 3;
  padding: ${({ padding }) => padding?.join(" ")};
  /* ${(props) =>
    props.searchFormState === SearchFormActionType.stickyOnTop &&
    css<StyleHeaderProps>``} */

  ${(props) =>
    props.searchFormState === SearchFormActionType.hangOnTop &&
    css`
      padding: 2rem 10rem 16rem 10rem;
    `}

  ${(props) =>
    props.isFixed &&
    css`
      position: fixed;
      top: 0;
      z-index: 3;
    `}
`;

function Header({
  isFixed = false,
  mb = Spacing.s4,
  padding,
}: {
  isFixed?: boolean;
  mb?: string;
  padding?: (Spacing | Length)[];
}) {
  const { searchFormState } = useGlobalContext();
  return (
    <StyleHeader
      padding={padding}
      isFixed={isFixed ? `${isFixed}` : undefined}
      searchFormState={searchFormState}
      mb={mb}
    >
      <BrandLogo />
      <Button buttonType={ButtonType.Outline} color={Color.brand700}>
        login
      </Button>
    </StyleHeader>
  );
}

export default Header;
