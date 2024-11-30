import { Color, Font, Spacing } from "../ui/cssConstants";
import DashboardCard from "../ui/DashboardCard";
import Flex, { FlexAlign, FlexJustify } from "../ui/Flex";
import EasyFilter from "../ui/Filters/EasyFilter";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  Booking,
  BookingStatus,
  getBookingWithGivenDate,
  PaymentStatus,
} from "../services/BookingApi";
import { useAuth } from "../features/Authentication/AuthProvider";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdAutoGraph, MdOutlineBookmarkBorder } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import SalesChart from "../ui/SalesChart";
import Container, { Length } from "../ui/Container";
import { format, subDays } from "date-fns";
import Text, { FontWeight } from "../ui/Text";
import StayChart from "../ui/StayChart";
import Grid from "../ui/Grid";
import Positioned from "../ui/Positioned";
import TodaysActivityBooking from "../ui/TodaysActivityBooking";
import styled from "styled-components";
import { ShimmerDiv } from "shimmer-effects-react";

const fiterObjects = [
  {
    label: "last 7 days",
    value: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    day: 7,
  },
  {
    label: "last 30 days",
    value: new Date(
      new Date().setDate(new Date().getDate() - 30)
    ).toISOString(),
    day: 30,
  },
  {
    label: "last 90 days",
    value: new Date(
      new Date().setDate(new Date().getDate() - 90)
    ).toISOString(),
    day: 90,
  },
];

type ShimmerProps = {
  height: number;
  width: number;
  mb?: string;
  br?: string;
};
const StyledShimmerBox = styled(ShimmerDiv)<ShimmerProps>`
  margin-bottom: ${(props) => props.mb};
  border-radius: ${(props) => props.br};
  .custom-shimmer {
    background: linear-gradient(
      90deg,
      var(--color-grey-100),
      var(--color-grey-200)
    );
  }
`;

function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState<{
    label: string;
    value: string;
    day?: number;
  }>(fiterObjects[0]);
  const { hotel } = useAuth();

  const hotelId = hotel?.id || "";

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["dashboard", selectedFilter.value],
    queryFn: () => getBookingWithGivenDate(hotelId, selectedFilter.value),
    keepPreviousData: true,
  });

  const totalBookings = bookings?.length || 0;

  const totalSales = bookings?.reduce((acc: number, booking: Booking) => {
    if (booking.paymentStatus === PaymentStatus.PAID) {
      return acc + booking.totalPrice;
    }
    return acc;
  }, 0);

  const checkins = bookings?.reduce((acc: number, booking: Booking) => {
    if (booking.status === BookingStatus.CHECKIN) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const occupancy = (checkins! / totalBookings) * 100;

  return (
    <Container>
      <Flex
        mb={Spacing.s24}
        align={FlexAlign.Center}
        justify={FlexJustify.SpaceBetween}
      >
        <Text fontWeight={FontWeight.Medium} fontSize={Font.fs24}>
          Dashboard
        </Text>
        <EasyFilter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterObject={fiterObjects}
        />
      </Flex>
      <Grid columns={4}>
        {/* <Flex
          style={{ gridColumn: "1 / 5", gridRow: "1" }}
          justify={FlexJustify.SpaceBetween}
        > */}
        <DashboardCard
          backgroundColor={Color.blue100}
          icon={<MdOutlineBookmarkBorder />}
          color={Color.blue700}
          label="Bookings"
          value={totalBookings.toString()}
          isLoading={isLoading}
        />
        <DashboardCard
          backgroundColor={Color.indigo100}
          icon={<AiOutlineMoneyCollect />}
          color={Color.indigo700}
          label="Sales"
          value={"$" + totalSales?.toFixed(2) || "0"}
          isLoading={isLoading}
        />
        <DashboardCard
          icon={<IoMdCheckmarkCircleOutline />}
          color={Color.green700}
          backgroundColor={Color.green100}
          label="check ins"
          value={checkins?.toString() || "0"}
          isLoading={isLoading}
        />

        <DashboardCard
          icon={<MdAutoGraph />}
          backgroundColor={Color.red100}
          color={Color.red700}
          label="occupancy rate"
          value={occupancy.toFixed(2) + "%"}
          isLoading={isLoading}
        />
        {/* </Flex> */}
        <Container
          bg={Color.grey50}
          padding={[Spacing.s8, Spacing.s24, Spacing.zero, Spacing.s24]}
          width={Length.Full}
          style={{ gridColumn: "1/3" }}
          borderRadius={Spacing.s8}
        >
          <TodaysActivityBooking />
        </Container>
        {isLoading ? (
          <div style={{ gridColumn: "3/5" }}>
            <StyledShimmerBox
              className="custom-shimmer"
              height={240}
              width={578}
              br={Spacing.s8}
            />
          </div>
        ) : (
          <Container
            height={Length.L24}
            padding={[Spacing.s8, Spacing.zero, Spacing.zero, Spacing.s24]}
            bg={Color.grey50}
            style={{ gridColumn: "3/5" }}
            width={Length.Full}
            borderRadius={Spacing.s8}
          >
            <Positioned>
              <Text fontWeight={FontWeight.Medium} fontSize={Font.fs16}>
                Stay Duration Summary
              </Text>
            </Positioned>

            <StayChart bookings={bookings!} />
          </Container>
        )}
        {isLoading ? (
          <div style={{ gridColumn: "1 / span 4", gridRow: "3 / span 1" }}>
            <StyledShimmerBox
              height={230}
              width={1172}
              className="custom-shimmer"
              br={Spacing.s8}
            />
          </div>
        ) : (
          <Container
            padding={[Spacing.s8, Spacing.zero, Spacing.s32, Spacing.s24]}
            height={Length.L24}
            style={{ gridColumn: "1 / span 4", gridRow: "3 / span 1" }}
            width={Length.Full}
            borderRadius={Spacing.s8}
            bg={Color.grey50}
          >
            <Text
              fontWeight={FontWeight.Medium}
              mB={Spacing.s8}
              fontSize={Font.fs16}
            >
              Sales from{" "}
              {format(subDays(new Date(), selectedFilter.day!), "MMM dd yyyy")}
              &mdash;
              {format(new Date(), "MMM dd yyyy")}
            </Text>

            <SalesChart days={selectedFilter.day!} bookings={bookings!} />
          </Container>
        )}
      </Grid>
    </Container>
  );
}

export default Dashboard;
