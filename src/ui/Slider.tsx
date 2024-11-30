import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Color, Font } from "./cssConstants";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type TagLimitProps = {
  maxwidth: string;
};

const TagLimit = styled.div<TagLimitProps>`
  width: min(${({ maxwidth }) => maxwidth}, 100%);
  position: relative;
  overflow-x: clip;
  display: flex;
  align-items: center;
`;

type SlideBoxProps = {
  maxwidth?: string;
  IconsFont?: Font;
};

const SliderBox = styled.div<SlideBoxProps>`
  width: min(${({ maxwidth }) => maxwidth}, 100%);
  position: relative;
  & > .iconBox {
    z-index: 100;
    position: absolute;
    top: 50%;
    height: 100%;
    width: 5rem;
    transform: translateY(-50%);
  }
  & > .iconBox:first-child {
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    .icon {
      left: 0;
    }

    ${({ IconsFont }) =>
      IconsFont &&
      css`
        & .icon {
          left: -2rem;
        }
      `}
  }
  & > .iconBox:last-child {
    right: 0;
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    .icon {
      right: 0;
    }
    ${({ IconsFont }) =>
      IconsFont &&
      css`
        & .icon {
          right: -2rem;
        }
      `}
  }

  & .icon {
    cursor: pointer;
    transition: all 0.3s;
    background-color: ${Color.grey0};
    border-radius: 50%;
    font-size: ${({ IconsFont }) => IconsFont};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid ${Color.grey300};
    padding: ${({ maxwidth }) => (maxwidth === "100%" ? "8px" : "4px")};
    color: ${Color.grey500};
    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.1);
    &:hover {
      box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.2);
      transform: translateY(-50%) scale(1.1);
    }
    &:active {
      transform: translateY(-50%) scale(0.9);
    }
  }
`;

type SlidersProps = {
  translatewidth: number;
};
const Sliders = styled.div<SlidersProps>`
  display: flex;
  gap: 3rem;
  width: max-content;
  align-items: center;
  transform: translateX(calc(-${(props) => props.translatewidth}px));
  transition: transform 0.8s ease-in-out;
`;

type sliderProps = {
  children: JSX.Element[] | undefined;
  maxWidth?: string;
  IconsFont?: Font;
  isLoading?: boolean;
};
function Slider({
  children,
  maxWidth = "80rem",
  IconsFont,
  isLoading,
}: sliderProps) {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const slidersRef = useRef<HTMLDivElement>(null);
  const slidersLimitRef = useRef<HTMLDivElement>(null);
  const [translateWidth, setTranslateWidth] = useState(0);
  const [toRight, setToRight] = useState(true);
  useEffect(() => {
    const sliders = slidersRef.current;
    const slidersLimit = slidersLimitRef.current;
    if (!sliders || !slidersLimit) return;
    const slidersWidth = sliders.clientWidth;
    const slidersLimitWidth = slidersLimit.offsetWidth * 0.3;
    let w = slidersWidth;
    let maxpage = 0;
    while (w > slidersLimit.offsetWidth) {
      maxpage++;
      w = w - slidersLimitWidth;
    }
    setMaxPage(++maxpage);

    if (
      slidersWidth - (page - 1) * slidersLimitWidth >
      slidersLimit.offsetWidth
    ) {
      if (toRight) {
        setTranslateWidth(slidersLimitWidth * (page - 1));
      } else {
        const maxT =
          slidersLimitWidth * (maxPage - 2) +
          (slidersWidth - (maxPage - 1) * slidersLimitWidth) -
          (slidersLimit.offsetWidth - slidersLimitWidth);
        setTranslateWidth(maxT - slidersLimitWidth * (maxPage - page));
      }
    } else {
      setTranslateWidth(
        slidersLimitWidth * (page - 2) +
          (slidersWidth - (page - 1) * slidersLimitWidth) -
          (slidersLimit.offsetWidth - slidersLimitWidth)
      );
    }
  }, [maxPage, page, isLoading, toRight]);

  const handleNext = () => {
    setToRight(true);
    setPage((page) => Math.min(page + 1, maxPage));
  };

  const handlePrev = () => {
    setToRight(false);
    setPage((page) => Math.max(page - 1, 1));
  };

  return (
    <SliderBox IconsFont={IconsFont} maxwidth={maxWidth}>
      {page > 1 && (
        <div className="iconBox">
          <MdChevronLeft
            className="icon"
            fontSize={Font.fs30}
            onClick={handlePrev}
          />
        </div>
      )}
      <TagLimit maxwidth={maxWidth} ref={slidersLimitRef}>
        <Sliders translatewidth={translateWidth} ref={slidersRef}>
          {children}
        </Sliders>
      </TagLimit>
      {page < maxPage && (
        <div className="iconBox">
          <MdChevronRight
            className="icon"
            fontSize={Font.fs30}
            onClick={handleNext}
          />
        </div>
      )}
    </SliderBox>
  );
}

export default Slider;
