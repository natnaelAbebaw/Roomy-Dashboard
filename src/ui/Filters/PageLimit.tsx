import { Spacing } from "../cssConstants";
import DropDown from "../DropDown";
import Flex, { FlexAlign } from "../Flex";

export const LimitOptions = [
  { value: 6, label: "6 Documents" },
  { value: 10, label: "10 Documents" },
  { value: 15, label: "15 Documents" },
  { value: 20, label: "20 Documents" },
];

function PageLimit({
  selected,
  onSelected,
}: {
  selected: { label: string; value: string | number };
  onSelected: ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => void;
}) {
  return (
    <Flex align={FlexAlign.Center}>
      <DropDown
        dropDownList={LimitOptions}
        selected={selected}
        onSelected={onSelected}
        toRight={true}
        toTop={true}
        options={{
          borderRadius: Spacing.s4,
          padding: [Spacing.s4, Spacing.s8],
          border: Spacing.s1,
        }}
      />
    </Flex>
  );
}

export default PageLimit;
