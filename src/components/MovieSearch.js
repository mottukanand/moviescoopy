import React, { useState, useEffect } from "react";
import { Row, Col, Table, Input, Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { moviesData } from "../mock/movies";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../styles/react-paginate.scss";
import { connect } from "react-redux";

const rowStyle = {
  marginBottom: "5px",
  marginTop: "5px"
};
const MovieSearch = (props) => {
  const history = useHistory();

  const [movies, setMovies] = useState("");
  const [myMovies, setMyMovies] = useState([]);
  const [perPageData, setPerPageData] = useState(10)
  const [togglePagination, seTogglePagination] = useState(true)

  useEffect(() => {
    let page_Data = moviesData.slice(0, perPageData)
    setMovies(page_Data);
  }, []);

  //   useEffect(() => {
  //     fetch('http://www.omdbapi.com/?apikey=cf1d59ef&s=batman')
  //  .then((success) => { success.json() })
  //  .catch((error)=>{ console.log(error)});
  //   }, []);

  const handleMovieName = (e) => {
    if (e.target.value) {
      var searchedMovies = moviesData.filter((value) =>
        value.title.toLowerCase().includes(e.target.value.trim().toLowerCase())
      );
      seTogglePagination(false)
      setMovies(searchedMovies);
    } else {
      seTogglePagination(true)
      let page_Data = moviesData.slice(0, perPageData)
      setMovies(page_Data);
    }
  };

  const handleMovieSelect = (e, movie) => {
    if (e.target.checked) {
      setMyMovies([...myMovies, movie.id]);
    } else {
      let films = myMovies.filter((val) => val !== movie.id);
      setMyMovies(films);
    }
  };

  const handleAddMovies = () => {
    let existedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    existedMovies.length ? (existedMovies = [...existedMovies, ...myMovies]) : (existedMovies = [...myMovies])
    let uniqueMovies = [...new Set(existedMovies)];
    localStorage.setItem("movies", JSON.stringify(uniqueMovies));
    props.addMyMovies(uniqueMovies)
    history.push("/mymovies");
  };

  const handlePageCount = () => {
    var pageCount = Math.ceil(parseInt(moviesData.length) / perPageData);
    return pageCount;
  }

  const onPageChange = (currentPage) => {
    let start = currentPage.selected * perPageData;
    let end = start + perPageData;
    let page_Data = moviesData.slice(start, end)
    setMovies(page_Data);
  }

  return (
    <>
      <NavBar />
      <Card style={{ marginTop: "20px" }}>
        <CardHeader style={{ background: "#c7c4ec" }}>
          <CardTitle tag="h5" ><b>Movies Search</b></CardTitle>
        </CardHeader>
        <CardBody>
          <Row style={rowStyle}>
            <Col sm={10}>
              <Input
                type="text"
                placeholder="Search Movie Name Here"
                onChange={(e) => handleMovieName(e)}
              />
            </Col>
            <Col sm={2}>
              {myMovies.length ? (
                <Button
                  color="primary"
                  style={{ float: "right" }}
                  onClick={handleAddMovies}
                >
                  Add To My Movies
                </Button>
              ) : null}
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col>
              <Table striped hover responsive bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TiTle</th>
                    <th>Overview</th>
                  </tr>
                </thead>
                <tbody>
                  {movies && movies.length ? (
                    movies.map((movie, index) => (
                      <tr key={index}>
                        <th>
                          {" "}
                          <Input
                            type="checkbox"
                            checked={myMovies.includes(movie.id)}
                            onChange={(e) => handleMovieSelect(e, movie)}
                          />
                        </th>
                        <td>{movie.title}</td>
                        <td>{movie.overview}</td>
                      </tr>
                    ))
                  ) : (
                      <tr>
                        <td colSpan={3}>No Results</td>
                      </tr>
                    )}
                </tbody>
              </Table>
              {togglePagination &&
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
              }
            </Col>
          </Row>
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

const mapDispatchToProps = dispatch => ({
  addMyMovies: (myMoviesData) => dispatch({ type: "ADD_MY_MOVIES_SUCCESS", payload: myMoviesData }),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearch);