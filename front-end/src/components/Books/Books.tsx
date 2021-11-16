// Inspired from https://gitlab.com/mehuldar/aroundtheworld/-/blob/main/front-end/src/screens/Demographics/DemographicsAll.js
// Around the World

import { useState, useEffect } from "react";
import { Paper, Button, Grid } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Books.module.css";
import { Pagination } from "@mui/material";
import { Parallax } from "react-parallax";
import Book from "../../models/book-model";
import BookCard from "./BookCard";
import { TextField, Select, MenuItem, SelectChangeEvent } from "@mui/material";

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

function Books(props: props) {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [page, setPage] = useState( !!parseInt(localStorage.getItem('pageNum') as string) ? parseInt(localStorage.getItem('pageNum') as string) : 1);
  const [oldPage, setOldPage] = useState(0);
  const [curFilter, setCurFilter] = useState<filter>({category: "", value: ""})
  const [curSort, setCurSort] = useState<sort>({category: "", value: ""})
  const [search, setSearch] = useState("")
  const perPage = 9

  useEffect(() => {

    const getBooks = async () => {
      setBookData(await getData());
    };

    const getBooksSearch = async () => {
    setBookData(await getDataForSearch(search));
    };

    localStorage.setItem('pageNum', JSON.stringify(page))

    //Page change triggers data fetch
    if(oldPage !== page) {
      if(search === "") {
        getBooks();
      }
      else {
        getBooksSearch()
      }
      setOldPage(page)
    }
  });


  //Calls API 
  async function getData() {
    const authors = await fetch("https://api.prideinwriting.me/api/books" + createApiString(""))
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return authors;
  }

    //Calls search route on API
    async function getDataForSearch(srch: string) {
      const authors = await fetch("https://api.prideinwriting.me/api/authors" + createApiString(srch))
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.log(err);
          return {};
        });
      return authors;
    }

  //Used to build API request
  function createApiString(str: string) {
    let filterString = ""
    let sortString = ""
    let searchString = ""
    if(this.state.curFilter.category !== "") {
      filterString = "&" + this.state.curFilter.category + "=" + this.state.curFilter.value
    }
    if(this.state.curSort.category !== "") {
      sortString = "&sort_by=" +this.state.curSort.category + "&direction=" + this.state.curSort.value
    }
    if(str !== "") {
      filterString = ""
      sortString = ""
      searchString = "&search=" + str.replace(" ", "+").replace(",", "") 
    }
    return "?perPage=" + this.state.perPage + "&page=" + this.state.page + searchString + filterString + sortString;
  }

  //Used by TextFields 
  //Changes state by key of user input
  function handleFilterChange(cat: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let newFilter: filter = {
      category: cat,
      value: event.target.value
    }
    setCurFilter(newFilter)
  }

  //Used by TextField
  //Submits Filtering requests by the enter key
  function handleEnterKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if(event.which === 13) {
      handleSubmit()
    }
  }

  //Used by Select components
  //Sets state to user choice 
  function handleSelectFilter(event: SelectChangeEvent<string>, cat: string) {
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
    
    setCurFilter(newFilter)
  }

  //Handles the submit button for updating the data
  //Changes page to trigger a reload
  function handleSubmit(){
    if(page === 1) {
      setOldPage(0)
    } else {
      setPage(1)
    }
  }

  //Logic used to indicate sorting order 
  //Starts at default order
  //First click sets to "desc" or descending order
  //Second click sets to "asc" or ascending order 
  function changeSort(col: number){
    let lookup = ["name", "genre", "year", "rating", "price", "pageCount"]
    let tempCategory = lookup[col]
    let tempValue = "desc"
    let check = curSort.value
    if(check === "desc" && tempCategory === curSort.category) {
      tempValue = "asc"
    } else if (check === "asc" && tempCategory === curSort.category){
      tempCategory = ""
      tempValue = ""
    }
    let newSort: sort = {
      category: tempCategory,
      value: tempValue
    }
    setCurSort(newSort)
  }

  //Used by search Text field
  //Updates state by keystroke for the search entry
  function handleSearchText(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setSearch(event.target.value)
  }

  //Calls API search
  async function handleSearch() {
    handleSubmit()
  }

  return (
    <div>
      <Header />
      <div>
        <Parallax strength={500} className={css.parrallaxCont}>
          <div style={{ fontWeight: "bold" }}>
            <div className={css.titleText}>
              <span style={{ color: "#FF555E" }}>B</span>
              <span style={{ color: "#FF8650" }}>o</span>
              <span style={{ color: "#F6BE00" }}>o</span>
              <span style={{ color: "#77C66E" }}>k</span>
              <span style={{ color: "#83B2FF" }}>s</span>
            </div>
            <Grid container spacing={5} style={{marginTop: 20}}>
                  <Grid item xs={9}>
                  </Grid>
                  <Grid item xs={2}>
                  <TextField variant="outlined" label="Search Books" onChange={(e) => handleSearchText(e)}> </TextField>
                  <Button onClick={() => {
                    handleSearch()
                    }} variant="outlined"> Search </Button>
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                </Grid>
            <Paper elevation={4} className={css.paperCont} data-testid="book44">
            <div>
                  <div className="filters">
                   <Grid container spacing={1}>
                   <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Title</h4>
                      <Button onClick={() => changeSort(0)} variant = "outlined"> Sort </Button>
                      <TextField label = "Filter by Title" variant = "outlined" onChange = {(e) => handleFilterChange("name", e)} onKeyPress = {(e) => handleEnterKey(e)}> </TextField>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Genre</h4>
                      <Button onClick={() => changeSort(2)} variant="outlined"> Sort </Button>
                      <Select
                            value="none"
                            label="Age"
                            onChange={(e) => handleSelectFilter(e, "genre")}
                          >
                      <MenuItem value={"true"}>Yes</MenuItem>
                      <MenuItem value={"false"}>No</MenuItem>
                      <MenuItem value={"none"}>Pick an option</MenuItem>
                    </Select>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Rating</h4>
                      <Button onClick={() => changeSort(2)} variant="outlined"> Sort </Button>
                      <TextField label = "Filter by Rating" variant = "outlined" onChange = {(e) => handleFilterChange("rating", e)} onKeyPress = {(e) => handleEnterKey(e)}> </TextField>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Price</h4>
                      <Button onClick={() => changeSort(3)} variant="outlined"> Sort </Button>
                      <TextField label = "Filter by Price" variant = "outlined" onChange = {(e) => handleFilterChange("price", e)} onKeyPress = {(e) => handleEnterKey(e)}> </TextField>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div style={{margin: 10}}>
                      <h4>Page Count</h4>
                      <Button onClick={() => changeSort(5)} variant="outlined"> Sort </Button>
                      <TextField label = "Filter by Page Count" variant = "outlined" onChange = {(e) => handleFilterChange("pageCount", e)} onKeyPress = {(e) => handleEnterKey(e)}> </TextField>
                    </div>
                    </Grid>
                    </Grid>
                  </div>

                <Grid container spacing={5} style={{marginTop: 20}}>
                  <Grid item xs={4}>
                  </Grid>
                  <Button onClick={() => {
                      handleSubmit()
                    }}
                    variant="outlined"> Get Filtered/Sorted Data </Button>
                  <Grid item xs={4}>
                  </Grid>
                </Grid>
              <div>
                <div className={css.cardGrid}>
                  {bookData.slice((page - 1) * 9, page * 9).map((book) => (
                    <BookCard book={book} search={search} />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 100,
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  Displaying {(page - 1) * 9 + 1} -
                  {Math.min(page * 9, props.dataLen)} of {props.dataLen}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 30,
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <Pagination
                      defaultPage={1}
                      page={page}
                      onChange={(event, value) => {
                        setPage(value)
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth",
                        })
                      }}
                      count={Math.ceil(props.dataLen / 9)}
                      variant="outlined"
                      color="primary"
                      style={{ alignSelf: "center" }}
                    />
                  </div>
                </div>
              </div>
              </div>
            </Paper>
          </div>
        </Parallax>
      </div>
    </div>
  );
}

export default Books;
