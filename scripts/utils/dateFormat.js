import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function isWeekend(date) {
  return date === "Saturday";
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  
  let num = 0;
  let daysToAdd = 0;
  let deliveryDuration = deliveryOption.deliveryDays

  while (num <= deliveryDuration) {
    const deliveryDate = today.add(num, "days");
    const formattedDate = deliveryDate.format("dddd");
    if(isWeekend(formattedDate)) {
      daysToAdd += 2;
      deliveryDuration += 2;
    }
    num++;
  }
  const newDuration = deliveryOption.deliveryDays + daysToAdd
  const newDeliveryDate = today.add(newDuration, "days")
  const formattedDeliveryDate = newDeliveryDate.format("dddd, MMMM D");

  return formattedDeliveryDate
}