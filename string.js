export function SortingByKeys(orders) {
  orders.sort(
    (a, b) =>
      order.findIndex((status) => status == a.status) -
      order.findIndex((status) => status == b.status)
  );
}

export function capitalize(word) {
  if (!word) return "";
  return word
    .split("")
    .map((letter) => (letter == " " ? "$$" : letter))
    .join("")
    .split("$$")
    .map((letter, index) => letter[0].toUpperCase() + letter.slice(1))
    .join(" ");
}
