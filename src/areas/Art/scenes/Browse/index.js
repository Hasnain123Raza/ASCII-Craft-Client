import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import useQuery from "../../../../services/hooks/useQuery.js";
import { useEffect, useRef } from "react";

import { Container } from "react-bootstrap";
import GetRequestCard from "../../../../components/GetRequestCard";
import Paginator from "../../../../components/Paginator";
import ArtBrowser from "../../../../components/ArtBrowser";

import {
  loadResources,
  reset,
  setCurrentPage,
} from "./services/artBrowseSlice";
import {
  selectArtCount,
  selectCurrentPage,
  selectSimplifiedArts,
  selectLoadingRequestStatus,
} from "./services/artBrowseSlice/selectors.js";

import getTotalPages from "./services/getTotalPages.js";

const cardsPerRow = 3;
const totalRows = 4;

export default function Browse() {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();

  const artCount = useSelector(selectArtCount);
  const currentPage = useSelector(selectCurrentPage);
  const simplifiedArts = useSelector(selectSimplifiedArts);

  const totalPages = getTotalPages(cardsPerRow, totalRows, artCount);

  const parsedQueriedPage = parseInt(query.get("page"));
  const queriedPage =
    isNaN(parsedQueriedPage) ||
    parsedQueriedPage < 1 ||
    parsedQueriedPage > totalPages
      ? 1
      : parsedQueriedPage;
  const pageConflict = artCount === -1 ? false : queriedPage !== currentPage;

  if (pageConflict) dispatch(setCurrentPage(queriedPage));

  const createdByUserId = {
    type: "createdByUserId",
    payload: query.get("createdByUserId"),
  };
  const likedByUserId = {
    type: "likedByUserId",
    payload: query.get("likedByUserId"),
  };
  const selectors = [createdByUserId, likedByUserId];

  const initiateLoadingRequest = () =>
    dispatch(
      loadResources({
        pageOffset: currentPage - 1,
        pageSize: cardsPerRow * totalRows,
        queriedPage,
        selectors,
      })
    );

  const loadingRequestStatus = useSelector(selectLoadingRequestStatus);

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  useEffect(() => {
    const loadingRequestPromise = initiateLoadingRequest();
    return () => loadingRequestPromise.abort();
  }, [currentPage]);

  return (
    <div className="art-browse d-flex flex-column" style={{ flex: 1 }}>
      <div>
        <h2 style={{ textAlign: "center" }}>Art Browser</h2>
        <hr />
        <GetRequestCard
          initiateLoadingRequest={initiateLoadingRequest}
          loadingRequestStatus={loadingRequestStatus}
          fulfilledComponent={() => (
            <Container className="mb-2" fluid>
              <ArtBrowser
                cardsPerRow={cardsPerRow}
                totalRows={totalRows}
                simplifiedArts={simplifiedArts}
              />
            </Container>
          )}
        />
        <Paginator
          className="mt-auto"
          currentPage={currentPage}
          totalPages={totalPages}
          pageChangeCallback={(newPage) => {
            query.set("page", newPage);
            history.push(location.pathname + "?" + query.toString());
          }}
        />
      </div>
    </div>
  );
}
