export default function getTotalPages(cardsPerRow, totalRows, artCount) {
  const artsPerPage = cardsPerRow * totalRows;
  return Math.ceil(artCount / artsPerPage);
}
