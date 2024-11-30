import styled, { css } from "styled-components";
import {
  SearchFormActionType,
  useGlobalContext,
} from "../context/GlobalContext";

type StyledFooterProp = {
  searchFormState: SearchFormActionType;
};
const StyledFooter = styled.div<StyledFooterProp>`
  padding: 1rem 10rem;
  width: 100%;
  border-top: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  ${(props) =>
    props.searchFormState &&
    css`
      position: fixed;
      bottom: 0;
      z-index: 3;
    `}
`;

function Footer() {
  const { searchFormState } = useGlobalContext();
  return (
    <StyledFooter searchFormState={searchFormState}>
      <p>© 2024 ReserveOn, inc</p>
    </StyledFooter>
  );
}

export default Footer;
