import { filterActions, useFilter } from "../../features/Room/useRoom";
import { Length } from "../Container";
import { Color, Spacing } from "../cssConstants";
import DropDown from "../DropDown";

import Input from "../Input";
import { fieldToValueMap, IFilter } from "./FilterConstants";

function Value({ filter }: { filter: IFilter }) {
  const { dispatch } = useFilter();

  function onChangeValue(field: { value: string | number; label: string }) {
    dispatch?.({
      type: filterActions.UPDATE_LOCAL_FILTER,
      payload: {
        ...filter,
        value: field.label,
      },
    });
  }

  function onChangeNumberValue(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch?.({
      type: filterActions.UPDATE_LOCAL_FILTER,
      payload: {
        ...filter,
        value: e.target.value,
      },
    });
  }

  return (
    <>
      {fieldToValueMap[filter.field.name].length > 1 ? (
        <DropDown
          selected={{ value: filter.value, label: filter.value }}
          onSelected={onChangeValue}
          dropDownList={fieldToValueMap[filter.field.name].map((o: string) => {
            return {
              label: o,
              value: o,
            };
          })}
          options={{
            padding: [Spacing.s8, Spacing.s12],
            bg: Color.grey0,
            borderRadius: Spacing.s8,
            border: Spacing.s1,
            borderColor: Color.grey200,
          }}
        />
      ) : (
        <Input
          width={Length.L12}
          padding={[Spacing.s8, Spacing.s12]}
          border={Spacing.s1}
          borderRadius={Spacing.s8}
          type="number"
          defaultValue={0}
          borderColor={Color.grey200}
          value={filter.value}
          onChange={onChangeNumberValue}
        />
      )}
    </>
  );
}

export default Value;
