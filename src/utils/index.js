export const getDateDifferenceFromNow = (fromDate) => {
    let difference = new Date().getTime() - new Date(fromDate).getTime();

    difference = difference / 1000;
    const yearsDifference = Math.floor(difference / (3600 * 24 * 365));
    difference -= yearsDifference * 3600 * 24 * 365;
    const monthsDifference = Math.floor(difference / (3600 * 24 * 30));
    difference -= monthsDifference * 3600 * 24 * 30;
    const daysDifference = Math.floor(difference / (3600 * 24));
    difference -= daysDifference * 3600 * 24;
    const hoursDifference = Math.floor(difference / 3600);
    difference -= hoursDifference * 3600;
    const minutesDifference = Math.floor(difference / 60);
    difference -= minutesDifference * 60;
    const secondsDifference = Math.round(difference);

    let message;

    if (yearsDifference > 0) {
        message = `${yearsDifference} year${yearsDifference > 1 ? 's' : ''}`;
    } else if (monthsDifference > 0) {
        message = `${monthsDifference} month${monthsDifference > 1 ? 's' : ''}`;
    } else if (daysDifference > 0) {
        message = `${daysDifference} day${daysDifference > 1 ? 's' : ''}`;
    } else if (hoursDifference > 0) {
        message = `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''}`;
    } else if (minutesDifference > 0) {
        message = `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''}`;
    } else if (secondsDifference > 0) {
        message = `${secondsDifference} second${secondsDifference > 1 ? 's' : ''}`;
    } else {
        message = 'just now';
    }

    return message + ' ago';
};
