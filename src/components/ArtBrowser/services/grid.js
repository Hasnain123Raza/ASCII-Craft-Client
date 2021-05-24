export function getRowsFromSimplifiedArts(
  cardsPerRow,
  totalRows,
  simplifiedArts
) {
  let rowsData = [];
  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    rowsData[rowIndex] = [];
    let rowStartingCardIndex = rowIndex * cardsPerRow;
    let startingCardIndex = rowStartingCardIndex;
    for (
      let cardIndex = startingCardIndex;
      cardIndex < startingCardIndex + cardsPerRow;
      cardIndex++
    ) {
      let cardData = simplifiedArts[cardIndex];
      if (cardData) rowsData[rowIndex].push(cardData);
    }
  }
  return rowsData;
}
