import { LuSearch } from "react-icons/lu";
import { Color, Font, Spacing } from "./cssConstants";
import Input from "./Input";
import Positioned from "./Positioned";
import Container, { Length, Position } from "./Container";

function Search({
  search,
  setSearch,
  placeholder,
}: {
  search: string;
  setSearch: (search: string) => void;
  placeholder?: string;
}) {
  return (
    <Container position={Position.relative}>
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        border={Spacing.s1}
        padding={[Spacing.s8, Spacing.s12, Spacing.s8, Length.L4]}
        borderRadius={Spacing.s6}
        value={search}
        bg={Color.grey0}
        fontSize={Font.fs14}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Positioned
        top={Length["L1/2"]}
        left={Length.L2}
        transform={[Length["L-1/2"], Length["L-1/2"]]}
      >
        <LuSearch fontSize={Font.fs18} />
      </Positioned>
    </Container>
  );
}

export default Search;
