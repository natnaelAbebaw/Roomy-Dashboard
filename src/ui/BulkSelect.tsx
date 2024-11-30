import { IoMdCheckbox } from "react-icons/io";
import Container, { BoxShadow, Length } from "./Container";
import Flex, { FlexAlign } from "./Flex";
import { Color, Font, Spacing } from "./cssConstants";
import { Cabin } from "../services/cabinApi";
import { Booking } from "../services/BookingApi";

function BulkSelect({
  children,
  bulkSelectItems,
}: {
  children: React.ReactNode;
  bulkSelectItems: Cabin[] | Booking[];
  setBulkSelectItems: React.Dispatch<React.SetStateAction<Cabin[] | Booking[]>>;
  setDestroyBulk: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Container
      padding={[Spacing.s12]}
      border={Spacing.s1}
      width={Length.maxContent}
      borderRadius={Spacing.s8}
      boxShadow={BoxShadow.Large}
      bg={Color.grey0}
    >
      <Flex align={FlexAlign.Center} gap={Spacing.zero}>
        <Container
          bg={Color.grey0}
          padding={[Spacing.zero, Spacing.s24]}
          bR={Spacing.s1}
        >
          <Flex gap={Spacing.s8} align={FlexAlign.Center}>
            <IoMdCheckbox fontSize={Font.fs24} color={Color.brand700} />
            <span>{bulkSelectItems.length} items</span>
          </Flex>
        </Container>
        {children}
      </Flex>
    </Container>
  );
}

export default BulkSelect;
