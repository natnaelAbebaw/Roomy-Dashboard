import Button, { ButtonType } from "../Button";
import Container from "../Container";
import { Color, Font, Spacing } from "../cssConstants";
import Flex, { FlexAlign } from "../Flex";

function EasyFilter({
  selectedFilter,
  setSelectedFilter,
  filterObject,
}: {
  selectedFilter: { label: string; value: string };
  setSelectedFilter: ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => void;
  filterObject: { label: string; value: string }[];
}) {
  return (
    <Container
      borderRadius={Spacing.s8}
      padding={[Spacing.s2]}
      bg={Color.grey100}
    >
      <Flex align={FlexAlign.Center}>
        {filterObject.map((filter) => (
          <Button
            buttonType={ButtonType.Primary}
            padding={[Spacing.s6, Spacing.s12]}
            backgroundColor={
              filter.label == selectedFilter.label
                ? Color.brand500
                : Color.grey100
            }
            color={
              filter.label == selectedFilter.label
                ? Color.brand100
                : Color.grey500
            }
            fontSize={Font.fs14}
            borderColor={
              filter.label == selectedFilter.label
                ? Color.grey200
                : Color.grey100
            }
            border={Spacing.s2}
            borderRadius={Spacing.s8}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter.label}
          </Button>
        ))}
      </Flex>
    </Container>
  );
}

export default EasyFilter;
