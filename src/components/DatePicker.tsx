import makeArray from "@/helpers/makeArray";

const DatePicker = {
  Year() {
    const years = makeArray(74, new Date().getFullYear(), "reverse");
    return (
      <select name="" id="">
        {years?.map((year) => (
          <option key={year + "year"} value={year + "year"}>
            {year}
          </option>
        ))}
      </select>
    );
  },

  Month() {
    const months = makeArray(12, 1);
    return (
      <select>
        {months?.map((month) => (
          <option key={month + "month"} value={month + "month"}>
            {`${month}월`}
          </option>
        ))}
      </select>
    );
  },

  Day() {
    const day = makeArray(31, 1);
    return (
      <select>
        {day?.map((day) => (
          <option key={day + "day"} value={day + "day"}>
            {`${day}`}
          </option>
        ))}
      </select>
    );
  },
};

export default DatePicker;
