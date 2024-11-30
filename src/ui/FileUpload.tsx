import styled from "styled-components";
import Container, { Length, Position } from "./Container";
import { Color, Font, Spacing } from "./cssConstants";
import Positioned from "./Positioned";

import { PiImageSquareLight } from "react-icons/pi";
import Text, { FontWeight } from "./Text";
import Flex, { FlexWrap } from "./Flex";
import { useEffect, useRef } from "react";

const StyledFileInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  background-color: var(--color-grey-0);
  padding: ${Spacing.s12} ${Spacing.s32};
  border: 1px solid var(--color-grey-300);
  border-radius: ${Spacing.s4};
  cursor: pointer;
  color: var(--color-grey-700);
  font-size: 1.6rem;
`;

const ImageFile = styled(Flex)`
  border: 1px solid var(--color-grey-300);
  border-radius: ${Spacing.s8};
  width: fit-content;
  padding: ${Spacing.s4} ${Spacing.s16};
  align-items: center;
`;

function FileUpload({
  selectedImageFiles,
  setSelectedImageFiles,
}: {
  selectedImageFiles: File[];
  setSelectedImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!fileInputRef.current) return;
    fileInputRef.current.addEventListener("change", () => {
      const files = fileInputRef.current?.files;
      if (!files) return;
      setSelectedImageFiles([]);
      Array.from(files).map((file) =>
        setSelectedImageFiles((prev) => [...(prev || []), file])
      );
    });
  }, [setSelectedImageFiles]);

  return (
    <div>
      <StyledFileInput
        ref={fileInputRef}
        id="files"
        type="file"
        name="files"
        multiple
      />
      <Container
        padding={
          selectedImageFiles.length > 0
            ? [Spacing.s8, Spacing.s8]
            : [Spacing.s24, Spacing.s24]
        }
        // minHeight="200px"
        border={Spacing.s1}
        borderRadius={Spacing.s4}
        position={Position.relative}
      >
        {selectedImageFiles?.length <= 0 && (
          <Positioned
            top={Spacing["s1/2"]}
            left={Spacing.s32}
            transform={[Spacing.zero, Length["L-1/2"]]}
          >
            <Text
              fontWeight={FontWeight.Regular}
              fontSize={Font.fs14}
              color={Color.grey500}
            >
              Drop image(s) here...
            </Text>
          </Positioned>
        )}

        <Positioned top={Spacing.zero} right={Spacing.zero}>
          <StyledLabel htmlFor="files">Browse</StyledLabel>
        </Positioned>

        <Flex FlexWrap={FlexWrap.wrap}>
          {selectedImageFiles?.map((file) => (
            <ImageFile>
              <PiImageSquareLight />
              <Text>
                {file.name.length < 8
                  ? file.name
                  : `${file.name.slice(0, 8)}...
                    ${file.name.slice(file.name.length - 8, file.name.length)}`}
              </Text>
            </ImageFile>
          ))}
        </Flex>
      </Container>
    </div>
  );
}

export default FileUpload;
