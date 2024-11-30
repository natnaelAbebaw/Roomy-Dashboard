import { ShimmerDiv } from "shimmer-effects-react";
import Container from "./Container";
import Flex, { FlexAlign, FlexDirection, FlexJustify } from "./Flex";
import Text, { FontWeight, TextTransform } from "./Text";
import { Color, Font, Spacing } from "./cssConstants";
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

function DashboardCard({
  color,
  backgroundColor,
  icon,
  label,
  value,
  isLoading,
}: {
  color: Color;
  backgroundColor: Color;
  icon: React.ReactNode;
  label: string;
  value: string;
  isLoading?: boolean;
}) {
  return (
    <Container
      // border={Spacing.s1}
      padding={[Spacing.s12, Spacing.s16]}
      borderColor={Color.grey200}
      bg={Color.grey50}
      borderRadius={Spacing.s12}
      style={{
        flexGrow: 1,
      }}
    >
      <Flex align={FlexAlign.Center}>
        <Container
          borderRadius={Spacing["s1/2"]}
          padding={[Spacing.s8]}
          bg={backgroundColor}
          height={Spacing.s48}
          width={Spacing.s48}
        >
          <Flex justify={FlexJustify.Center} align={FlexAlign.Center}>
            <Text color={color} mB={Spacing.zero} fontSize={Font.fs24}>
              {icon}
            </Text>
          </Flex>
        </Container>
        <Container>
          <Flex direction={FlexDirection.Column} gap={Spacing.s1}>
            <Text
              fontSize={Font.fs14}
              textTransform={TextTransform.Uppercase}
              color={Color.grey600}
              fontWeight={FontWeight.Medium}
            >
              {label}
            </Text>
            {isLoading ? (
              <StyledShimmerBox
                className="custom-shimmer"
                width={70}
                height={20}
                br={Spacing.s6}
              />
            ) : (
              <Text fontSize={Font.fs18} fontWeight={FontWeight.Bold}>
                {value}
              </Text>
            )}
          </Flex>
        </Container>
      </Flex>
    </Container>
  );
}

export default DashboardCard;
