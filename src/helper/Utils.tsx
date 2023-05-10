export const currency = (amount: number) => {
  return `$${amount.toLocaleString("en-US", {})}`;
}

export const UCFirstWord = (text: string) => {
  const words = text.split(" ");

  return words.map((word) => {
    return word[0].toUpperCase() + word.substring(1);
  }).join(" ");
}