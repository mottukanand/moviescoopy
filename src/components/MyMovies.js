import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardHeader
} from "reactstrap";
import NavBar from "./NavBar";
import { moviesData } from "../mock/movies";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import "../styles/react-paginate.scss";

const MyMovies = () => {
  const [allMyMovies, setAllMyMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [perPageData, setPerPageData] = useState(9);

  useEffect(() => {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    let moviesObj = moviesData.filter((value) => movies.includes(value.id));
    let page_Data = moviesObj.slice(0, perPageData)
    setAllMyMovies(moviesObj);
    setMovies(page_Data);
  }, []);

  const handlePageCount = () => {
    let moviesArr = JSON.parse(localStorage.getItem("movies")) || []
    var pageCount = Math.ceil(parseInt(moviesArr.length) / perPageData);
    return pageCount;
  }

  const onPageChange = (currentPage) => {
    let start = currentPage.selected * perPageData;
    let end = start + perPageData;
    let page_Data = allMyMovies.slice(start, end)
    setMovies(page_Data);
  }

  return (
    <>
      <NavBar />
      <Card style={{ height: "100%", marginTop: "20px" }}>
        <CardHeader><CardTitle tag="h5" ><b>My Movies</b></CardTitle></CardHeader>
        <CardBody>
          <Row>
            {movies && movies.length
              ? movies.map((movie, index) => (
                <Col sm={4} key={index} style={{ marginBottom: "10px" }}>
                  <Card style={{ height: "100%" }}>
                    <CardHeader style={{ background: "#c7c4ec" }}> <CardTitle tag="h5" >{movie.title}</CardTitle></CardHeader>
                    <CardBody>
                      <CardText>{movie.overview}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))
              : <h2>No Data To Show</h2>}
          </Row>
          {movies && movies.length ?
            <Row>
              <Col>
                <ReactPaginate
                  previousLabel={'previous'}
                  nextLabel={'next'}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={handlePageCount()}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  containerClassName={"vx-pagination icon-pagination pagination-end mt-2"}
                  activeClassName={"active"}
                  onPageChange={onPageChange}
                />
              </Col>
            </Row>
            :
            null}
        </CardBody>
      </Card>
    </>
  );
};

const mapStateToProps = state => {
  return {
    moviesMy: state.myMovies
  }
}

export default connect(mapStateToProps, null)(MyMovies);