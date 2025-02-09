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

export const formatIndonesianTimeAuto = (isoDate, type) => {
  // Konversi ISO string ke Date
  const date = new Date(isoDate);

  // Tentukan offset untuk zona waktu Indonesia
  const jakartaOffset = 0; // WIB (GMT+7)
  const baliOffset = 1; // WITA (GMT+8)
  const papuaOffset = 2; // WIT (GMT+9)

  // Offset saat ini berdasarkan zona waktu lokal browser
  const localOffset = date.getTimezoneOffset() / -60; // Negatif karena getTimezoneOffset dalam menit ke UTC

  // Menentukan zona waktu berdasarkan offset
  let offset = jakartaOffset;
  let timezoneLabel = "WIB";

  if (localOffset === baliOffset) {
    offset = baliOffset;
    timezoneLabel = "WITA";
  } else if (localOffset === papuaOffset) {
    offset = papuaOffset;
    timezoneLabel = "WIT";
  }

  // Konversikan ke waktu lokal Indonesia
  const localTime = new Date(date.getTime() + offset * 60 * 60 * 1000);

  // Format tanggal dan waktu
  const day = localTime.getDate();
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const month = monthNames[localTime.getMonth()];
  const year = localTime.getFullYear();

  const hours = String(localTime.getHours()).padStart(2, "0");
  const minutes = String(localTime.getMinutes()).padStart(2, "0");

  if (type === "date") {
    return `${day} ${month} ${year}`;
  } else {
    return `${day} ${month} ${year}, ${hours}:${minutes} ${timezoneLabel}`;
  }
}
