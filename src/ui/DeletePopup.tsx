import Button, { ButtonType } from "./Button";
import Container from "./Container";
import { Color, Font, Spacing } from "./cssConstants";
import Flex, { FlexJustify } from "./Flex";
import Text, { TextAlign } from "./Text";

function DeletePopup({
  deletedItem,
  onDelete,
  disabled,
  close,
}: {
  deletedItem?: string;
  onDelete?: () => void;
  disabled?: boolean;
  close?: () => void;
}) {
  return (
    <Container padding={[Spacing.s4, Spacing.s64]}>
      <Text fontSize={Font.fs24} textAlign={TextAlign.Center} mB={Spacing.s32}>
        Are you sure you want to delete {deletedItem}?
      </Text>

      <Flex justify={FlexJustify.End}>
        <Button
          padding={[Spacing.s12, Spacing.s32]}
          borderColor={Color.grey300}
          buttonType={ButtonType.Outline}
          onClick={close}
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button
          padding={[Spacing.s12, Spacing.s32]}
          backgroundColor={Color.red700}
          color={Color.grey0}
          onClick={onDelete}
          disabled={disabled}
        >
          Delete
        </Button>
      </Flex>
    </Container>
  );
}

export default DeletePopup;
