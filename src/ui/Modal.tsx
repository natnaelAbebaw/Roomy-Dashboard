import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

import styled, { css } from "styled-components";
import { Color, Spacing } from "./cssConstants";
import { IoMdClose } from "react-icons/io";
import { Length } from "./Container";

type StyledWindowProps = {
  maxWdith?: string | Length;
  maxHeight?: string | Length;
  padding?: (Spacing | string)[];
  height?: string | Length;
  width?: string | Length;
  placed?: PlacedModel;
};

export enum PlacedModel {
  Center = "center",
  end = "end",
}

const StyledWindow = styled.div<StyledWindowProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  width: min(${({ maxWdith }) => maxWdith}, 100%);
  z-index: 3000;
  transform: translate(-50%, -50%);
  overflow: hidden;
  background-color: ${Color.grey0};
  border-radius: 1rem;
  padding: ${({ padding }) => padding?.map((space) => space).join(" ")};
  max-height: ${({ maxHeight }) => maxHeight};
  height: ${({ height }) => height};

  ${({ placed }) =>
    placed === PlacedModel.end &&
    css`
      top: 0;
      right: 0;
      transform: none;
      max-height: 100%;
      height: 100%;
      border-radius: 0;
    `}
  & > svg:first-child {
    position: absolute;
    top: 2rem;
    transform: translateY(-50%);
    left: 3rem;
    cursor: pointer;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 3000;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
`;

export const ModelContext = createContext<{
  open: string;
  setOpen: React.Dispatch<React.SetStateAction<string>> | null;
}>({ open: "", setOpen: null });

function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState("");
  return (
    <ModelContext.Provider value={{ open, setOpen }}>
      {children}
    </ModelContext.Provider>
  );
}
function Window({
  children,
  name,
  maxHeight = Length.L64,
  maxWdith = Length.L80,
  padding = ["4rem", Spacing.zero],
  height,
  width,
  placed,
}: {
  children: React.ReactElement;
  name: string;
  maxHeight?: string | Length;
  maxWdith?: string | Length;
  height?: string | Length;
  width?: string | Length;
  padding?: (Spacing | string)[];
  placed?: PlacedModel;
}) {
  const { open, setOpen } = useContext(ModelContext);
  return createPortal(
    open === name && (
      <div>
        <Overlay onClick={() => setOpen?.("")} />
        <StyledWindow
          padding={padding}
          maxHeight={maxHeight}
          maxWdith={maxWdith}
          height={height}
          width={width}
          placed={placed}
          className="modal"
        >
          <IoMdClose onClick={() => setOpen?.("")} />
          {cloneElement(children, { close: () => setOpen?.("") })}
        </StyledWindow>
      </div>
    ),
    document.body
  );
}

function Open({
  children,
  open,
}: {
  children: React.ReactElement;
  open: string;
}) {
  const { setOpen } = useContext(ModelContext);
  return cloneElement(children, { onClick: () => setOpen?.(open) });
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
