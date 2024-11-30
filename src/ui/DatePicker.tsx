import { useEffect, useState } from "react";
import "react-dates/initialize";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import "./react_dates_overrides.css";
import moment from "moment";
import { QueryParams } from "../features/Website/hotels/components/queryParams";
import { useLocation, useSearchParams } from "react-router-dom";

type MyDatePickerProps = {
  startDate: moment.Moment;
  setStartDate: (date: moment.Moment) => void;
  endDate: moment.Moment;
  setEndDate: (date: moment.Moment) => void;
  popup?: boolean;
  startDateId?: string;
  endDateId?: string;
  setParms?: boolean;
};

type DateFormat = {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
};
function MyDatePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  popup = true,
  startDateId,
  endDateId,
  setParms,
}: MyDatePickerProps) {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    !popup ? "startDate" : null
  );
  const location = useLocation();
  const [serachParams, setSearchParams] = useSearchParams();
  const handleDatesChange = ({ startDate, endDate }: DateFormat) => {
    setStartDate(startDate!);
    setEndDate(endDate!);
    if (!setParms) return;

    startDate!.format("YYYY-MM-DD") &&
      serachParams.set(
        QueryParams.checkinDate,
        startDate!.format("YYYY-MM-DD")
      );
    endDate?.format("YYYY-MM-DD") &&
      serachParams.set(QueryParams.checkoutDate, endDate.format("YYYY-MM-DD"));
    if (endDate?.format("YYYY-MM-DD")) setSearchParams(serachParams);
  };

  const handleFocusChange = (input: FocusedInputShape | null) => {
    if (popup) {
      setFocusedInput(input);
    } else {
      if (input) {
        setFocusedInput(input);
      }
    }
  };

  useEffect(() => {
    if (!startDateId) return;
    const myInput = document.getElementById(startDateId);
    // Replace with your actual input ID

    myInput?.focus({ preventScroll: true });
  }, [startDateId, serachParams, location]);

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId={startDateId || "startDate"}
      endDate={endDate}
      endDateId={endDateId || "endDate"}
      onDatesChange={({ startDate, endDate }) =>
        handleDatesChange({ startDate, endDate })
      }
      focusedInput={focusedInput}
      onFocusChange={handleFocusChange}
      noBorder={true}
      readOnly={true}
    />
  );
}

export default MyDatePicker;
