import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import styled, { css } from "styled-components";
import { useClickOutside } from "../CustomHooks/useClickOutside";
import { Color, Spacing } from "./cssConstants";
import { Length } from "./Container";

const StyledPopup = styled.div`
  position: relative;
`;

type popupProps = {
  left?: Spacing | Length;
  top?: Spacing | Length;
  bottom?: Spacing | Length;
  right?: Spacing;
  width?: Spacing | Length;
  bg?: Color;
  minWidth?: Spacing | Length;
};

type PopupBoxProps = React.ComponentPropsWithRef<"div"> & {
  left?: string;
  top?: string;
  portal?: boolean;
  options?: popupProps;
};

const PopupBox = styled.div<PopupBoxProps>`
  ${({ portal }) =>
    portal
      ? css<PopupBoxProps>`
          position: fixed;
          bottom: calc(100vh - ${({ top }) => top});
          left: ${({ left }) => left};
        `
      : css<PopupBoxProps>`
          position: absolute;
          bottom: ${({ options }) => options?.bottom};
          left: ${({ options }) => options?.left};
          right: ${({ options }) => options?.right};
          /* top: ${({ options }) => options?.top}; */
        `}
  width:${({ options }) => options?.width || "max-content"};
  z-index: 1000;
  animation: popupAnimation 0.2s ease-in;
  /* min-height: 15rem; */
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  background-color: ${({ options }) => options?.bg || "var(--color-grey-0)"};
  min-width: ${({ options }) => options?.minWidth || "20rem"};
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid var(--color-grey-100);
  /* right: ${({ options }) => options?.right}; */
  /* left: ${({ options }) => options?.left}; */
  /* bottom: ${({ options }) => options?.bottom}; */ /* top: 120%; */
  @keyframes popupAnimation {
    0% {
      /* top: ${({ options }) => options?.top && "0"};
      bottom: ${({ options }) => options?.bottom && "0"}; */
      top: 170%;
    }

    100% {
      /* bottom: ${({ options }) => options?.bottom};
      top: ${({ options }) => options?.top}; */
      top: 100%;
    }
  }
`;

export const PopupContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>> | null;
  popupOpenRef: React.RefObject<HTMLDivElement> | null;
  popupWindowRef: React.RefObject<HTMLDivElement> | null;
  portal: boolean;
}>({
  open: false,
  setOpen: null,
  popupWindowRef: null,
  popupOpenRef: null,
  portal: false,
});

function Popup({
  children,
  portal = false,
}: {
  children: React.ReactNode;
  portal?: boolean;
}) {
  const popupOpenRef = useRef<HTMLDivElement>(null);
  const {
    clickState: open,
    setClickState,
    ref: popupWindowRef,
  } = useClickOutside<HTMLDivElement>(true);

  return (
    <PopupContext.Provider
      value={{
        open,
        setOpen: setClickState,
        popupOpenRef,
        popupWindowRef,
        portal,
      }}
    >
      <StyledPopup>{children}</StyledPopup>
    </PopupContext.Provider>
  );
}

function Window({
  children,
  options,
}: {
  children: React.ReactElement;
  options?: popupProps;
}) {
  const { open, popupWindowRef, popupOpenRef, portal } =
    useContext(PopupContext);
  const [left, setLeft] = useState<number>(
    popupOpenRef?.current?.getBoundingClientRect().left || 0
  );
  const [top, setTop] = useState<number>(
    popupOpenRef?.current?.getBoundingClientRect().top || 0
  );

  useEffect(() => {
    if (!portal) return;
    function setPosition() {
      console.log(popupOpenRef?.current?.getBoundingClientRect());
      setLeft(popupOpenRef?.current?.getBoundingClientRect().left || 0);
      setTop(
        popupOpenRef?.current?.getBoundingClientRect().top || 0 + window.scrollY
      );
    }

    window.addEventListener("scroll", () => {
      setPosition();
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setPosition();
      });
    };
  }, [popupOpenRef, portal]);

  return portal
    ? createPortal(
        open && (
          <PopupBox
            left={`${left}px`}
            top={`${top}px`}
            ref={popupWindowRef}
            portal={portal}
          >
            {cloneElement(children)}
          </PopupBox>
        ),
        document.body
      )
    : open && (
        <PopupBox ref={popupWindowRef} options={options} portal={portal}>
          {cloneElement(children)}
        </PopupBox>
      );
}

function Open({ children }: { children: React.ReactElement }) {
  const { setOpen, popupOpenRef } = useContext(PopupContext);
  return cloneElement(children, {
    onClick: () => setOpen?.(true),
    ref: popupOpenRef,
  });
}

Popup.Window = Window;
Popup.Open = Open;

export const usePopup = () => useContext(PopupContext);

export default Popup;
