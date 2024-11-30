import { IoBedOutline } from "react-icons/io5";
import Container from "./Container";
import Flex, { FlexAlign, FlexDirection } from "./Flex";
import Text, { FontWeight } from "./Text";
import { Color, Font, Spacing } from "./cssConstants";

function CardRoom() {
  return (
    <Container
      border={Spacing.s1}
      padding={[Spacing.s12, Spacing.s16]}
      borderColor={Color.grey200}
      borderRadius={Spacing.s12}
      style={{
        flexGrow: 1,
      }}
    >
      <Flex align={FlexAlign.Center}>
        <Container
          borderRadius={Spacing.s8}
          border={Spacing.s1}
          borderColor={Color.grey200}
          padding={[Spacing.s8, Spacing.s8]}
        >
          <Flex align={FlexAlign.Center}>
            <IoBedOutline color={Color.brand500} fontSize={Font.fs24} />
          </Flex>
        </Container>

        <Container>
          <Flex direction={FlexDirection.Column} gap={Spacing.s1}>
            <Text color={Color.grey500}>Total room</Text>
            <Text fontWeight={FontWeight.Medium}>403,334</Text>
          </Flex>
        </Container>
      </Flex>
    </Container>
  );
}

export default CardRoom;
