import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { baseUrl } from "../../constant";
import { Cabin } from "../../services/cabinApi";
import { Td, TableRow } from "../../ui/Table";
import styled from "styled-components";
import Popup, { usePopup } from "../../ui/Popup";
import Flex, { FlexDirection } from "../../ui/Flex";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import Button, { ButtonType } from "../../ui/Button";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaEditSolid } from "react-icons/lia";
import { IoDuplicateOutline } from "react-icons/io5";
import Modal from "../../ui/Modal";
import RoomForm from "./RoomForm";
import DeletePopup from "../../ui/DeletePopup";

import Text from "../../ui/Text";
import { ViewTypeEnum } from "../../ui/Filters/FilterConstants";
import Container, { Length } from "../../ui/Container";
import { useDeleteRoom } from "./useDeleteRoom";
import { useCreateRoom } from "./useCreateRoom";
import CheckBox from "../../ui/CheckBox";
import { useAuth } from "../Authentication/AuthProvider";

const Room = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  img {
    width: 4rem;
    aspect-ratio: 1;
    border-radius: 5px;
    border: 1px solid var(--color-grey-200);
  }
`;

const StyledButton = styled(Button)`
  background-color: var(--color-grey-0);
  width: 100%;
  border: none;
  padding: 8px 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const ViewToColorMap: Record<ViewTypeEnum, Color> = {
  [ViewTypeEnum.MOUNTAIN]: Color.yellow700,
  [ViewTypeEnum.OCEAN]: Color.blue700,
  [ViewTypeEnum.CITY]: Color.red700,
  [ViewTypeEnum.LAKE]: Color.blue700,
  [ViewTypeEnum.FOREST]: Color.green700,
  [ViewTypeEnum.GARDEN]: Color.green700,
  [ViewTypeEnum.PARK]: Color.green700,
  [ViewTypeEnum.PARTIAL]: Color.silver700,
  [ViewTypeEnum.POOL]: Color.blue700,
  [ViewTypeEnum.WILDLIFE]: Color.yellow700,
  [ViewTypeEnum.NONE]: Color.grey400,
  [ViewTypeEnum.COURTYARD]: Color.blue700,
};

function RoomRow({
  room,
  setBulkSelectItems,
  setDestroyBulk,
  bulkSelectItems,
  close,
}: {
  room: Cabin;
  close?: () => void;
  setDestroyBulk: React.Dispatch<React.SetStateAction<boolean>>;
  setBulkSelectItems: React.Dispatch<React.SetStateAction<Cabin[]>>;
  bulkSelectItems: Cabin[];
}) {
  const { hotel: authHotel } = useAuth();
  const { DeleteRooms, isDeleteRoomLoading } = useDeleteRoom();

  const onDelete = () => {
    if (!room._id) return;
    DeleteRooms(
      { hotelId: authHotel?.id as string, cabinId: room._id },
      {
        onSuccess: () => {
          close?.();
        },
      }
    );
  };

  return (
    <TableRow>
      <Td>
        <CheckBox size={18} gap={Spacing.s48}>
          <label htmlFor={room._id}>
            <input
              type="checkbox"
              id={room._id}
              name={room._id}
              checked={bulkSelectItems.includes(room)}
              onChange={(e) => {
                if (e.target.checked) {
                  setBulkSelectItems((s) => [...s, room]);
                  setDestroyBulk(false);
                } else {
                  if (bulkSelectItems.length === 1) {
                    setDestroyBulk(true);
                    setTimeout(() => {
                      setBulkSelectItems((s) =>
                        s.filter((r) => r._id !== room._id)
                      );
                    }, 300);
                  } else {
                    setDestroyBulk(false);
                    setBulkSelectItems((s) =>
                      s.filter((r) => r._id !== room._id)
                    );
                  }
                }
              }}
            />
            <span></span>
          </label>
        </CheckBox>
      </Td>
      <Td>
        <Room>
          {" "}
          <img
            src={
              room.albumImages?.length &&
              room.albumImages?.length > 0 &&
              room.albumImages?.[0].toString().startsWith("http")
                ? room.albumImages?.[0]
                : `${baseUrl}${room.albumImages?.[0]}`
            }
            alt=""
          />
          <span>{room.name}</span>
        </Room>
      </Td>
      <Td>{room.cabinType}</Td>
      <Td>{room.maxCapacity}</Td>
      <Td>
        <Container
          width={Length.fitContent}
          padding={[Spacing.s4]}
          border={Spacing.s1}
          borderRadius={Spacing.s8}
          borderColor={ViewToColorMap[room.viewType!]}
        >
          <Text fontSize={Font.fs14} color={ViewToColorMap[room.viewType!]}>
            {room.viewType}
          </Text>
        </Container>
      </Td>
      <Td>${room.regularPrice}</Td>
      <Td>
        {room.discount! > 0 ? (
          <Text color={Color.green700}>${room.discount}</Text>
        ) : (
          <Text color={Color.grey400}>&mdash;</Text>
        )}
      </Td>
      <Td>
        <Popup>
          <Popup.Open>
            <Button buttonType={ButtonType.Default}>
              <PiDotsThreeOutlineVerticalFill />
            </Button>
          </Popup.Open>
          <Popup.Window options={{ right: Spacing.s48, minWidth: Length.L16 }}>
            <Flex direction={FlexDirection.Column} gap={Spacing.s8}>
              <Modal>
                <Modal.Open open="New Room">
                  <StyledButton>
                    <LiaEditSolid />
                    <span>Edit</span>
                  </StyledButton>
                </Modal.Open>
                <Modal.Window name="New Room" maxWdith="70%" maxHeight="90vh">
                  <RoomForm room={room} />
                </Modal.Window>
              </Modal>

              {/* <StyledButton onClick={DuplicateRoom}>
                <IoDuplicateOutline />
                <span>Duplicate</span>
              </StyledButton> */}
              <DuplicateButton room={room} />

              <Modal>
                <Modal.Open open="delete room">
                  <StyledButton>
                    <AiOutlineDelete />
                    <span>Delete</span>
                  </StyledButton>
                </Modal.Open>
                <Modal.Window
                  name="delete room"
                  maxWdith="40%"
                  maxHeight="90vh"
                >
                  <DeletePopup
                    deletedItem={room.name}
                    onDelete={onDelete}
                    disabled={isDeleteRoomLoading}
                  />
                </Modal.Window>
              </Modal>
            </Flex>
          </Popup.Window>
        </Popup>
      </Td>
    </TableRow>
  );
}
function DuplicateButton({ room }: { room: Cabin }) {
  const { hotel: authHotel } = useAuth();

  const { setOpen } = usePopup();
  const { createRoom, isCreateRoomLoading } = useCreateRoom();

  function Duplicate() {
    const duplicatedRoom = new FormData();

    const roomCopy = {
      ...room,
      name: `${room.name} copy`,
    };

    Object.entries(roomCopy).forEach(([key, value]) => {
      if (key === "_id") return;
      if (Array.isArray(value)) {
        value.forEach((item) => {
          duplicatedRoom.append(key, item);
        });
      } else {
        duplicatedRoom.append(key, value as string);
      }
    });
    createRoom(
      {
        hotelId: authHotel?.id as string,
        cabin: duplicatedRoom,
      },
      {
        onSuccess: () => {
          setOpen?.(false);
        },
      }
    );
  }

  return (
    <StyledButton onClick={Duplicate} disabled={isCreateRoomLoading}>
      <IoDuplicateOutline />
      <span>Duplicate</span>
    </StyledButton>
  );
}

export default RoomRow;
