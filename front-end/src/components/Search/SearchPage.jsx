// Code inspired from https://gitlab.com/mehuldar/aroundtheworld/-/blob/splash-search/front-end/src/screens/Search/Search.js
// Around The World

import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import { Pagination } from "@mui/material";
import BookCard from "../Books/BookCard";
import { Spinner } from "react-bootstrap";
import * as Bootstrap from "react-bootstrap";
import Header from "../Header/Header";
import { Parallax } from "react-parallax";
import { MDBInput } from "mdbreact";
import "./SearchPage.css";
import { stringToIntegerList } from "../../common";

const styles = {
  parrallaxCont: {
    margintop: 100,
    height: 60,
    backgroundColor: "white",
  },
  paperCont: {
    marginTop: 0,
    marginLeft: 80,
    marginRight: 80,
    height: 6000,
  },
};

const axios = require("axios");

export function SearchPage() {
  const [authorData, setAuthorData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [publisherData, setPublisherData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [authorItemCount, setAuthorItemCount] = useState(0);
  const [bookItemCount, setBookItemCount] = useState(0);
  const [publisherItemCount, setPublisherItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const getAuthors = (row) => {
    const data = authorData[row];
    let booksWritten = stringToIntegerList(data.book_connections).length;
    return (
      <tr key={data.author_id}>
        <td>
          <a href={"/author-" + data.author_id}>
            {highlightText(data.author_name)}
          </a>
        </td>
        <td> {highlightText(data.year_born)}</td>
        <td> {highlightText(data.nationality)}</td>
        <td> {highlightText(data.genre)}</td>
        <td> {highlightText(data.author_tour)}</td>
        <td> {highlightText(booksWritten.toString())}</td>
      </tr>
    );
  };

  //   const getBooks = (row) => {
  //     const data = bookData[row];
  //     return (
  //       <tr key={data.book_id}>
  //         <td>
  //           <a href={"/book-" + data.book_id}>
  //             {highlightText(data.name)}
  //           </a>
  //         </td>
  //         <td> {highlightText(data.genre)}</td>
  //         <td> {highlightText(data.year)}</td>
  //         <td> {highlightText(data.rating)}</td>
  //         <td> {highlightText(data.price?.toString())}</td>
  //         <td> {highlightText(data.page_count.toString())}</td>
  //       </tr>
  //     );
  //   };

  const getPublishers = (row) => {
    const data = publisherData[row];
    let authorsPublished = stringToIntegerList(data.author_connections).length;
    return (
      <tr key={data.publisher_id}>
        <td>
          <a href={"/publisher-" + data.publisher_id}>
            {highlightText(data.name)}
          </a>
        </td>
        <td> {highlightText(data.origin)}</td>
        <td> {highlightText(data.publication_types)}</td>
        <td> {highlightText(authorsPublished.toString())}</td>
        <td> {highlightText(data.founded)}</td>
      </tr>
    );
  };

  const highlightText = (text) => {
    const searchQuery = searchText.toLowerCase() ?? "";
    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));

    return (
      <span>
        {parts.map((part) =>
          part.toLowerCase() === searchQuery ? (
            <text style={{ backgroundColor: "yellow" }}>{part}</text>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  var l = useEffect(() => {
    // Adapted from TexasVotes

    function createApiString(str) {
      let searchString = "";
      if (str !== "") {
        searchString = "&search=" + str.replace(" ", "+");
      }
      console.log("?perPage=" + perPage + "&page=" + page + searchString);
      return "?perPage=" + perPage + "&page=" + page + searchString;
    }

    const getAuthorsData = async () => {
      const urlParams = createApiString(searchText);
      console.log(urlParams);
      axios
        .get("https://api.prideinwriting.me/api/authors" + urlParams)
        .then((response) => {
          setAuthorData(response.data.data);
          setAuthorItemCount(response.data.count);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          return {};
        });
    };

    const getBooksData = async () => {
      const urlParams = createApiString(searchText);
      console.log(urlParams);
      axios
        .get("https://api.prideinwriting.me/api/books" + urlParams)
        .then((response) => {
          setBookData(response.data.data);
          setBookItemCount(response.data.count);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          return {};
        });
    };

    const getPublishersData = async () => {
      const urlParams = createApiString(searchText);
      console.log(urlParams);
      axios
        .get("https://api.prideinwriting.me/api/publishers" + urlParams)
        .then((response) => {
          setPublisherData(response.data.data);
          setPublisherItemCount(response.data.count);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          return {};
        });
    };

    getAuthorsData();
    getBooksData();
    getPublishersData();
  }, [page, searchText, perPage]);

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <Parallax strength={500} style={styles.parrallaxCont}></Parallax>

      <Paper elevation={4} style={styles.paperCont}>
        <div className="mainPage">
          {/* <h2 className="header">
        {params.q ? `Results for "${params.q}"` : "Search"}
      </h2> */}
          <p className="descriptionText">Search for information.</p>
          <MDBInput
            label="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {!loading ? (
            <div>
              {/* all tables */}
              <h2 className="header">Authors</h2>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "5%",
                  }}
                >
                  {highlightText(
                `Displaying ${
                  authorItemCount > 0 ? (page - 1) * 10 + 1 : 0
                }-${Math.min(
                  page * 10,
                  authorItemCount
                )} of ${authorItemCount}`
              )}
                </div>
                <Bootstrap.Table
                  table-bordered
                  style={{ width: "90%", marginLeft: "5%" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">{highlightText("Author")}</th>
                      <th scope="col">{highlightText("Year Born")}</th>
                      <th scope="col">{highlightText("Nationality")}</th>
                      <th scope="col">{highlightText("Genres")}</th>
                      <th scope="col">{highlightText("On Tour")}</th>
                      <th scope="col">{highlightText("Books Written")}</th>
                    </tr>
                  </thead>
                  <tbody>{Object.keys(authorData).map(getAuthors)}</tbody>
                </Bootstrap.Table>
              </div>
              <div>
                <h2 className="header">Books</h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "5%",
                  }}
                >
                  Displaying{" "}
            {bookItemCount > 0 ? (page - 1) * 9 + 1 : 0}-
            {Math.min(page * 9, bookItemCount)} of {" "}
            {bookItemCount}
                </div>
                <div className="cardGrid">
                  {bookData.map((book) => (
                    <BookCard book={book} search={searchText} />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 5,
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  {/* <div>
              <Pagination
                defaultPage={1}
                page={params.demographic_page}
                onChange={(_, value) => updateParam("demographic_page", value)}
                count={Math.ceil(demItemCount / 9)}
                variant="outlined"
                color="primary"
                style={{ alignSelf: "center" }}
              />
            </div> */}
                </div>
              </div>
              <h2 className="header">Publishers</h2>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "5%",
                  }}
                >
                  {highlightText(
                    `Displaying ${
                      publisherItemCount > 0 ? (page - 1) * 10 + 1 : 0
                    }-${Math.min(
                      page * 10,
                      publisherItemCount
                    )} of ${publisherItemCount}`
                  )}
                </div>

                <Bootstrap.Table
                  table-bordered
                  style={{ width: "90%", marginLeft: "5%" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">{highlightText("Publisher")}</th>
                      <th scope="col">{highlightText("Country of Origin")}</th>
                      <th scope="col">{highlightText("Publication Types")}</th>
                      <th scope="col">{highlightText("Authors Published")}</th>
                      <th scope="col">{highlightText("Year Founded")}</th>
                    </tr>
                  </thead>
                  <tbody>{Object.keys(publisherData).map(getPublishers)}</tbody>
                </Bootstrap.Table>
                <Pagination
                  defaultPage={1}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  count={Math.ceil(Math.max(authorItemCount, bookItemCount, publisherItemCount) / 10)}
                  variant="outlined"
                  color="primary"
                  showFirstButton
                  showLastButton
                  style={{
                    paddingTop: "10pt",
                    paddingRight: "5%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                />
              </div>
            </div>
          ) : (
            <Spinner
              animation="border"
              role="status"
              style={{ marginTop: "15%", width: 60, height: 60 }}
            />
          )}
        </div>
      </Paper>
    </div>
  );
}

export default SearchPage;
