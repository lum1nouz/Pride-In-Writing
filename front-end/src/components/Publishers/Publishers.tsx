import React, { ReactElement } from "react";
import { Paper, Button, Grid, TextField } from "@material-ui/core";
import {  Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import { Pagination } from "@mui/material";
import * as Bootstrap from "react-bootstrap";
import Header from "../Header/Header";
import css from "./Publishers.module.css";
import { Parallax } from "react-parallax";
import MaterialTable from "material-table";
import Publisher from "../../models/publisher-model";
import {stringToIntegerList, tableIcons} from "../../common";

type rowdata = {
  publisher: ReactElement;
  country: string;
  types: string;
  authorsPublished: number | undefined;
  founded: string;
  id: number;
};

function mapData(data: Publisher[]) {
  let newData: rowdata[] = [];
  data.forEach(function (data) {
    newData.push({
      publisher: (
        <a
          id={"linkButton-" + data.publisher_id}
          href={"/publisher-" + data.publisher_id}
        >
          {" "}
          {data.name}{" "}
        </a>
      ),
      country: data.headquarters,
      types: data.publication_types,
      authorsPublished: stringToIntegerList(data.author_connections).length,
      founded: data.founded,
      id: data.publisher_id,
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

type props = {
  dataLen: number
};

type state = {
  dataStore: Publisher[];
  curFilter: filter;
  curSort: sort;
  perPage: number;
  page: number;
  search: string;
};

class Publishers extends React.Component<props, state> {
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
      perPage: 15,
      page: 1,
      search: "" 
    };
  }

  async componentDidMount() {
    let pageNum: number = 1
    pageNum = parseInt(localStorage.getItem('pageNum') as string)
    if (pageNum === null) {
      pageNum = 1
    }
    this.setState({ dataStore: this.state.dataStore, curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: pageNum });
    this.setState({ dataStore: await this.getData(), curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: this.state.page});
  }

  //Beware of using
  //State changes often with sorting/filtering
  componentDidUpdate() {
    // console.log(this.state)
    localStorage.setItem('pageNum', JSON.stringify(this.state.page))
  }

  mapData = (row: Publisher) => {
    const data = row;
    let authPublished = stringToIntegerList(data.author_connections).length
    return (
      <tr key={data.publisher_id}>
        <td>
          <a href={"/publisher-" + data.publisher_id}>
            {this.highlightText(data.name)}
          </a>
        </td>
        <td> {this.highlightText(data.origin + "")}</td>
        <td> {this.highlightText(data.publication_types)}</td>
        <td> {this.highlightText(authPublished.toString())}</td>
        <td> {this.highlightText(data.founded)}</td>
      </tr>
    );
  }

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
  };

  //Calls API 
  async getData() {
    console.log("https://api.prideinwriting.me/api/publishers" + this.createApiString(""))
    const publishers = await fetch("https://api.prideinwriting.me/api/publishers" + this.createApiString(""))
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return publishers;
  }

  //Used to build API request
  createApiString(str: string) {
    let filterString = ""
    let sortString = ""
    let searchString = ""
    if(this.state.curFilter.category !== "" && this.state.curFilter.value !== "") {
      filterString = ("&" + this.state.curFilter.category + "=" + this.state.curFilter.value).replace(" ", "~")
    }
    if(this.state.curSort.category !== "") {
      let directionField = "&direction=" + this.state.curSort.value
      // if(this.state.curSort.value === "ascend") {
      //   directionField = ""
      // }
      sortString = "&sort_by=" +this.state.curSort.category + directionField
    }
    if(str !== "") {
      filterString = ""
      sortString = ""
      searchString = "&search=" + str.replace(" ", "+").replace(",", "") 
    }
    return "?perPage=" + this.state.perPage + "&page=" + this.state.page + searchString + filterString + sortString;
  }

  //Calls search route on API
  async getDataForSearch(search: string) {
    const authors = await fetch("https://api.prideinwriting.me/api/publishers" + this.createApiString(search))
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return authors;
  }

  //Logic used to indicate sorting order 
  //Starts at default order
  //First click sets to "desc" or descending order
  //Second click sets to "asc" or ascending order 
  changeSort(col: number){
    let lookup = ["name", "origin", "publication_types", "author_connections", "founded"]
    let tempCategory = lookup[col]
    let tempValue = "descend"
    let check = this.state.curSort.value
    if(check === "descend" && tempCategory === this.state.curSort.category) {
      tempValue = "ascend"
    } else if (check === "ascend" && tempCategory === this.state.curSort.category){
      tempCategory = ""
      tempValue = ""
    }
    let newSort: sort = {
      category: tempCategory,
      value: tempValue
    }
    
    this.setState({ dataStore: this.state.dataStore, curSort: newSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: this.state.page, search: this.state.search});
  }

  //Used by TextFields 
  //Changes state by key of user input
  handleFilterChange(cat: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let newFilter: filter = {
      category: cat,
      value: event.target.value
    }
    this.setState({ dataStore: this.state.dataStore, curSort: this.state.curSort, curFilter: newFilter, perPage: this.state.perPage, page: this.state.page, search: this.state.search});
  }

  //Used by TextField
  //Submits Filtering requests by the enter key
  handleEnterKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if(event.which === 13) {
      this.handleSubmit()
    }
  }

  //Used by Select components
  //Sets state to user choice 
  handleSelectFilter(event: SelectChangeEvent, cat: string) {
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

  //Handles the submit button for updating the data
  async handleSubmit(){
    this.setState({ dataStore: await this.getData(), curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: this.state.page, search: this.state.search});
  }

  //Used by search Text field
  //Updates state by keystroke for the search entry
  handleSearchText(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({ dataStore: this.state.dataStore, curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: this.state.page, search: event.target.value});
  }

  //Calls API search
  async handleSearch() {
    this.setState({ dataStore: await this.getDataForSearch(this.state.search), curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: this.state.page, search: this.state.search});
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <Parallax strength={500} className={css.parrallaxCont}>
            <div style={{ fontWeight: "bold" }}>
              <div className={css.titleText}>
                <span style={{ color: "#FF555E" }}>P</span>
                <span style={{ color: "#FF8650" }}>u</span>
                <span style={{ color: "#F6BE00" }}>b</span>
                <span style={{ color: "#77C66E" }}>l</span>
                <span style={{ color: "#83B2FF" }}>i</span>
                <span style={{ color: "#9B6EF3" }}>s</span>
                <span style={{ color: "#FC6C85" }}>h</span>
                <span style={{ color: "#1167b1" }}>e</span>
                <span style={{ color: "#FF555E" }}>r</span>
                <span style={{ color: "#FF8650" }}>s</span>
              </div>
              <Grid container spacing={5} style={{marginTop: 20}}>
                  <Grid item xs={9}>
                  </Grid>
                  <Grid item xs={2}>
                  <TextField variant="outlined" label="Search Publishers" onChange={(e) => this.handleSearchText(e)}> </TextField>
                  <Button onClick={() => {
                    this.setState({ dataStore: this.state.dataStore, curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: 1, search: this.state.search})
                    this.handleSearch()
                    }} variant="outlined"> Search </Button>
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                </Grid>
              <Paper
                elevation={4}
                className={css.paperCont}
                data-testid="publishers"
              >
                <div>
                  <div>
                   <Grid container spacing={1}>
                   <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Publishers</h4>
                      <Button id={"nameSort"} onClick={() => this.changeSort(0)} variant = "outlined"> Sort </Button>
                      <TextField label = "Filter by Name" variant = "outlined" onChange = {(e) => this.handleFilterChange("name", e)} onKeyPress = {(e) => this.handleEnterKey(e)}> </TextField>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Country of Origin</h4>
                      <Button onClick={() => this.changeSort(1)} variant="outlined"> Sort </Button>
                      <TextField label = "Filter by Country" variant = "outlined" onChange = {(e) => this.handleFilterChange("origin", e)} onKeyPress = {(e) => this.handleEnterKey(e)}> </TextField>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Publication Types</h4>
                      <Button onClick={() => this.changeSort(2)} variant="outlined"> Sort </Button>
                      <Select
                            value="none"
                            label="Age"
                            onChange={(e) => this.handleSelectFilter(e, "publication_types")}
                          >
                      <MenuItem value={"books"}>Books</MenuItem>
                      <MenuItem value={"textbooks"}>Textbooks</MenuItem>
                      <MenuItem value={"magazine"}>Magazine</MenuItem>
                      <MenuItem value={"academic"}>Academic Resources</MenuItem>
                      <MenuItem value={"journals"}>Journals</MenuItem>
                      <MenuItem value={"none"}>Pick an option</MenuItem>
                    </Select>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Authors Published</h4>
                      <Button onClick={() => this.changeSort(3)} variant="outlined"> Sort </Button>
                      <TextField label = "Filter by Authors Published" variant = "outlined" onChange = {(e) => this.handleFilterChange("author_connections", e)} onKeyPress = {(e) => this.handleEnterKey(e)}> </TextField>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Year Founded</h4>
                      <Button onClick={() => this.changeSort(4)} variant="outlined"> Sort </Button>
                      <TextField label = "Filter by Year Founded" variant = "outlined" onChange = {(e) => this.handleFilterChange("founded", e)} onKeyPress = {(e) => this.handleEnterKey(e)}> </TextField>
                    </div>
                    </Grid>
                    </Grid>
                  </div>

                <Grid container spacing={5} style={{marginTop: 20}}>
                  <Grid item xs={4}>
                  </Grid>
                  <Button onClick={() => {
                    this.setState({ dataStore: this.state.dataStore, curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: 1, search: this.state.search})
                      this.handleSubmit()
                    }} variant="outlined"> Get Filtered/Sorted Data </Button>
                  <Grid item xs={4}>
                  </Grid>
                </Grid>

                {/* <MaterialTable
                  icons={tableIcons}
                  style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}
                  options={{
                    paging: true,
                    pageSize: 10,
                    pageSizeOptions: [],
                    search: false,
                    sorting: false
                  }}
                  onRowClick={(_, data) =>
                    (window.location.href = "/publisher-" + data?.id)
                  }
                  columns={[
                    { title: "Publisher", field: "publisher", type: "string" },
                    {
                      title: "Country of Origin",
                      field: "country",
                      type: "string",
                    },
                    {
                      title: "Publication Types",
                      field: "types",
                      type: "string",
                    },
                    {
                      title: "Authors Published",
                      field: "authorsPublished",
                      type: "string",
                    },
                    {
                      title: "Year Founded",
                      field: "founded",
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

                        <h2 className="header">Publishers</h2>
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
                                              this.props.dataLen > 0 ? (this.state.page - 1) * 10 + 1 : 0
                                            }-${Math.min(
                                              this.state.page * 10,
                                              this.props.dataLen
                                            )} of ${this.props.dataLen}`
                                          )}
                                        </div>
                                        <Bootstrap.Table
                                          table-bordered
                                          style={{ width: "90%", marginLeft: "5%" }}
                                        >
                                          <thead>
                                            <tr>
                                              <th scope="col">{this.highlightText("Publisher")}</th>
                                              <th scope="col">{this.highlightText("Country of Origin")}</th>
                                              <th scope="col">{this.highlightText("Publication Types")}</th>
                                              <th scope="col">{this.highlightText("Authors Published")}</th>
                                              <th scope="col">{this.highlightText("Year Founded")}</th>
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
                              this.setState({ dataStore: this.state.dataStore, curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: value, search: this.state.search})
                              if(this.state.search === ""){
                                this.handleSubmit()
                               } else{
                                this.handleSearch()
                               }
                            }}
                            count={Math.ceil(this.props.dataLen / this.state.perPage)}
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

export default Publishers;
