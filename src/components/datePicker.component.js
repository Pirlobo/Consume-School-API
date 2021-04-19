import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { UserContext } from "../useContext";
import Assignment from "./pages/Assignment"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function MaterialDatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    {/* <UserContext.Provider value={selectedDate}>
        <Assignment></Assignment>
      </UserContext.Provider> */}
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Date picker inline"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
export default MaterialDatePicker;
