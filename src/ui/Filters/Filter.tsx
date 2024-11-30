import { Color, Font, Spacing } from "../cssConstants";

import Container, { Length } from "../Container";
import Flex, { FlexAlign, FlexJustify } from "../Flex";
import { AiOutlineDelete } from "react-icons/ai";
import DropDown from "../DropDown";
import Operator from "./Operator";
import {
  EFields,
  fieldToValueMap,
  FieldTypes,
  IFilter,
  operatorFieldMap,
} from "./FilterConstants";
import Value from "./Value";
import Button, { ButtonType } from "../Button";
import Connector from "./Connector";
import { PiDotsSixVertical } from "react-icons/pi";
import { filterActions, useFilter } from "../../features/Room/useRoom";

const Fields = [
  { name: EFields.RoomType, type: FieldTypes.stringList },
  { name: EFields.Aminities, type: FieldTypes.stringList },
  { name: EFields.BedConfiguration, type: FieldTypes.stringList },
  { name: EFields.Capacity, type: FieldTypes.number },
  { name: EFields.Discount, type: FieldTypes.number },
  { name: EFields.ViewType, type: FieldTypes.stringList },
  { name: EFields.Beds, type: FieldTypes.number },
  { name: EFields.Price, type: FieldTypes.number },
];

function Filter({ filter }: { filter: IFilter }) {
  const { localFilters, dispatch } = useFilter();

  function onChangeField(field: { value: string | number; label: string }) {
    dispatch?.({
      type: filterActions.UPDATE_LOCAL_FILTER,
      payload: {
        ...filter,
        field: {
          name: Object.values(EFields).find((v) => v === field.label)!,
          type: Fields.find((f) => f.name == field.label)!.type,
        },
        operator:
          operatorFieldMap[Fields.find((f) => f.name == field.label)!.type][0],
        value:
          fieldToValueMap[Fields.find((f) => f.name == field.label)!.name][0],
      },
    });
  }

  function deleteFilter() {
    dispatch?.({
      type: filterActions.REMOVE_LOCAL_FILTER,
      payload: filter,
    });
  }

  return (
    <>
      {filter.Connecter ? (
        <Flex
          style={{ alignSelf: "center" }}
          align={FlexAlign.Center}
          justify={FlexJustify.Center}
        >
          <PiDotsSixVertical fontSize={Font.fs30} />
        </Flex>
      ) : (
        <div></div>
      )}

      <Connector filter={filter} />
      <Container
        bg={Color.grey50}
        border={Spacing.s1}
        borderRadius={Spacing.s12}
        borderColor={Color.grey100}
        padding={[Spacing.s4]}
        width={Length.fitContent}
      >
        <Flex gap={Spacing.s4}>
          <DropDown
            selected={{ value: filter.field.name, label: filter.field.name }}
            onSelected={onChangeField}
            dropDownList={Fields.map((f) => {
              return { value: f.name, label: f.name };
            })}
            options={{
              padding: [Spacing.s8, Spacing.s12],
              bg: Color.grey0,
              borderRadius: Spacing.s8,
              border: Spacing.s1,
              borderColor: Color.grey200,
            }}
          />
          <Operator fieldType={filter.field.type} filter={filter} />
          <Value filter={filter} />
          {(filter.Connecter || localFilters.length == 1) && (
            <Button
              backgroundColor={Color.grey0}
              padding={[Spacing.s12]}
              borderRadius={Spacing.s8}
              buttonType={ButtonType.Outline}
              borderColor={Color.grey200}
              onClick={deleteFilter}
            >
              <Flex align={FlexAlign.Center} justify={FlexJustify.Center}>
                <AiOutlineDelete />
              </Flex>
            </Button>
          )}
        </Flex>
      </Container>
    </>
  );
}

export default Filter;
