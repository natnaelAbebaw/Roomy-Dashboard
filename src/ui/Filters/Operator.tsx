import { filterActions, useFilter } from "../../features/Room/useRoom";
import { Color, Spacing } from "../cssConstants";
import DropDown from "../DropDown";
import { FieldTypes, IFilter, operatorFieldMap } from "./FilterConstants";

function Operator({
  fieldType,
  filter,
}: {
  fieldType: FieldTypes;
  filter: IFilter;
}) {
  const { dispatch } = useFilter();

  function onChangeOperator(operator: {
    value: string | number;
    label: string;
  }) {
    dispatch?.({
      type: filterActions.UPDATE_LOCAL_FILTER,
      payload: {
        ...filter,
        operator: operatorFieldMap[fieldType].find(
          (o) => o === operator.value
        )!,
      },
    });
  }

  return (
    <DropDown
      selected={{ value: filter.operator, label: filter.operator }}
      onSelected={onChangeOperator}
      dropDownList={operatorFieldMap[fieldType].map((o) => {
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
  );
}

export default Operator;
