import React, { ReactElement } from "react";
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Authors.module.css";
import { Parallax } from "react-parallax";
import MaterialTable from "material-table";
import Author from "../../models/author-model";
import {stringToIntegerList, tableIcons} from "../../common";
import { TablePagination } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { TextField, Select, MenuItem, SelectChangeEvent } from "@mui/material";

enum sorts {
  default = 0,
  descending = 1,
  ascending = 2
}

type rowdata = {
  author: ReactElement;
  yearBorn: string | undefined;
  nationality: string;
  genres: string;
  onTour: string;
  books_published: number | undefined;
  id: number;
};

function mapData(data: Author[]) {
  let newData: rowdata[] = [];
  data.forEach(function (data) {
    newData.push({
      author: (
        <a
          id={"linkButton-" + data.author_id}
          href={"/author-" + data.author_id}
        >
          {" "}
          {data.author_name}{" "}
        </a>
      ),
      yearBorn: data.year_born,
      nationality: data.nationality,
      books_published: stringToIntegerList(data.book_connections).length,
      onTour: data.author_tour,
      genres: data.genre,
      id: data.author_id,
    });
  });
  return newData;
}

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
  dataStore: rowdata[];
  curFilter: filter;
  curSort: sort;
  perPage: number;
  page: number;
  search: string;
};


