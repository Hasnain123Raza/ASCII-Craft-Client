import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import useQuery from "../../../../services/hooks/useQuery.js";
import { useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import ArtCard from "./components/ArtCard";
import GetRequestCard from "../../../../components/GetRequestCard";
import Paginator from "../../../../components/Paginator";

import {
  getArtCount,
  getSimplifiedArts,
  reset,
  setCurrentPage,
} from "./services/artBrowseSlice";
import {
  selectArtCount,
  selectCurrentPage,
  selectSimplifiedArts,
  selectGetArtCountRequestStatus,
  selectGetSimplifiedArtsRequestStatus,
} from "./services/artBrowseSlice/selectors.js";

import { getTotalPages, getRowsFromSimplifiedArts } from "./services/grid.js";

const cardsPerRow = 3;
const totalRows = 4;

export default function () {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();

  const artCount = useSelector(selectArtCount);
  const currentPage = useSelector(selectCurrentPage);
  const simplifiedArts = useSelector(selectSimplifiedArts);

  const totalPages = getTotalPages(cardsPerRow, totalRows, artCount);
  const rows = getRowsFromSimplifiedArts(
    cardsPerRow,
    totalRows,
    simplifiedArts
  );

  const parsedQueriedPage = parseInt(query.get("page"));
  const queriedPage =
    isNaN(parsedQueriedPage) ||
    parsedQueriedPage < 1 ||
    parsedQueriedPage > totalPages
      ? 1
      : parsedQueriedPage;

  if (queriedPage !== currentPage) dispatch(setCurrentPage(queriedPage));

  const getArtCountRequestStatus = useSelector(selectGetArtCountRequestStatus);
  const getSimplifiedArtsRequestStatus = useSelector(
    selectGetSimplifiedArtsRequestStatus
  );

  const initiateLoadingRequest = () => {
    if (artCount === -1) dispatch(getArtCount());
    dispatch(
      getSimplifiedArts({
        pageOffset: currentPage - 1,
        pageSize: cardsPerRow * totalRows,
      })
    );
  };
  const loadingRequestStatus =
    getArtCountRequestStatus === "rejected" ||
    getSimplifiedArtsRequestStatus === "rejected"
      ? "rejected"
      : getArtCountRequestStatus === "fulfilled" &&
        getSimplifiedArtsRequestStatus === "fulfilled"
      ? "fulfilled"
      : "pending";

  useEffect(() => {
    initiateLoadingRequest();
  }, [currentPage]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <div className="art-browse d-flex flex-column" style={{ flex: 1 }}>
      <GetRequestCard
        initiateLoadingRequest={initiateLoadingRequest}
        loadingRequestStatus={loadingRequestStatus}
        fulfilledComponent={() => (
          <Container className="mb-2" fluid>
            <h2 style={{ textAlign: "center" }}>Art Browser</h2>
            <hr />
            {rows.map((row, rowIndex) => (
              <Row key={rowIndex}>
                {row.map((art, artIndex) => (
                  <Col className="my-2" md={12 / cardsPerRow} key={artIndex}>
                    <ArtCard index={rowIndex * cardsPerRow + artIndex} />
                  </Col>
                ))}
              </Row>
            ))}
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
  );
}
