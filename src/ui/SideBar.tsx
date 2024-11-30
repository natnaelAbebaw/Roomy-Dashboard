import styled, { css } from "styled-components";
import Flex, { FlexAlign, FlexDirection, FlexJustify } from "./Flex";

import { Color, Font, Spacing } from "./cssConstants";

import { PiDoor, PiPlusSquare } from "react-icons/pi";
import { LiaUserTagSolid } from "react-icons/lia";
import { IoBookmarkOutline, IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import Container, { Position } from "./Container";
import { CiLogin, CiLogout } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

import { MdOutlineBorderStyle, MdOutlineSensorDoor } from "react-icons/md";
import Text, { FontWeight, TextTransform } from "./Text";

type IStyledSidebar = {
  expand: boolean;
};

const StyledSideBar = styled(Container)<IStyledSidebar>`
  width: 100%;
  height: 96vh;
  border: 1px solid var(--color-grey-200);
  clip-path: inset(0 0 0 0);
  background-color: ${Color.grey50};
  overflow: hidden;
  transition: all 0.2s;
  grid-row: 1 / -1;
  grid-column: 1 / 2;
  border-radius: 8px;
  margin: 1.6rem;
  svg {
    /* font-size: 2.4rem;/ */
  }

  .text {
    transition: all 0.2s;
  }

  ${({ expand }) =>
    !expand &&
    css`
      /* width: 8rem; */
      .tab {
        /* justify-content: center; */
        transition: all 0.5s;
        padding-inline: 3rem;
        border-radius: 0;
      }

      .brand {
        padding-inline: 2.5rem;
        /* justify-content: center; */
        /* width: 100%; */
      }
    `}
`;

const StyledFlex = styled(Flex)`
  font-size: 2.4rem;
  font-weight: 700;
  align-items: center;
  color: var(--color-brand-700);
  font-family: "Quicksand", sans-serif;
  padding: 3rem 1rem 4rem;
  gap: 5px;

  &:hover + div {
    visibility: visible;
  }
`;

type TabsProps = {
  active?: boolean;
};
const Tab = styled(Link)<TabsProps>`
  display: flex;
  font-size: 1.6rem;
  gap: 1rem;
  padding: 8px 1.6rem;
  color: var(--color-grey-700);
  border-radius: 0.5rem;
  text-transform: capitalize;
  cursor: pointer;
  width: 20.7rem;
  align-items: center;
  text-align: left;
  align-items: flex-start;
  transition: all 0.5s;
  svg {
    transform: translateY(2.5px);
  }

  &:hover {
    background-color: var(--color-brand-50);
    & svg {
      color: var(--color-brand-700);
    }
    color: var(--color-grey-700);
  }

  ${({ active }) =>
    active &&
    css`
      background-color: var(--color-brand-50);
      & svg {
        color: var(--color-brand-700);
      }
      color: var(--color-grey-700);
    `}/* width: 100%; */
  /* align-items: center; */
`;

const ExpandBtn = styled.div<IStyledSidebar>`
  display: flex;
  transform: translateY(-5px);
  cursor: pointer;
  background-color: ${Color.grey50};
  ${({ expand }) =>
    expand
      ? css``
      : css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          visibility: hidden;
          padding: 2rem;
          &:hover {
            visibility: visible;
            svg {
              color: var(--color-brand-700);
            }
          }
        `}

  svg:hover {
    color: var(--color-brand-700);
  }
`;

enum Tabs {
  Dashboard = "dashboard",
  rooms = "rooms",
  bookings = "bookings",
  users = "users",
  reviews = "reviews",
  setting = "settings",
}
const tabs = [
  {
    name: Tabs.Dashboard,
    path: "",
    icon: <MdOutlineBorderStyle fontSize={Font.fs20} />,
  },
  {
    name: Tabs.bookings,
    path: Tabs.bookings,
    icon: <PiPlusSquare fontSize={Font.fs20} />,
  },
  {
    name: Tabs.rooms,
    path: Tabs.rooms,
    icon: <PiDoor fontSize={Font.fs20} />,
  },
  {
    name: Tabs.users,
    path: Tabs.users,
    icon: <LiaUserTagSolid fontSize={Font.fs20} />,
  },
  {
    name: Tabs.reviews,
    path: Tabs.reviews,
    icon: <IoBookmarkOutline fontSize={Font.fs20} />,
  },
  {
    name: Tabs.setting,
    path: Tabs.setting,
    icon: <IoSettingsOutline fontSize={Font.fs20} />,
  },
];

function SideBar({
  expand,
  setExpaned,
}: {
  expand: boolean;
  setExpaned: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const params = useLocation();

  const path = params.pathname.split("/")[2];
  console.log(path);
  const [selectedTab, setSelectedTab] = useState<Tabs>(
    (path as Tabs) || Tabs.Dashboard
  );

  return (
    <StyledSideBar
      expand={expand}
      padding={[
        Spacing.zero,
        expand ? Spacing.s16 : Spacing.zero,
        Spacing.zero,
        expand ? Spacing.s16 : Spacing.zero,
      ]}
    >
      <Container position={Position.relative}>
        <Flex align={FlexAlign.Center} justify={FlexJustify.SpaceBetween}>
          <StyledFlex className="brand">
            <MdOutlineSensorDoor fontSize={Font.fs30} />

            {expand ? <span>Roomy</span> : <span>&nbsp;</span>}
          </StyledFlex>

          <ExpandBtn expand={expand} onClick={() => setExpaned((s) => !s)}>
            {expand ? (
              <CiLogout fontSize={Font.fs20} />
            ) : (
              <CiLogin fontSize={Font.fs20} />
            )}
          </ExpandBtn>
        </Flex>
      </Container>

      <Flex direction={FlexDirection.Column} gap={Spacing.s2}>
        {tabs.map((tab) => (
          <Tab
            to={tab.path}
            active={tab.name === selectedTab}
            className="tab"
            onClick={() => setSelectedTab(tab.name)}
          >
            {tab.icon}
            {/* <Text className="text">{tab.name}</Text> */}
            {expand ? (
              <Text
                fontWeight={FontWeight.Medium100}
                textTransform={TextTransform.Capitalize}
              >
                {tab.name}
              </Text>
            ) : (
              <span>&nbsp;</span>
            )}
          </Tab>
        ))}
      </Flex>
    </StyledSideBar>
  );
}

export default SideBar;
