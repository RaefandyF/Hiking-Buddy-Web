import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export const getRelativeTime = (date) => {
  const now = new Date();
  const minutes = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInDays(now, date);
  const weeks = differenceInWeeks(now, date);
  const months = differenceInMonths(now, date);
  const years = differenceInYears(now, date);

  if (minutes < 1) {
    return "Baru saja";
  } else if (minutes < 60) {
    return `${minutes} menit yang lalu`;
  } else if (hours < 24) {
    return `${hours} jam yang lalu`;
  } else if (days < 7) {
    return `${days} hari yang lalu`;
  } else if (weeks < 4) {
    return `${weeks} minggu yang lalu`;
  } else if (months < 12) {
    return `${months} bulan yang lalu`;
  } else {
    return `${years} tahun yang lalu`;
  }
};
