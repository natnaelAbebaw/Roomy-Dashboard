import styled from "styled-components";
import Input from "./Input";
import { Color, Font, Spacing } from "./cssConstants";
import Flex, { FlexAlign, FlexDirection, FlexJustify } from "./Flex";
import { CiDark, CiLight } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";
import Positioned from "./Positioned";
import Container, { Length, Overflow, Position } from "./Container";
import Image from "./Image";
import Text from "./Text";
import { FaAngleDown } from "react-icons/fa";
import Popup from "./Popup";
import Button, { ButtonType } from "./Button";
import { MdOutlineLogout } from "react-icons/md";
import { useAuth } from "../features/Authentication/AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const StyledTopBar = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / -1;
  background-color: ${Color.grey0};
  padding: 2rem 4rem;
`;

function TopBar() {
  const { darkMode, toogleDarkMode, hotelAccount, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  console.log("hotelAccount", hotelAccount);

  useEffect(() => {
    if (search) {
      navigate("/dashboard/Bookings");
      searchParams.set("search", search);
      setSearchParams(searchParams);
    }
  }, [search, searchParams, setSearchParams, navigate]);
  return (
    <StyledTopBar>
      <Flex align={FlexAlign.Center} justify={FlexJustify.SpaceBetween}>
        <Container width={Length.L44} position={Position.relative}>
          <form>
            <Input
              padding={[Spacing.s12, Spacing.s48]}
              borderRadius={Spacing.s8}
              bg={Color.grey50}
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Positioned
              top={Spacing["s1/2"]}
              left={Spacing.s16}
              transform={[Spacing.zero, Length["L-1/2"]]}
            >
              <LuSearch fontSize={Font.fs18} color={Color.grey500} />
            </Positioned>
          </form>
        </Container>

        <Flex>
          {darkMode ? (
            <Container
              height={"36px"}
              width={"36px"}
              border={Spacing.s1}
              borderRadius={Spacing["s1/2"]}
              position={Position.relative}
              onClick={() => toogleDarkMode(darkMode!)}
            >
              <Positioned
                top={Spacing["s1/2"]}
                left={Spacing["s1/2"]}
                transform={[Length["L-1/2"], Length["L-1/2"]]}
              >
                <CiLight fontSize={Font.fs18} />
              </Positioned>
            </Container>
          ) : (
            <Container
              height={"36px"}
              width={"36px"}
              border={Spacing.s1}
              borderRadius={Spacing["s1/2"]}
              borderColor={Color.grey300}
              position={Position.relative}
              onClick={() => toogleDarkMode(darkMode!)}
            >
              <Positioned
                top={Spacing["s1/2"]}
                left={Spacing["s1/2"]}
                transform={[Length["L-1/2"], Length["L-1/2"]]}
              >
                <CiDark fontSize={Font.fs18} />
              </Positioned>
            </Container>
          )}

          <Container
            height={"36px"}
            width={"36px"}
            border={Spacing.s1}
            borderRadius={Spacing["s1/2"]}
            position={Position.relative}
            overflow={Overflow.Hidden}
          >
            <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </Container>
          <Popup>
            <Popup.Open>
              <Flex>
                <Flex gap={Spacing.zero} direction={FlexDirection.Column}>
                  <Text fontSize={Font.fs14}>{hotelAccount?.userName}</Text>
                  <Text color={Color.grey500} fontSize={Font.fs12}>
                    Admin
                  </Text>
                </Flex>
                <FaAngleDown
                  style={{ transform: "translateY(5px)" }}
                  color={Color.grey500}
                />
              </Flex>
            </Popup.Open>

            <Popup.Window
              options={{ minWidth: Length.L8, left: Length["L-1/2"] }}
            >
              <Container>
                <Flex gap={Spacing.s2} direction={FlexDirection.Column}>
                  <Button
                    padding={[Spacing.s8, Spacing.s12]}
                    width={Length.Full}
                    buttonType={ButtonType.Default}
                    onClick={logout}
                  >
                    <Flex align={FlexAlign.Center}>
                      <MdOutlineLogout />
                      <Text>Log out</Text>
                    </Flex>
                  </Button>
                </Flex>
              </Container>
            </Popup.Window>
          </Popup>
        </Flex>
      </Flex>
    </StyledTopBar>
  );
}

export default TopBar;
