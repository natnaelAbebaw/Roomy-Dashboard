import { Table, TableHead, TableRow, TableBody, Th } from "../../ui/Table";

import { Cabin } from "../../services/cabinApi";
import RoomRow from "./RoomRow";
import TableShimmer from "../../ui/TableShimmer";
import { useEffect, useState } from "react";
import Flex, {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  FlexWrap,
} from "../../ui/Flex";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import EasyFilter from "../../ui/Filters/EasyFilter";
import Search from "../../ui/Search";
import Popup from "../../ui/Popup";
import Button, { ButtonType } from "../../ui/Button";
import { BiFilterAlt } from "react-icons/bi";
import Container, { Length, Position } from "../../ui/Container";
import Filters from "../../ui/Filters/Filters";
import Sort from "../../ui/Filters/Sort";
import Text, {
  DisplayType,
  FontWeight,
  TextAlign,
  TextTransform,
} from "../../ui/Text";
import ReactPaginate from "react-paginate";
import "../../ui/Pagination.css";
import PageLimit from "../../ui/Filters/PageLimit";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import BulkSelect from "../../ui/BulkSelect";
import styled, { css } from "styled-components";
import { IoCloseOutline, IoDuplicateOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { filterActions, FilterContext, useRoom } from "./useRoom";
import { useCreateRoom } from "./useCreateRoom";
import { useDeleteRoom } from "./useDeleteRoom";
import Modal from "../../ui/Modal";
import DeletePopup from "../../ui/DeletePopup";
import { IFilter } from "../../ui/Filters/FilterConstants";
import { IoIosClose } from "react-icons/io";
import CheckBox from "../../ui/CheckBox";
import { useAuth } from "../Authentication/AuthProvider";

const BulkBox = styled.div<{ onDestroy: boolean }>`
  position: absolute;
  width: max-content;
  bottom: 8rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  animation: fadein 0.3s ease-out;
  ${({ onDestroy }) =>
    onDestroy &&
    css`
      animation: fadeout 0.3s ease-in forwards;
    `}

  @keyframes fadein {
    from {
      opacity: 0;
      bottom: 0rem;
    }
    to {
      opacity: 1;
      bottom: 8rem;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
      bottom: 8rem;
    }
    to {
      opacity: 0;
      bottom: 0rem;
    }
  }
`;

const esayFilters = [
  { label: "All", value: "" },
  { label: "With Discount", value: "discount[gt]=0" },
  { label: "No Discount", value: "discount=0" },
];

export const sortOptions = [
  { value: "sort=-createdAt", label: "Sort by Date(high first)" },
  { value: "sort=createdAt", label: "Sort by Date(low first)" },
  { value: "sort=name", label: "Sort by Name(A-Z)" },
  { value: "sort=-name", label: "Sort by Name(Z-A)" },
  { value: "sort=regularPrice", label: "Sort by Price(low first)" },
  { value: "sort=-regularPrice", label: "Sort by Price(high first)" },
  { value: "sort=-capacity", label: "Sort by Capacity(low first)" },
  { value: "sort=capacity", label: "Sort by Capacity(high first)" },
];
function RoomTable() {
  const { hotel: authHotel } = useAuth();
  const {
    roomData,
    isRoomLoading,
    dispatch,
    simpleFilter,
    filters,
    localFilters,
    setSimpleFilter,
    search,
    setSearch,
    sort,
    setSort,
    pageLimit,
    setPageLimit,
    currentPage,
    setCurrentPage,
  } = useRoom();

  const { rooms, maxRooms } = roomData || {};

  const [maxPages, setMaxPages] = useState(0);

  const [bulkSelectItems, setBulkSelectItems] = useState<Cabin[]>([]);

  const [destroyBulk, setDestroyBulk] = useState(false);

  useEffect(() => {
    if (maxRooms == undefined) return;
    setMaxPages(Math.ceil((maxRooms || 0) / (pageLimit.value as number)));
  }, [maxRooms, pageLimit]);

  function handlePageClick({ selected }: { selected: number }) {
    setCurrentPage(selected + 1);
  }

  const { createRoom, isCreateRoomLoading } = useCreateRoom();

  const { DeleteRooms, isDeleteRoomLoading } = useDeleteRoom();

  function onMultiDelete() {
    if (!bulkSelectItems.length) return;
    bulkSelectItems.forEach((room) => {
      if (!room._id) return;
      DeleteRooms(
        { hotelId: authHotel?.id as string, cabinId: room._id },
        {
          onSuccess: () => {
            setDestroyBulk(true);
            setTimeout(() => {
              setBulkSelectItems([]);
            }, 300);
          },
        }
      );
    });
  }

  function initPage() {
    setCurrentPage(1);
  }

  function onMultiDuplicate() {
    if (!bulkSelectItems.length) return;
    bulkSelectItems.forEach((room) => {
      if (!room._id) return;
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
            setDestroyBulk(true);
            setTimeout(() => {
              setBulkSelectItems([]);
            }, 300);
          },
        }
      );
    });
  }

  function deleteFilter(filter: IFilter) {
    dispatch?.({
      type: filterActions.DELETE_FILTER,
      payload: filter,
    });
  }

  return (
    <FilterContext.Provider value={{ filters, localFilters, dispatch }}>
      <Flex
        mb={Spacing.s4}
        p={[Spacing.s12, Spacing.zero]}
        justify={FlexJustify.Start}
      >
        <EasyFilter
          selectedFilter={simpleFilter}
          setSelectedFilter={setSimpleFilter}
          filterObject={esayFilters}
        />
        <div style={{ marginLeft: "auto" }}>
          <Search
            placeholder="Search Room..."
            search={search}
            setSearch={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />
        </div>

        <Popup>
          <Popup.Open>
            <Button
              backgroundColor={Color.grey0}
              buttonType={ButtonType.Outline}
              borderColor={Color.grey300}
              borderRadius={Spacing.s4}
              padding={[Spacing.s10, Spacing.s16]}
            >
              <Flex align={FlexAlign.Center}>
                <BiFilterAlt />
                <Text fontSize={Font.fs14}>Filter</Text>
              </Flex>
            </Button>
          </Popup.Open>
          <Popup.Window options={{ minWidth: Length.L40, right: Spacing.zero }}>
            <Filters onInitPage={initPage} />
          </Popup.Window>
        </Popup>

        <Sort
          sortOptions={sortOptions}
          selected={sort}
          onSelected={(sort) => setSort(sort)}
        />
      </Flex>

      {filters.length > 0 && (
        <Flex mb={Spacing.s16} FlexWrap={FlexWrap.wrap}>
          {filters.map((filter) => (
            <Container
              width={Length.maxContent}
              padding={[Spacing.s6, Spacing.s12]}
              borderRadius={Spacing.s8}
              borderColor={Color.brand700}
              position={Position.relative}
              bg={Color.grey100}
            >
              <Flex align={FlexAlign.Center}>
                <Text
                  fontSize={Font.fs14}
                  fontWeight={FontWeight.Regular}
                  color={Color.grey700}
                >
                  {filter.field.name}&nbsp;&nbsp;
                  <Text
                    fontSize={Font.fs14}
                    display={DisplayType.Inline}
                    color={Color.grey500}
                  >
                    {filter.operator}
                  </Text>
                  &nbsp;&nbsp;
                  {filter.value}
                </Text>
                <IoCloseOutline
                  onClick={() => deleteFilter(filter)}
                  fontSize={Font.fs18}
                  color={Color.grey700}
                />
              </Flex>
            </Container>
          ))}
        </Flex>
      )}
      <Container
        border={Spacing.s1}
        borderRadius={Spacing.s4}
        borderColor={Color.grey200}
        minHeight={Length.L48}
        position={Position.relative}
      >
        <Flex
          direction={FlexDirection.Column}
          justify={FlexJustify.SpaceBetween}
          align={FlexAlign.Center}
          minHeight={Length.L48}
        >
          <Container width={Length.Full}>
            <Table>
              <TableHead>
                <TableRow>
                  <Th>
                    <CheckBox size={18} gap={Spacing.s48}>
                      <label htmlFor={"rooms"}>
                        <input
                          type="checkbox"
                          id={"rooms"}
                          name={"rooms"}
                          checked={bulkSelectItems.length === rooms?.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setDestroyBulk(false);
                              setBulkSelectItems(rooms!);
                            } else {
                              setDestroyBulk(true);
                              setTimeout(() => {
                                setBulkSelectItems([]);
                              }, 300);
                            }
                          }}
                        />
                        <span></span>
                      </label>
                    </CheckBox>
                  </Th>
                  <Th>Room</Th>
                  <Th>Type</Th>
                  <Th>Capacity</Th>
                  <Th>View</Th>
                  <Th>Price</Th>
                  <Th>Discount</Th>
                  <Th></Th>
                </TableRow>
              </TableHead>
              <TableBody>
                {isRoomLoading &&
                  new Array((pageLimit.value as number) + 3)
                    .fill(0)
                    .map((_, index) => <TableShimmer key={index} />)}

                {!isRoomLoading &&
                  rooms &&
                  rooms?.length > 0 &&
                  rooms?.map((room) => (
                    <RoomRow
                      key={room._id}
                      room={room}
                      setBulkSelectItems={setBulkSelectItems}
                      setDestroyBulk={setDestroyBulk}
                      bulkSelectItems={bulkSelectItems}
                    />
                  ))}
              </TableBody>
            </Table>
            {!isRoomLoading && rooms?.length === 0 && (
              <Text
                padding={[Spacing.s16, Spacing.zero]}
                fontSize={Font.fs16}
                textAlign={TextAlign.Center}
                fontWeight={FontWeight.Medium}
                textTransform={TextTransform.Uppercase}
                color={Color.grey500}
              >
                No rooms found with the selected filters
              </Text>
            )}
          </Container>

          <Container width={Length.Full}>
            <Flex
              width={Length.Full}
              justify={FlexJustify.SpaceBetween}
              align={FlexAlign.Center}
              p={[Spacing.s12, Spacing.s16]}
            >
              <PageLimit
                selected={pageLimit}
                onSelected={(value) => {
                  setPageLimit(value);
                  setCurrentPage(1);
                }}
              />

              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={maxPages}
                forcePage={currentPage - 1}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />

              <Flex>
                <Button
                  buttonType={ButtonType.Outline}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  padding={[Spacing.s8, Spacing.s12]}
                  borderColor={Color.grey300}
                  disabled={maxPages == 0 || currentPage === 1}
                >
                  <Flex align={FlexAlign.Center}>
                    <MdKeyboardArrowLeft fontSize={Font.fs20} />
                    <span>Previous</span>
                  </Flex>
                </Button>
                <Button
                  buttonType={ButtonType.Outline}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  padding={[Spacing.s8, Spacing.s12]}
                  borderColor={Color.grey300}
                  disabled={maxPages == 0 || currentPage === maxPages}
                >
                  <Flex align={FlexAlign.Center}>
                    <span>Next</span>
                    <MdKeyboardArrowRight fontSize={Font.fs20} />
                  </Flex>
                </Button>
              </Flex>
            </Flex>
          </Container>
        </Flex>
        {bulkSelectItems.length > 0 && (
          <BulkBox onDestroy={destroyBulk}>
            <BulkSelect
              bulkSelectItems={bulkSelectItems}
              setBulkSelectItems={setBulkSelectItems}
              setDestroyBulk={setDestroyBulk}
            >
              <Container padding={[Spacing.zero, Spacing.s24]} bR={Spacing.s1}>
                <Button
                  buttonType={ButtonType.Default}
                  onClick={onMultiDuplicate}
                  disabled={isCreateRoomLoading}
                  padding={[Spacing.s8]}
                >
                  <Flex gap={Spacing.s8} align={FlexAlign.Center}>
                    <IoDuplicateOutline />
                    <span>Duplicate</span>
                  </Flex>
                </Button>
              </Container>

              <Modal>
                <Modal.Open open="delete room">
                  <Container padding={[Spacing.zero, Spacing.s24]}>
                    <Button
                      buttonType={ButtonType.Default}
                      disabled={isDeleteRoomLoading}
                      padding={[Spacing.s8]}
                    >
                      <Flex gap={Spacing.s8} align={FlexAlign.Center}>
                        <AiOutlineDelete />
                        <span>Delete</span>
                      </Flex>
                    </Button>
                  </Container>
                </Modal.Open>
                <Modal.Window
                  name="delete room"
                  maxWdith="40%"
                  maxHeight="90vh"
                >
                  <DeletePopup
                    deletedItem={`${bulkSelectItems.length} selected rooms`}
                    onDelete={onMultiDelete}
                    disabled={isDeleteRoomLoading}
                  />
                </Modal.Window>
              </Modal>

              <Button
                onClick={() => {
                  setDestroyBulk(true);
                  setTimeout(() => {
                    setBulkSelectItems([]);
                  }, 300);
                }}
                padding={[Spacing.zero]}
                buttonType={ButtonType.Normal}
              >
                <IoIosClose fontSize={Font.fs24} />
              </Button>
            </BulkSelect>
          </BulkBox>
        )}
      </Container>
    </FilterContext.Provider>
  );
}

export default RoomTable;
