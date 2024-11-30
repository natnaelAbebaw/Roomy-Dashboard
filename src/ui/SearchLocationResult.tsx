import { FaMapMarkerAlt } from "react-icons/fa";
import styled from "styled-components";
import PopupBox from "./PopupBox";
import Flex, { FlexAlign, FlexDirection } from "./Flex";
import { Spacing } from "./cssConstants";
import Container, { Length } from "./Container";

const StyledPopupBox = styled(PopupBox)`
  padding: 0;
  top: 96%;

  .location {
    cursor: pointer;
    &:hover {
      background-color: var(--color-grey-100);
    }
  }
`;

const City = styled.div`
  font-size: 1.6rem;
`;

const Country = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`;

type Location = {
  id: number;
  city: string;
  country: string;
  address: string;
};

type SearchLocationResultProps = {
  onSelectLocation: (location: { city: string; country: string }) => void;
  onChangeQuery: (query: string) => void;
  locations: Location[];
  onShowResults: (value: boolean) => void;
  elementRef: React.RefObject<HTMLDivElement>;
};

function SearchLocationResult({
  locations,
  onSelectLocation,
  onChangeQuery,
  onShowResults,
  elementRef,
}: SearchLocationResultProps) {
  return (
    <StyledPopupBox ref={elementRef}>
      <Container>
        <Flex direction={FlexDirection.Column} gap={Spacing.zero}>
          {locations.map((location) => (
            <Container
              className="location"
              key={location.id}
              padding={[Spacing.s8, Spacing.s48, Spacing.s8, Spacing.s32]}
              width={Length.Full}
            >
              <Flex
                width={Length.Full}
                align={FlexAlign.Center}
                onClick={() => {
                  onSelectLocation(location);
                  onChangeQuery(`${location.city},${location.country}`);
                  onShowResults(false);
                }}
              >
                <FaMapMarkerAlt />
                <Flex gap={Spacing.s2} direction={FlexDirection.Column}>
                  <City>{location.city}</City>
                  <Country>{location.country}</Country>
                </Flex>
              </Flex>
            </Container>
          ))}
        </Flex>
      </Container>
    </StyledPopupBox>
  );
}

export default SearchLocationResult;
