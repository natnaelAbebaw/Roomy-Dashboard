import styled from "styled-components";
import { Font } from "./cssConstants";

const StyledBrandLogo = styled.a`
  font-size: ${Font.fs30};

  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  /* letter-spacing: 0.8px; */
`;
const StyleSpan = styled.span`
  color: var(--color-brand-700);
  font-weight: 400;
`;
const StlyedBrand = styled.div``;

function BrandLogo() {
  return (
    <StyledBrandLogo>
      <StlyedBrand>
        Reserve<StyleSpan>On</StyleSpan>
      </StlyedBrand>
    </StyledBrandLogo>
  );
}

export default BrandLogo;
