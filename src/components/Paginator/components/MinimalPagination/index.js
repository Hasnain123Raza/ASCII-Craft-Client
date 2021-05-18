import { getPagesToGenerate, generatePages } from "../pages.js";
import { Pagination } from "react-bootstrap";

function generateMinimalPages({ totalPages, currentPage, pageChangeCallback }) {
  return generatePages(
    totalPages,
    currentPage,
    pageChangeCallback,
    getPagesToGenerate(totalPages, currentPage, pageChangeCallback)
  );
}

export default function MinimalPagination(props) {
  return <Pagination>{generateMinimalPages(props)}</Pagination>;
}
