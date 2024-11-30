import BookingDetail from "../features/Booking/BookingDetail";
import { useTodaysBooking } from "../features/Booking/useTodaysBookings";
import { Booking, BookingStatus, PaymentStatus } from "../services/BookingApi";
import Button from "./Button";
import Container, { Length, Overflow } from "./Container";
import { Color, Font, Spacing } from "./cssConstants";
import Flex, { FlexDirection } from "./Flex";
import Grid from "./Grid";
import Heading from "./Heading";
import Modal, { PlacedModel } from "./Modal";
import Text, { FontWeight, TextAlign, TextTransform } from "./Text";
import { useUpdateBooking } from "../features/Booking/useUpdateBooking";
import { ShimmerDiv } from "shimmer-effects-react";
import styled from "styled-components";

type ShimmerProps = {
  height: number;
  width: number;
  mb?: string;
  br?: string;
};
const StyledShimmerBox = styled(ShimmerDiv)<ShimmerProps>`
  margin-bottom: ${(props) => props.mb};
  border-radius: ${(props) => props.br};
`;

function TodaysActivityBooking() {
  const { BookingData, isBookingLoading } = useTodaysBooking();
  const { UpdateBooking, isUpdateBookingLoading } = useUpdateBooking();

  function handleCheckin(booking: Booking) {
    UpdateBooking({
      bookingId: booking._id,
      hotelId: "6617a3dac51520bf4181ba50",
      updatedData: {
        status: BookingStatus.CHECKIN,
        paymentStatus: PaymentStatus.PAID,
      },
    });
  }

  function handleCheckout(booking: Booking) {
    UpdateBooking({
      bookingId: booking._id,
      hotelId: "6617a3dac51520bf4181ba50",
      updatedData: {
        status: BookingStatus.CHECKEDOUT,
      },
    });
  }

  if (isBookingLoading) {
    return (
      <StyledShimmerBox
        className="custom-shimmer"
        height={220}
        width={530}
        br={Spacing.s6}
      />
    );
  }

  const todaysBookings = BookingData?.sort((a, b) => b.numNights - a.numNights);

  return (
    <div>
      <Heading>Today's Activity</Heading>
      <Container
        padding={[Spacing.zero, Spacing.s24, Spacing.zero, Spacing.zero]}
        height={Length.L16}
        overflow={Overflow.Auto}
      >
        <Flex gap={Spacing.zero} direction={FlexDirection.Column}>
          {todaysBookings!.map((booking) => (
            <Container
              padding={[Spacing.s8, Spacing.zero]}
              bT={Spacing.s1}
              width={Length.Full}
              borderColor={Color.grey200}
            >
              <Grid columns={"1fr 2fr 1fr 1.2fr"}>
                <Container
                  borderRadius={Spacing.s8}
                  padding={[Spacing.s2, Spacing.s8]}
                  bg={
                    booking.status == BookingStatus.UNCONFIRMED
                      ? Color.green100
                      : Color.blue100
                  }
                >
                  <Text
                    color={
                      booking.status == BookingStatus.UNCONFIRMED
                        ? Color.green700
                        : Color.blue700
                    }
                    fontSize={Font.fs12}
                    textTransform={TextTransform.Uppercase}
                    textAlign={TextAlign.Center}
                  >
                    {booking.status == BookingStatus.UNCONFIRMED
                      ? "arriving"
                      : "departing"}
                  </Text>
                </Container>

                <Text
                  fontSize={Font.fs14}
                  fontWeight={FontWeight.Medium}
                  textTransform={TextTransform.Capitalize}
                >
                  {booking.guest.fullName}
                </Text>
                <Text fontSize={Font.fs14} color={Color.grey500}>
                  {booking.numNights} nights
                </Text>
                {booking.status === BookingStatus.UNCONFIRMED ? (
                  booking.paymentStatus === PaymentStatus.PAID ? (
                    <Button
                      backgroundColor={Color.brand600}
                      padding={[Spacing.s1, Spacing.s16]}
                      onClick={() => handleCheckin(booking)}
                      disabled={isUpdateBookingLoading}
                    >
                      <Text
                        textAlign={TextAlign.Center}
                        fontSize={Font.fs12}
                        color={Color.brand100}
                        textTransform={TextTransform.Uppercase}
                      >
                        Check in
                      </Text>
                    </Button>
                  ) : (
                    <Modal>
                      <Modal.Open open="New Room">
                        <Button
                          backgroundColor={Color.brand600}
                          padding={[Spacing.s1, Spacing.s16]}
                        >
                          <Text
                            textAlign={TextAlign.Center}
                            fontSize={Font.fs12}
                            color={Color.brand100}
                            textTransform={TextTransform.Uppercase}
                          >
                            Check in
                          </Text>
                        </Button>
                      </Modal.Open>
                      <Modal.Window
                        name="New Room"
                        width="50%"
                        placed={PlacedModel.end}
                        height={Length.Vh100}
                      >
                        <BookingDetail booking={booking} />
                      </Modal.Window>
                    </Modal>
                  )
                ) : (
                  ""
                )}
                {booking.status === BookingStatus.CHECKIN && (
                  <Button
                    padding={[Spacing.s1, Spacing.s16]}
                    onClick={() => handleCheckout(booking)}
                    disabled={isUpdateBookingLoading}
                    backgroundColor={Color.brand600}
                  >
                    <Text
                      textAlign={TextAlign.Center}
                      fontSize={Font.fs12}
                      color={Color.brand100}
                      textTransform={TextTransform.Uppercase}
                    >
                      Check out
                    </Text>
                  </Button>
                )}
              </Grid>
            </Container>
          ))}
        </Flex>
      </Container>
    </div>
  );
}

export default TodaysActivityBooking;
