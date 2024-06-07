export const getDateDifferenceFromNow = (fromDate) => {
  const now = new Date();
  const from = new Date(fromDate);

  let yearDifference = now.getFullYear() - from.getFullYear();
  let monthDifference = now.getMonth() - from.getMonth();
  let dayDifference = now.getDate() - from.getDate();
  let hourDifference = now.getHours() - from.getHours();
  let minuteDifference = now.getMinutes() - from.getMinutes();
  let secondDifference = now.getSeconds() - from.getSeconds();

  // Adjust for negative values
  if (secondDifference < 0) {
    secondDifference += 60;
    minuteDifference -= 1;
  }

  if (minuteDifference < 0) {
    minuteDifference += 60;
    hourDifference -= 1;
  }

  if (hourDifference < 0) {
    hourDifference += 24;
    dayDifference -= 1;
  }

  if (dayDifference < 0) {
    // Get the number of days in the previous month
    const previousMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    ).getDate();
    dayDifference += previousMonth;
    monthDifference -= 1;
  }

  if (monthDifference < 0) {
    monthDifference += 12;
    yearDifference -= 1;
  }

  let message = "";

  if (yearDifference > 0) {
    message = `${yearDifference} year${yearDifference > 1 ? "s" : ""}`;
  } else if (monthDifference > 0) {
    message = `${monthDifference} month${monthDifference > 1 ? "s" : ""}`;
  } else if (dayDifference > 0) {
    message = `${dayDifference} day${dayDifference > 1 ? "s" : ""}`;
  } else if (hourDifference > 0) {
    message = `${hourDifference} hour${hourDifference > 1 ? "s" : ""}`;
  } else if (minuteDifference > 0) {
    message = `${minuteDifference} minute${minuteDifference > 1 ? "s" : ""}`;
  } else if (secondDifference > 0) {
    message = `${secondDifference} second${secondDifference > 1 ? "s" : ""}`;
  }

  return message;
};
