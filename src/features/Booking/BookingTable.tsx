import Container, { Length, Position } from "../../ui/Container";
import { Table, TableHead, TableRow, TableBody, Th } from "../../ui/Table";

import {} from "../../pages/Room";
import TableShimmer from "../../ui/TableShimmer";

import Flex, { FlexAlign, FlexDirection, FlexJustify } from "../../ui/Flex";
import { Color, Font, Spacing } from "../../ui/cssConstants";

import Button, { ButtonType } from "../../ui/Button";
import Text, { FontWeight, TextAlign, TextTransform } from "../../ui/Text";
import ReactPaginate from "react-paginate";
import "../../ui/Pagination.css";
import PageLimit from "../../ui/Filters/PageLimit";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import BulkSelect from "../../ui/BulkSelect";

import { AiOutlineDelete } from "react-icons/ai";

import Modal from "../../ui/Modal";
import DeletePopup from "../../ui/DeletePopup";
import { IoIosClose } from "react-icons/io";
import { useBooking } from "./useBooking";
import BookingRow from "./BookingRow";
import EasyFilter from "../../ui/Filters/EasyFilter";
import Sort from "../../ui/Filters/Sort";
import Search from "../../ui/Search";

import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Booking } from "../../services/BookingApi";
import { useDeleteBooking } from "./useDeleteBooking";
import { Cabin } from "../../services/cabinApi";
import CheckBox from "../../ui/CheckBox";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../Authentication/AuthProvider";

const esayFilters = [
  { label: "All", value: "" },
  { label: "Checked in", value: "status=checkedin" },
  { label: "Checked Out", value: "status=checkedout" },
  { label: "Unconfirmed", value: "status=unconfirmed" },
];

export const sortOptions = [
  { value: "sort=-createdAt", label: "Sort by Date(high first)" },
  { value: "sort=createdAt", label: "Sort by Date(low first)" },
  { value: "sort=totalPrice", label: "Sort by Price(low first)" },
  { value: "sort=-totalPrice", label: "Sort by Price(high first)" },
];
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

function BookingTable() {
  const {
    BookingData,
    isBookingLoading,
    simpleFilter,
    setSimpleFilter,
    search,
    setSearch,
    sort,
    setSort,
    pageLimit,
    setPageLimit,
    currentPage,
    setCurrentPage,
  } = useBooking();

  const { hotel: authHotel } = useAuth();
  const { bookings, maxbookings } = BookingData || {};

  const [maxPages, setMaxPages] = useState(0);

  const [bulkSelectItems, setBulkSelectItems] = useState<Cabin[] | Booking[]>(
    []
  );

  const [searchParams] = useSearchParams();

  const [destroyBulk, setDestroyBulk] = useState(false);

  const { DeleteBooking, isDeleteBookingLoading } = useDeleteBooking();

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [searchParams, setSearch]);

  useEffect(() => {
    if (maxbookings == undefined) return;
    setMaxPages(Math.ceil((maxbookings || 0) / (pageLimit.value as number)));
  }, [maxbookings, pageLimit]);

  function handlePageClick({ selected }: { selected: number }) {
    setCurrentPage(selected + 1);
  }

  function onMultiDelete() {
    if (!bulkSelectItems.length) return;
    bulkSelectItems.forEach((booking) => {
      if (!booking._id) return;
      DeleteBooking(
        { hotelId: authHotel?.id as string, bookingId: booking._id },
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

  return (
    <div>
      <Flex mb={Spacing.s16}>
        <EasyFilter
          selectedFilter={simpleFilter}
          setSelectedFilter={setSimpleFilter}
          filterObject={esayFilters}
        />

        <div style={{ marginLeft: "auto" }}>
          <Search
            placeholder="Search Booking..."
            search={search}
            setSearch={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />
        </div>

        <Sort
          sortOptions={sortOptions}
          selected={sort}
          onSelected={(sort) => setSort(sort)}
        />
      </Flex>

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
          minHeight={Length.L44}
        >
          <Container width={Length.Full}>
            <Table>
              <TableHead>
                <TableRow>
                  <Th>
                    <CheckBox size={18} gap={Spacing.s48}>
                      <label htmlFor={"bookings"}>
                        <input
                          type="checkbox"
                          id={"bookings"}
                          name={"bookings"}
                          checked={bulkSelectItems.length === bookings?.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setDestroyBulk(false);
                              setBulkSelectItems(bookings!);
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
                  <Th>Guest</Th>
                  <Th>Dates</Th>
                  <Th>Status</Th>
                  <Th>Payment</Th>
                  <Th>Amount</Th>
                  <Th></Th>
                </TableRow>
              </TableHead>
              <TableBody>
                {isBookingLoading &&
                  new Array((pageLimit.value as number) + 3)
                    .fill(0)
                    .map((_, index) => <TableShimmer key={index} />)}

                {!isBookingLoading &&
                  bookings &&
                  bookings?.length > 0 &&
                  bookings?.map((booking) => (
                    <BookingRow
                      key={booking._id}
                      booking={booking}
                      setBulkSelectItems={setBulkSelectItems}
                      setDestroyBulk={setDestroyBulk}
                      bulkSelectItems={bulkSelectItems}
                    />
                  ))}
              </TableBody>
            </Table>
            {!isBookingLoading && bookings?.length === 0 && (
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
        </Flex>
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
        {bulkSelectItems.length > 0 && (
          <BulkBox onDestroy={destroyBulk}>
            <BulkSelect
              bulkSelectItems={bulkSelectItems}
              setBulkSelectItems={setBulkSelectItems}
              setDestroyBulk={setDestroyBulk}
            >
              <Modal>
                <Modal.Open open="delete room">
                  <Container padding={[Spacing.zero, Spacing.s24]}>
                    <Button
                      buttonType={ButtonType.Default}
                      disabled={isDeleteBookingLoading}
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
                    disabled={isDeleteBookingLoading}
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
    </div>
  );
}

export default BookingTable;
