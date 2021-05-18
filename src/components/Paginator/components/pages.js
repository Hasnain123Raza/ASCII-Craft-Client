import { Pagination } from "react-bootstrap";

export const getPagesToGenerate = (
  totalPages,
  currentPage,
  pageChangeCallback
) => {
  let pagesToGenerate = [];
  if (totalPages <= 5) {
    for (let counter = 1; counter < totalPages + 1; counter++) {
      pagesToGenerate.push(counter);
    }
  } else {
    for (let counter = currentPage - 2; counter < currentPage + 3; counter++) {
      if (counter > 0 && counter <= totalPages) {
        pagesToGenerate.push(counter);
      }
    }
  }
  return pagesToGenerate;
};

export const generatePages = (
  totalPages,
  currentPage,
  pageChangeCallback,
  pagesToGenerate
) => {
  return pagesToGenerate.map((index) => (
    <Pagination.Item
      key={index}
      active={index == currentPage}
      onClick={() => pageChangeCallback(index)}
    >
      {index}
    </Pagination.Item>
  ));
};
