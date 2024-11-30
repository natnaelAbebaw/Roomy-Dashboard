import styled, { css } from "styled-components";
import Container, { Length, Overflow } from "./Container";
import Flex from "./Flex";
import Image from "./Image";
import { Color, Font, Spacing } from "./cssConstants";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useRef, useState } from "react";

const StyledImageCarousel = styled.div`
  --containerWidth: 30rem;
  background-color: #444;
  width: var(--containerWidth);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  margin-bottom: 2rem;
  &:hover .iconBox {
    visibility: visible;
    opacity: 0.8;
    pointer-events: all;
    transition: all 0.3s;
  }

  & .iconBox {
    position: absolute;
    background-color: ${Color.grey0};
    width: 3rem;
    aspect-ratio: 1;
    display: flex;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 1;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  & .iconBox:first-of-type {
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
  & .iconBox:last-of-type {
    top: 50%;
    right: 0;
    right: 1rem;
    transform: translateY(-50%);
  }

  & .iconBox:hover {
    opacity: 1;
    transform: translateY(-50%) scale(1.05);
  }
  & .iconBox:active {
    opacity: 1;
    transform: translateY(-50%) scale(0.95);
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  flex-shrink: 0;
  max-width: 30rem;
`;
type styleFlexProps = {
  page: number;
};

const StyledFlex = styled(Flex)<styleFlexProps>`
  transform: translateX(
    calc(-1 * var(--containerWidth) * ${({ page }) => page - 1})
  );
  transition: transform 0.5s;
`;

type CricleProps = {
  active?: string;
};

const Cricle = styled.div<CricleProps>`
  width: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${Color.grey0};
  opacity: 0.4;
  flex-shrink: 0;
  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `}
  transition: opacity 0.5s;
`;

type StyledCricleProps = {
  translate: number;
};

const StyledCricleFlex = styled(Flex)<StyledCricleProps>`
  ${({ translate }) =>
    translate &&
    css`
      transform: translateX(-${translate}px);
    `}
  transition: transform 0.5s;
`;

const StyledContainer = styled(Container)`
  position: absolute;
  overflow: hidden;
  bottom: 2rem;
  left: 50%;
  width: ${"5.6rem"};
  transform: translateX(-50%);
`;

function ImageCarousel({ images = [] }: { images: string[] }) {
  console.log(images);
  const [page, setPage] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < images.length) setPage(page + 1);
  };

  return (
    <StyledImageCarousel>
      {page > 1 && (
        <div className="iconBox">
          <MdChevronLeft
            className="icon"
            fontSize={Font.fs20}
            onClick={handlePrev}
          />
        </div>
      )}

      <Container
        overflow={Overflow.Hidden}
        width={Length.L32}
        bg={Color.grey200}
      >
        <StyledFlex page={page} ref={ref} height={"30rem"} gap={Spacing.zero}>
          {images.map((image, index) => (
            <StyledImage key={index} src={image} />
          ))}
        </StyledFlex>
      </Container>
      <StyledContainer>
        <StyledCricleFlex
          gap={Spacing.s4}
          translate={
            page <= 3
              ? 0
              : page > 3 && images.length > page + 2
              ? (page - 3) * 12
              : (images.length - 5) * 12
          }
        >
          {new Array(images.length).fill(0).map((_, index: number) => (
            <Cricle
              active={page - 1 === index ? "true" : undefined}
              key={index}
            />
          ))}
        </StyledCricleFlex>
      </StyledContainer>

      {page < images.length && (
        <div className="iconBox">
          <MdChevronRight
            className="icon"
            fontSize={Font.fs20}
            onClick={handleNext}
          />
        </div>
      )}
    </StyledImageCarousel>
  );
}

export default ImageCarousel;
