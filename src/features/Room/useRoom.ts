import { useQuery } from "react-query";
import { Cabin, getRooms } from "../../services/cabinApi";
import { IFilter } from "../../ui/Filters/FilterConstants";
import { createContext, useContext, useReducer, useState } from "react";
import { LimitOptions } from "../../ui/Filters/PageLimit";
import { sortOptions } from "./RoomTable";
import { useAuth } from "../Authentication/AuthProvider";

export interface IFilterState {
  filters: IFilter[];
  localFilters: IFilter[];
}

const intialState: IFilterState = {
  filters: [],
  localFilters: [],
};

export enum filterActions {
  ADD_LOCAL_FILTER = "ADD_LOCAL_FILTER",
  REMOVE_LOCAL_FILTER = "REMOVE_LOCAL_FILTER",
  APPLY_LOCAL_FILTER = "APPLY_LOCAL_FILTER",
  UPDATE_LOCAL_FILTER = "UPDATE_LOCAL_FILTER",
  CLEAR_FILTER = "CLEAR_FILTER",
  APPLY_FILTER = "APPLY_FILTER",
  DELETE_FILTER = "DELETE_FILTER",
}

function FilterReducer(
  state: IFilterState,
  action: { type: filterActions; payload?: IFilter }
): IFilterState {
  switch (action.type) {
    case filterActions.ADD_LOCAL_FILTER:
      return {
        ...state,
        localFilters: [...state.localFilters, action.payload!],
      };
    case filterActions.REMOVE_LOCAL_FILTER:
      return {
        ...state,
        localFilters: state.localFilters.filter(
          (f) => f.id !== action.payload?.id
        ),
      };
    case filterActions.UPDATE_LOCAL_FILTER:
      return {
        ...state,
        localFilters: state.localFilters.map((f) =>
          f.id === action.payload?.id ? action.payload : f
        ),
      };
    case filterActions.CLEAR_FILTER:
      return {
        ...state,
        localFilters: [],
        filters: [],
      };
    case filterActions.APPLY_FILTER:
      return {
        ...state,
        filters: state.localFilters,
      };
    case filterActions.DELETE_FILTER:
      return {
        ...state,
        filters: state.filters.filter((f) => f.id !== action.payload?.id),
      };
    default:
      return state;
  }
}

export const FilterContext = createContext<{
  filters: IFilter[];
  localFilters: IFilter[];
  dispatch: React.Dispatch<{
    type: filterActions;
    payload?: IFilter | undefined;
  }> | null;
}>({
  filters: [],
  localFilters: [],
  dispatch: null,
});

export const useFilter = () => useContext(FilterContext);

export function useRoom() {
  const [state, dispatch] = useReducer<typeof FilterReducer>(
    FilterReducer,
    intialState
  );
  const { filters, localFilters } = state;

  const { hotel } = useAuth();

  const [simpleFilter, setSimpleFilter] = useState({
    label: "All",
    value: "",
  });

  const [sort, setSort] = useState<{ label: string; value: string | number }>(
    sortOptions[0]
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");

  const [pageLimit, setPageLimit] = useState<{
    label: string;
    value: string | number;
  }>(LimitOptions[0]);
  const { data: roomData, isLoading: isRoomLoading } = useQuery<{
    rooms: Cabin[];
    maxRooms: number;
  }>({
    queryKey: [
      "rooms",
      filters,
      simpleFilter,
      sort,
      search,
      currentPage,
      pageLimit,
    ],
    queryFn: () =>
      getRooms(
        hotel?.id as string,
        filters,
        simpleFilter.value,
        sort.value,
        search,
        currentPage,
        pageLimit.value as number
      ),
  });

  return {
    roomData,
    isRoomLoading,
    dispatch,
    filters,
    simpleFilter,
    setSimpleFilter,
    sort,
    localFilters,
    setSort,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    pageLimit,
    setPageLimit,
  };
}
