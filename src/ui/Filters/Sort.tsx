import { PiSortAscending } from "react-icons/pi";
import Container from "../Container";
import { Font, Spacing } from "../cssConstants";
import DropDown from "../DropDown";
import Flex, { FlexAlign } from "../Flex";

function Sort({
  selected,
  onSelected,
  sortOptions,
}: {
  selected: { label: string; value: string | number };
  onSelected: ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => void;
  sortOptions: { label: string; value: string | number }[];
}) {
  return (
    <Container
      padding={[Spacing.s8, Spacing.s12]}
      border={Spacing.s1}
      borderRadius={Spacing.s4}
    >
      <Flex align={FlexAlign.Center}>
        <PiSortAscending fontSize={Font.fs18} />
        <DropDown
          dropDownList={sortOptions}
          selected={selected}
          onSelected={onSelected}
          toRight={true}
          // options={}
        />
      </Flex>
    </Container>
  );
}

export default Sort;
