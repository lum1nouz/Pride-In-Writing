import React from "react";
import { Paper, Button, Grid } from "@material-ui/core";
import Header from "../Header/Header";
import { Pagination } from "@mui/material";
import css from "./Authors.module.css";
import { Parallax } from "react-parallax";
import * as Bootstrap from "react-bootstrap";
import Author from "../../models/author-model";
import { stringToIntegerList } from "../../common";
import { TextField, Select, MenuItem, SelectChangeEvent } from "@mui/material";

type response = {
  data: Author[];
  count: number;
};

type filter = {
  category: string;
  value: string;
};

type sort = {
  category: string;
  value: string;
};

type props = {};

type state = {
  dataStore: Author[];
  curFilter: filter;
  curSort: sort;
  perPage: number;
  page: number;
  search: string;
  total: number;
};

class Authors extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      dataStore: [],
      curSort: {
        category: "",
        value: "",
      },
      curFilter: {
        category: "",
        value: "",
      },
      perPage: 15,
      page: 1,
      search: "",
      total: 0,
    };
  }

  mapData = (row: Author) => {
    const data = row;
    let booksWritten = stringToIntegerList(data.book_connections).length;
    return (
      <tr key={data.author_id}>
        <td>
          <a
            id={"linkButton-" + data.author_id}
            href={"/author-" + data.author_id}
          >
            {this.highlightText(data.author_name)}
          </a>
        </td>
        <td> {this.highlightText(data.year_born + "")}</td>
        <td> {this.highlightText(data.nationality)}</td>
        <td> {this.highlightText(data.genre)}</td>
        <td> {this.highlightText(data.author_tour)}</td>
        <td> {this.highlightText(booksWritten.toString())}</td>
      </tr>
    );
  };

  highlightText(text: string) {
    const searchQuery = this.state.search.toLowerCase() ?? "";
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
  }

  async componentDidMount() {
    let pageNum: number = 1;
    pageNum = parseInt(localStorage.getItem("pageNum") as string);
    if (pageNum === null) {
      pageNum = 1;
    }
    this.setState({
      dataStore: this.state.dataStore,
      curSort: this.state.curSort,
      curFilter: this.state.curFilter,
      perPage: this.state.perPage,
      page: pageNum,
      total: this.state.total,
    });
    await this.getData();
  }

  async updatePage(value: number) {
    console.log(value + "    " + this.state.page);
    await this.setState({
      dataStore: this.state.dataStore,
      curSort: this.state.curSort,
      curFilter: this.state.curFilter,
      perPage: this.state.perPage,
      page: value,
      search: this.state.search,
    });

    if (this.state.search === "") {
      console.log(this.state.page);
      this.handleSubmit();
    } else {
      this.handleSearch();
    }
  }

  //Beware of using
  //State changes often with sorting/filtering
  componentDidUpdate() {
    // console.log(this.state)
    localStorage.setItem("pageNum", JSON.stringify(this.state.page));
  }

  //Used to build API request
  createApiString(str: string) {
    let filterString = "";
    let sortString = "";
    let searchString = "";
    if (
      this.state.curFilter.category !== "" &&
      this.state.curFilter.value !== ""
    ) {
      filterString = (
        "&" +
        this.state.curFilter.category +
        "=" +
        this.state.curFilter.value
      ).replaceAll(" ", "~");
    }
    if (this.state.curSort.category !== "") {
      let directionField = "&direction=" + this.state.curSort.value;
      // if(this.state.curSort.value === "ascend") {
      //   directionField = ""
      // }
      sortString = "&sort_by=" + this.state.curSort.category + directionField;
    }
    if (str !== "") {
      filterString = "";
      sortString = "";
      searchString = "&search=" + str.replaceAll(" ", "+").replaceAll(",", "");
    }
    return (
      "?perPage=" +
      this.state.perPage +
      "&page=" +
      this.state.page +
      searchString +
      filterString +
      sortString
    );
  }

  //Calls API
  async getData() {
    const authors: response = await fetch(
      "https://api.prideinwriting.me/api/authors" + this.createApiString("")
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    this.setState({
      dataStore: authors.data,
      curSort: this.state.curSort,
      curFilter: this.state.curFilter,
      perPage: this.state.perPage,
      page: this.state.page,
      search: this.state.search,
      total: authors.count,
    });
  }

  //Calls search route on API
  async getDataForSearch(search: string) {
    const authors: response = await fetch(
      "https://api.prideinwriting.me/api/authors" + this.createApiString(search)
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    this.setState({
      dataStore: authors.data,
      curSort: this.state.curSort,
      curFilter: this.state.curFilter,
      perPage: this.state.perPage,
      page: this.state.page,
      search: this.state.search,
      total: authors.count,
    });
  }

  //Logic used to indicate sorting order
  //Starts at default order
  //First click sets to "desc" or descending order
  //Second click sets to "asc" or ascending order
  changeSort(col: number) {
    let lookup = [
      "author_name",
      "year_born",
      "nationality",
      "genre",
      "author_tour",
      "book_connections",
    ];
    let tempCategory = lookup[col];
    let tempValue = "descend";
    let check = this.state.curSort.value;
    if (check === "descend" && tempCategory === this.state.curSort.category) {
      tempValue = "ascend";
    } else if (
      check === "ascend" &&
      tempCategory === this.state.curSort.category
    ) {
      tempCategory = "";
      tempValue = "";
    }
    let newSort: sort = {
      category: tempCategory,
      value: tempValue,
    };

    this.setState({
      dataStore: this.state.dataStore,
      curSort: newSort,
      curFilter: this.state.curFilter,
      perPage: this.state.perPage,
      page: this.state.page,
      search: this.state.search,
    });
  }

  //Used by TextFields
  //Changes state by key of user input
  handleFilterChange(
    cat: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let newFilter: filter = {
      category: cat,
      value: event.target.value,
    };
    this.setState({
      dataStore: this.state.dataStore,
      curSort: this.state.curSort,
      curFilter: newFilter,
      perPage: this.state.perPage,
      page: this.state.page,
      search: this.state.search,
    });
  }

  //Used by TextField
  //Submits Filtering requests by the enter key
  handleEnterKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.which === 13) {
      this.handleSubmit();
    }
  }

  //Used by Select components
  //Sets state to user choice
  handleSelectFilter(event: SelectChangeEvent<string>, cat: string) {
    let newFilter: filter = {
      category: "",
      value: "",
    };
    if (event.target.value !== "none") {
      newFilter = {
        category: cat,
        value: event.target.value,
      };
    }

    this.setState({
      dataStore: this.state.dataStore,
      curSort: this.state.curSort,
      curFilter: newFilter,
      perPage: this.state.perPage,
      page: this.state.page,
      search: this.state.search,
    });
  }

  //Handles the submit button for updating the data
  async handleSubmit() {
    await this.getData();
  }

  //Used by search Text field
  //Updates state by keystroke for the search entry
  handleSearchText(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    this.setState({
      dataStore: this.state.dataStore,
      curSort: this.state.curSort,
      curFilter: this.state.curFilter,
      perPage: this.state.perPage,
      page: this.state.page,
      search: event.target.value,
    });
  }

  //Calls API search
  async handleSearch() {
    await this.getDataForSearch(this.state.search);
  }

  render() {
    return (
      <div>
        <Header />

        <div>
          <Parallax strength={500} className={css.parrallaxCont}>
            <div style={{ fontWeight: "bold" }}>
              <div className={css.titleText}>
                <span style={{ color: "#FF555E" }}>A</span>
                <span style={{ color: "#FF8650" }}>u</span>
                <span style={{ color: "#F6BE00" }}>t</span>
                <span style={{ color: "#77C66E" }}>h</span>
                <span style={{ color: "#83B2FF" }}>o</span>
                <span style={{ color: "#9B6EF3" }}>r</span>
                <span style={{ color: "#FC6C85" }}>s</span>
              </div>
              <Grid container spacing={5} style={{ marginTop: 20 }}>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                  <div>
                    {" "}
                    Sort Query:
                    <div> {this.state.curSort.category} </div>
                    <div> {this.state.curSort.value} </div>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div>
                    {" "}
                    Filter Query:
                    <div> {this.state.curFilter.category} </div>
                    <div> {this.state.curFilter.value} </div>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    label="Search Authors"
                    onChange={(e) => this.handleSearchText(e)}
                  >
                    {" "}
                  </TextField>
                  <Button
                    onClick={() => {
                      this.setState({
                        dataStore: this.state.dataStore,
                        curSort: this.state.curSort,
                        curFilter: this.state.curFilter,
                        perPage: this.state.perPage,
                        page: 1,
                        search: this.state.search,
                      });
                      this.handleSearch();
                    }}
                    variant="outlined"
                  >
                    {" "}
                    Search{" "}
                  </Button>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
              <Paper
                elevation={4}
                className={css.paperCont}
                data-testid="authors"
              >
                <div>
                  <div className="filters">
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <div style={{ margin: 10 }}>
                          <h4>Name</h4>
                          <Button
                            id={"nameSort"}
                            onClick={() => this.changeSort(0)}
                            variant="outlined"
                          >
                            {" "}
                            Sort{" "}
                          </Button>
                          <TextField
                            label="Filter by Name"
                            variant="outlined"
                            onChange={(e) =>
                              this.handleFilterChange("author_name", e)
                            }
                            onKeyPress={(e) => this.handleEnterKey(e)}
                          >
                            {" "}
                          </TextField>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div style={{ margin: 10 }}>
                          <h4>Year Born</h4>
                          <Button
                            onClick={() => this.changeSort(1)}
                            variant="outlined"
                          >
                            {" "}
                            Sort{" "}
                          </Button>
                          <TextField
                            label="Filter by Year Born"
                            variant="outlined"
                            onChange={(e) =>
                              this.handleFilterChange("year_born", e)
                            }
                            onKeyPress={(e) => this.handleEnterKey(e)}
                          >
                            {" "}
                          </TextField>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div style={{ margin: 10 }}>
                          <h4>Nationality</h4>
                          <Button
                            onClick={() => this.changeSort(2)}
                            variant="outlined"
                          >
                            {" "}
                            Sort{" "}
                          </Button>
                          <TextField
                            label="Filter by Nationality"
                            variant="outlined"
                            onChange={(e) =>
                              this.handleFilterChange("nationality", e)
                            }
                            onKeyPress={(e) => this.handleEnterKey(e)}
                          >
                            {" "}
                          </TextField>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div style={{ margin: 10 }}>
                          <h4>Genres</h4>
                          <Button
                            onClick={() => this.changeSort(3)}
                            variant="outlined"
                          >
                            {" "}
                            Sort{" "}
                          </Button>
                          <Select
                            value="none"
                            label="Age"
                            onChange={(e) =>
                              this.handleSelectFilter(e, "genre")
                            }
                          >
                            <MenuItem value={"novelist"}>Novelist</MenuItem>
                            <MenuItem value={"poet"}>Poet</MenuItem>
                            <MenuItem value={"playwright"}>Playwright</MenuItem>
                            <MenuItem value={"writer"}>Writer</MenuItem>
                            <MenuItem value={"short"}>
                              Short Story Writer
                            </MenuItem>
                            <MenuItem value={"none"}>Pick an option</MenuItem>
                          </Select>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div style={{ margin: 10 }}>
                          <h4>On Tour</h4>
                          <Button
                            onClick={() => this.changeSort(4)}
                            variant="outlined"
                          >
                            {" "}
                            Sort{" "}
                          </Button>
                          <Select
                            value="none"
                            label="Age"
                            onChange={(e) =>
                              this.handleSelectFilter(e, "author_tour")
                            }
                          >
                            <MenuItem value={"true"}>Yes</MenuItem>
                            <MenuItem value={"false"}>No</MenuItem>
                            <MenuItem value={"none"}>Pick an option</MenuItem>
                          </Select>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div style={{ margin: 10 }}>
                          <h4>Books Written</h4>
                          <Button
                            onClick={() => this.changeSort(5)}
                            variant="outlined"
                          >
                            {" "}
                            Sort{" "}
                          </Button>
                          <TextField
                            label="Filter by Books Written"
                            variant="outlined"
                            onChange={(e) =>
                              this.handleFilterChange("book_connections", e)
                            }
                            onKeyPress={(e) => this.handleEnterKey(e)}
                          >
                            {" "}
                          </TextField>
                        </div>
                      </Grid>
                    </Grid>
                  </div>

                  <Grid container spacing={5} style={{ marginTop: 20 }}>
                    <Grid item xs={4}></Grid>
                    <Button
                      onClick={() => {
                        this.setState({
                          dataStore: this.state.dataStore,
                          curSort: this.state.curSort,
                          curFilter: this.state.curFilter,
                          perPage: this.state.perPage,
                          page: 1,
                          search: this.state.search,
                        });
                        this.handleSubmit();
                      }}
                      variant="outlined"
                    >
                      {" "}
                      Get Filtered/Sorted Data{" "}
                    </Button>
                    <Grid item xs={4}></Grid>
                  </Grid>

                  {/* <MaterialTable
                  icons={tableIcons}
                  style={{ marginTop: 40, marginLeft: 20, marginRight: 20 }}
                  options={{
                    pageSize: this.state.perPage,
                    search: false,
                    sorting: false
                  }}
                  onRowClick={(_, data) =>
                    (window.location.href = "/author-" + data?.id)
                  }
                  columns={[
                    { title: "Author", field: "author", type: "string" },
                    { title: "Year Born", field: "yearBorn", type: "numeric" },
                    {
                      title: "Nationality",
                      field: "nationality",
                      type: "string",
                    },
                    { title: "Genres", field: "genres", type: "string" },
                    { title: "On Tour", field: "onTour", type: "string" },
                    {
                      title: "Books Written",
                      field: "books_published",
                      type: "numeric",
                    },
                  ]}
                  data={this.state.dataStore}
                  title=""
                  components={{
                    Pagination: props => (
                                 <TablePagination
                                 {...props}
                                rowsPerPageOptions={[10,15,20]}
                            rowsPerPage={this.state.perPage}
                            count={this.state.dataStore.length}
                            page={this.state.page}
                             onChangePage={(e, page) => {
                                 this.setState({ dataStore: this.state.dataStore, curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: page, search: this.state.search})
                                 if(this.state.search === ""){
                                  this.handleSubmit()
                                 } else{
                                  this.handleSearch()
                                 }
                                 window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                })
                             }}
                            onChangeRowsPerPage={event => {
                              this.setState({ dataStore: this.state.dataStore, curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: +event.target.value, page: this.state.page, search: this.state.search})
                            }}
                          />
                        ),
                              }}
                /> */}

                  <h2 className="header">Authors</h2>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingRight: "5%",
                      }}
                    >
                      {this.highlightText(
                        `Displaying ${
                          this.state.total > 0
                            ? (this.state.page - 1) * this.state.perPage + 1
                            : 0
                        }-${Math.min(
                          this.state.page * this.state.perPage,
                          this.state.total
                        )} of ${this.state.total}`
                      )}
                    </div>
                    <Bootstrap.Table
                      table-bordered
                      style={{ width: "90%", marginLeft: "5%" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">{this.highlightText("Author")}</th>
                          <th scope="col">{this.highlightText("Year Born")}</th>
                          <th scope="col">
                            {this.highlightText("Nationality")}
                          </th>
                          <th scope="col">{this.highlightText("Genres")}</th>
                          <th scope="col">{this.highlightText("On Tour")}</th>
                          <th scope="col">
                            {this.highlightText("Books Written")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {Object.keys(this.state.dataStore).map(this.mapData)} */}
                        {this.state.dataStore.map(this.mapData)}
                      </tbody>
                    </Bootstrap.Table>
                  </div>

                  <Pagination
                    defaultPage={1}
                    page={this.state.page}
                    onChange={(_, value) => {
                      this.updatePage(value);
                    }}
                    count={Math.ceil(this.state.total / this.state.perPage)}
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
              </Paper>
            </div>
          </Parallax>
        </div>
      </div>
    );
  }
}

export default Authors;
