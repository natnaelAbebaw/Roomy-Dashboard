import { CgClose } from "react-icons/cg";
import Flex, { FlexAlign, FlexJustify } from "../Flex";
import Heading from "../Heading";
import { Color, Font, Spacing } from "../cssConstants";
import Text from "../Text";

import Grid from "../Grid";
import Button, { ButtonType } from "../Button";
import Filter from "./Filter";
import { PiPlus } from "react-icons/pi";
import { v7 } from "uuid";
import {
  connecters,
  EFields,
  fieldToValueMap,
  FieldTypes,
  Operators,
} from "./FilterConstants";
import { usePopup } from "../Popup";
import { filterActions, useFilter } from "../../features/Room/useRoom";

function Filters({ onInitPage }: { onInitPage: () => void }) {
  const { setOpen } = usePopup();

  const { localFilters, dispatch } = useFilter();

  function clearFilter() {
    dispatch?.({
      type: filterActions.CLEAR_FILTER,
    });
    setOpen?.(false);
    onInitPage();
  }

  function applyFilter() {
    dispatch?.({
      type: filterActions.APPLY_FILTER,
    });
    setOpen?.(false);
    onInitPage();
  }

  return (
    <div>
      <Flex
        mb={Spacing.s16}
        align={FlexAlign.Center}
        justify={FlexJustify.SpaceBetween}
      >
        <Heading mb={Spacing.zero}>Filter</Heading>

        <CgClose cursor={"pointer"} onClick={() => setOpen?.(false)} />
      </Flex>
      <Grid
        mb={localFilters.length > 0 ? Spacing.s24 : Spacing.s1}
        columns={"2rem 10rem 1fr"}
      >
        {localFilters?.map((filter, index) => (
          <Filter filter={filter} key={index} />
        ))}
      </Grid>
      <Button
        color={Color.brand900}
        fontSize={Font.fs16}
        buttonType={ButtonType.Normal}
        onClick={() =>
          dispatch?.({
            type: filterActions.ADD_LOCAL_FILTER,
            payload: {
              field: {
                name: EFields.RoomType,
                type: FieldTypes.stringList,
              },
              operator: Operators.contains,
              value: fieldToValueMap[EFields.RoomType][0],
              id: v7(),
              Connecter: localFilters.length > 0 ? connecters.and : null,
            },
          })
        }
      >
        <Flex gap={Spacing.s8} align={FlexAlign.Center}>
          <PiPlus fontSize={Font.fs16} />
          <Text color={Color.brand900}> Add Filter</Text>
        </Flex>
      </Button>

      {localFilters.length > 0 && (
        <Flex align={FlexAlign.Center} justify={FlexJustify.End}>
          <Button
            color={Color.brand900}
            buttonType={ButtonType.Outline}
            padding={[Spacing.s8, Spacing.s16]}
            borderColor={Color.grey300}
            onClick={clearFilter}
          >
            <Text>Clear</Text>
          </Button>

          <Button
            color={Color.brand900}
            buttonType={ButtonType.Primary}
            padding={[Spacing.s8, Spacing.s16]}
            borderColor={Color.grey300}
            onClick={applyFilter}
          >
            <Text color={Color.grey0}>Apply</Text>
          </Button>
        </Flex>
      )}
    </div>
  );
}

export default Filters;
