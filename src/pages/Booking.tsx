import Flex, { FlexAlign, FlexDirection, FlexJustify } from "../ui/Flex";
import { Color, Font, Spacing } from "../ui/cssConstants";
import Text from "../ui/Text";
import Heading from "../ui/Heading";
import BookingTable from "../features/Booking/BookingTable";
import Container from "../ui/Container";

function Booking() {
  return (
    <Container>
      <Flex
        mb={Spacing.s24}
        justify={FlexJustify.SpaceBetween}
        align={FlexAlign.Center}
      >
        <Flex direction={FlexDirection.Column} gap={Spacing.s1}>
          <Heading color={Color.grey700} mb={Spacing.zero} fs={Font.fs24}>
            Manage Bookings
          </Heading>
          <Text color={Color.grey500}>
            Organize Your Stays – Hassle-Free Booking Management
          </Text>
        </Flex>
      </Flex>

      {/* <Flex
    width={Length.Full}
    justify={FlexJustify.SpaceBetween}
    mb={Spacing.s32}
    gap={Spacing.s24}
  >
    <CardRoom />
    <CardRoom />
    <CardRoom />
    <CardRoom />
  </Flex> */}

      <BookingTable />
    </Container>
  );
}

export default Booking;
