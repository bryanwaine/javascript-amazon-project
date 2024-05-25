import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function formatDate(deliveryOption) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const formattedDate = deliveryDate.format("dddd, MMMM D");

  return formattedDate;
}