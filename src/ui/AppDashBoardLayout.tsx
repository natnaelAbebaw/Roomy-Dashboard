import styled, { css } from "styled-components";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { wrapGrid } from "animate-css-grid";

const StyledAppDashBoardLayout = styled.div<{ expaned: boolean }>`
  background-color: "#333333";
  display: grid;
  grid-template-columns: 240px 1fr;
  transition: all 0.5s;
  ${({ expaned }) =>
    !expaned &&
    css`
      grid-template-columns: 80px 1fr;
    `}
  grid-template-rows: 80px 1fr;
`;

const Main = styled.div`
  padding: 1rem 4rem 2rem;
  overflow-y: auto;
  height: 90vh;
`;

function AppDashBoardLayout() {
  const gridRef = useRef(null);
  const [expand, setExpaned] = useState(true);
  useEffect(() => {
    // Initialize the grid animation with animate-css-grid
    if (gridRef.current) {
      wrapGrid(gridRef.current, {
        duration: 500,
        easing: "easeInOut",
        stagger: 50,
      });
    }
  }, []);

  return (
    <StyledAppDashBoardLayout expaned={expand} ref={gridRef}>
      <TopBar />
      <SideBar expand={expand} setExpaned={setExpaned} />
      <Main>
        <Outlet />
      </Main>
    </StyledAppDashBoardLayout>
  );
}

export default AppDashBoardLayout;