class Authors extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      dataStore: [],
      curSort: {
        category: "",
        value: ""
      },
      curFilter: {
        category: "",
        value: ""
      },
      perPage: 20,
      page: 0,
      search: "" 
    };
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  createApiString() {
    let returnString = ""
    let filterString = ""
    let sortString = ""

    if(this.state.curFilter.category !== "") {
      filterString = "?" + this.state.curFilter.category + "=" + this.state.curFilter.value
    }
    if(this.state.curSort.category !== "") {
      sortString = "?" + this.state.curSort.category + "=" + this.state.curSort.value
    }

    returnString = "?perPage=" + this.state.perPage + "?page=" + this.state.page + filterString + sortString

    return returnString;
  }

  async getData() {
    const authors = await fetch("https://api.prideinwriting.me/api/authors" + this.createApiString())
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return authors;
  }

  async getDataForSearch(search: string) {
    const authors = await fetch("https://api.prideinwriting.me/api/authors?search=" + search)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return authors;
  }

  async componentDidMount() {
    this.setState({ dataStore: mapData(await this.getData()), curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: this.state.page});
  }

  changeSort(col: number){
    let lookup = ["name", "yearBorn", "nationality", "genres", "onTour", "booksPublished"]
    let tempCategory = lookup[col]
    let tempValue = "desc"
    let check = this.state.curSort.value
    if(check === "desc" && tempCategory === this.state.curSort.category) {
      tempValue = "asc"
    } else if (check === "asc" && tempCategory === this.state.curSort.category){
      tempCategory = ""
      tempValue = ""
    }
    let newSort: sort = {
      category: tempCategory,
      value: tempValue
    }
    
    this.setState({ dataStore: this.state.dataStore, curSort: newSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: this.state.page, search: this.state.search});
  }

  handleFilterChange(cat: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let newFilter: filter = {
      category: cat,
      value: event.target.value
    }
    this.setState({ dataStore: this.state.dataStore, curSort: this.state.curSort, curFilter: newFilter, perPage: this.state.perPage, page: this.state.page, search: this.state.search});
  }

  handleEnterKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if(event.which === 13) {
      this.handleSubmit()
    }
  }

  handleSelectFilter(event: SelectChangeEvent<string>, cat: string) {
    let newFilter: filter = { 
      category: "",
      value: "",
    }
    if(event.target.value !== "none") {
      newFilter = { 
        category: cat,
        value: event.target.value
      }
    }
    
    this.setState({ dataStore: this.state.dataStore, curSort: this.state.curSort, curFilter: newFilter, perPage: this.state.perPage, page: this.state.page, search: this.state.search});
  }

  async handleSubmit(){
    this.setState({ dataStore: mapData(await this.getData()), curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: this.state.page, search: this.state.search});
  }

  handleSearchText(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({ dataStore: this.state.dataStore, curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: this.state.page, search: event.target.value});
  }

  async handleSearch() {
    this.setState({ dataStore: mapData(await this.getDataForSearch(this.state.search)), curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: this.state.page, search: this.state.search});
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
              <Grid container spacing={5} style={{marginTop: 20}}>
                  <Grid item xs={9}>
                  </Grid>
                  <Grid item xs={2}>
                  <TextField variant="outlined" label="Search Authors" onChange={(e) => this.handleSearchText(e)}> </TextField>
                  <Button onClick={() => this.handleSearch} variant="outlined"> Search </Button>
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
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
                    <div style={{margin: 10}}>
                      <h4>Name</h4>
                      <Button onClick={() => this.changeSort(0)} variant = "outlined"> Sort </Button>
                      <TextField label = "Filter by Name" variant = "outlined" onChange = {(e) => this.handleFilterChange("name", e)} onKeyPress = {(e) => this.handleEnterKey(e)}> </TextField>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Year Born</h4>
                      <Button onClick={() => this.changeSort(1)} variant="outlined"> Sort </Button>
                      <TextField label = "Filter by Name" variant = "outlined" onChange = {(e) => this.handleFilterChange("yearBorn", e)} onKeyPress = {(e) => this.handleEnterKey(e)}> </TextField>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Nationality</h4>
                      <Button onClick={() => this.changeSort(2)} variant="outlined"> Sort </Button>
                      <TextField label = "Filter by Name" variant = "outlined" onChange = {(e) => this.handleFilterChange("nationality", e)} onKeyPress = {(e) => this.handleEnterKey(e)}> </TextField>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Genres</h4>
                      <Button onClick={() => this.changeSort(3)} variant="outlined"> Sort </Button>
                      <Select
                            value="none"
                            label="Age"
                            onChange={(e) => this.handleSelectFilter(e, "genre")}
                          >
                      <MenuItem value={"true"}>Yes</MenuItem>
                      <MenuItem value={"false"}>No</MenuItem>
                      <MenuItem value={"none"}>Pick an option</MenuItem>
                    </Select>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>On Tour</h4>
                      <Button onClick={() => this.changeSort(4)} variant="outlined"> Sort </Button>
                      <Select
                            value="none"
                            label="Age"
                            onChange={(e) => this.handleSelectFilter(e, "onTour")}
                          >
                      <MenuItem value={"true"}>Yes</MenuItem>
                      <MenuItem value={"false"}>No</MenuItem>
                      <MenuItem value={"none"}>Pick an option</MenuItem>
                    </Select>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Books Written</h4>
                      <Button onClick={() => this.changeSort(5)} variant="outlined"> Sort </Button>
                      <TextField label = "Filter by Name" variant = "outlined" onChange = {(e) => this.handleFilterChange("booksPublished", e)} onKeyPress = {(e) => this.handleEnterKey(e)}> </TextField>
                    </div>
                    </Grid>
                    </Grid>
                  </div>

                <Grid container spacing={5} style={{marginTop: 20}}>
                  <Grid item xs={4}>
                  </Grid>
                  <Button onClick={() => this.handleSubmit} variant="outlined"> Get Filtered/Sorted Data </Button>
                  <Grid item xs={4}>
                  </Grid>
                </Grid>

                <MaterialTable
                  icons={tableIcons}
                  style={{ marginTop: 40, marginLeft: 20, marginRight: 20 }}
                  options={{
                    // paging: true,
                    pageSize: 15,
                    // pageSizeOptions: [],
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
                                rowsPerPageOptions={[15]}
                            rowsPerPage={15}
                            count={500}
                            page={0}
                            // onChangePage={(e, page) =>

                            // }
                            onChangeRowsPerPage={event => {
                              
                            }}
                          />
                        ),
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
