export default function (cardsPerRow, totalRows, artCount) {
  const artsPerPage = cardsPerRow * totalRows;
  return Math.ceil(artCount / artsPerPage);
}
