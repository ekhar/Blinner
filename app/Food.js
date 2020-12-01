export default function Food(
  image,
  name,
  preptime,
  ingredients,
  kind = "Lunch"
) {
  return {
    image: image,
    name: name,
    preptime: preptime,
    ingredients: ingredients,
    kind: kind,
  };
}
