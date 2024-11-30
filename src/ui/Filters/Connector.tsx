import { filterActions, useFilter } from "../../features/Room/useRoom";
import { Color, Spacing } from "../cssConstants";
import DropDown from "../DropDown";
import Text from "../Text";
import { connecters, IFilter } from "./FilterConstants";

function Connector({ filter }: { filter: IFilter }) {
  const { dispatch } = useFilter();

  function onChangeConnector(field: { value: string | number; label: string }) {
    dispatch?.({
      type: filterActions.UPDATE_LOCAL_FILTER,
      payload: {
        ...filter,
        Connecter: Object.values(connecters).find((c) => c == field.label)!,
      },
    });
  }

  return (
    <>
      {filter.Connecter ? (
        <div style={{ alignSelf: "center" }}>
          <DropDown
            selected={{ value: filter.Connecter, label: filter.Connecter }}
            onSelected={onChangeConnector}
            dropDownList={Object.values(connecters).map((f) => {
              return { value: f, label: f };
            })}
            options={{
              padding: [Spacing.s8, Spacing.s12],
              bg: Color.grey0,
              borderRadius: Spacing.s8,
              border: Spacing.s1,
              borderColor: Color.grey200,
            }}
          />
        </div>
      ) : (
        <Text style={{ alignSelf: "center", justifySelf: "center" }}>
          where
        </Text>
      )}
    </>
  );
}

export default Connector;
