import { getPagesToGenerate, generatePages } from "../pages.js";
import { Pagination } from "react-bootstrap";

function generatePrevPagination({ currentPage, pageChangeCallback }) {
  let newPageValue = currentPage - 1;
  if (newPageValue <= 1) {
    newPageValue = 1;
  }
  return <Pagination.Prev onClick={() => pageChangeCallback(newPageValue)} />;
}

function generateCollapsedPages({
  totalPages,
  currentPage,
  pageChangeCallback,
}) {
  return generatePages(
    totalPages,
    currentPage,
    pageChangeCallback,
    getPagesToGenerate(totalPages, currentPage, pageChangeCallback)
  );
}

function generateNextPagination({
  totalPages,
  currentPage,
  pageChangeCallback,
}) {
  let newPageValue = currentPage + 1;
  if (newPageValue >= totalPages) {
    newPageValue = totalPages;
  }
  return <Pagination.Next onClick={() => pageChangeCallback(newPageValue)} />;
}

export default function CollapsedPagination(props) {
  return (
    <Pagination>
      {generatePrevPagination(props)}
      {generateCollapsedPages(props)}
      {generateNextPagination(props)}
    </Pagination>
  );
}
