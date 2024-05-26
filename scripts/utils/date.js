import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const formattedDate = deliveryDate.format("dddd, MMMM D");

  return formattedDate;
}

export function isWeekend() {
  const today = dayjs();
  const formattedDate = today.format("dddd");
  if (formattedDate === "Saturday" || formattedDate === "Sunday") {
    return true;
  }
  return false;
}
