import MinimalPagination from "./components/MinimalPagination";
import CollapsedPagination from "./components/CollapsedPagination";
import ExpandedPagination from "./components/ExpandedPagination";

export default function Paginator({
  className,
  currentPage,
  totalPages,
  pageChangeCallback,
}) {
  return (
    <div className={"paginator d-flex justify-content-center " + className}>
      {totalPages <= 3 ? (
        <MinimalPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageChangeCallback={pageChangeCallback}
        />
      ) : totalPages <= 5 ? (
        <CollapsedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageChangeCallback={pageChangeCallback}
        />
      ) : (
        <ExpandedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageChangeCallback={pageChangeCallback}
        />
      )}
    </div>
  );
}
