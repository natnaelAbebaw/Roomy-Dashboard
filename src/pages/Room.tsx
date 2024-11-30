import RoomTable from "../features/Room/RoomTable";
import Flex, { FlexAlign, FlexDirection, FlexJustify } from "../ui/Flex";
import Button, { ButtonType } from "../ui/Button";
import { Color, Font, Spacing } from "../ui/cssConstants";
import Modal from "../ui/Modal";
import RoomForm from "../features/Room/RoomForm";
import Text from "../ui/Text";
import Heading from "../ui/Heading";
import { GoPlus } from "react-icons/go";

function Room() {
  return (
    <div>
      <Flex
        mb={Spacing.s8}
        justify={FlexJustify.SpaceBetween}
        align={FlexAlign.Center}
      >
        <Flex direction={FlexDirection.Column} gap={Spacing.s1}>
          <Heading color={Color.grey700} mb={Spacing.zero} fs={Font.fs24}>
            Manage Rooms
          </Heading>
          <Text color={Color.grey500}>Track Room Assignments and Bookings</Text>
        </Flex>

        <Modal>
          <Modal.Open open="New Room">
            <Button
              color={Color.grey0}
              padding={[Spacing.s12, Spacing.s16]}
              buttonType={ButtonType.Primary}
            >
              <Flex align={FlexAlign.Center}>
                <GoPlus color={Color.brand100} fontSize={Font.fs24} />
                <Text color={Color.brand100}> New Room</Text>
              </Flex>
            </Button>
          </Modal.Open>
          <Modal.Window name="New Room" maxWdith="70%" maxHeight="90vh">
            <RoomForm />
          </Modal.Window>
        </Modal>
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

      <RoomTable />
    </div>
  );
}

export default Room;
