// https://gitlab.com/mehuldar/aroundtheworld/-/blob/main/front-end/src/screens/Demographics/DemographicsAll.js
// Around the World 

import React, { useState, forwardRef, useEffect} from "react";
import { Paper } from "@material-ui/core";
import Header from "../Header/Header";
import css from './Books.module.css';
import { Pagination } from "@mui/material";
import { Parallax, Background } from "react-parallax";
import AddBox from '@material-ui/icons/AddBox';
import useAxios from "axios-hooks";
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Book from '../../models/book-model'
import BookCard from './BookCard'

const tableIcons = {
  Add: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
};

function Books() {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [page, setPage] = useState(1);

  async function getData() {
    const authors = await fetch(`https://api.prideinwriting.me/api/books`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
    return authors as Book[];
  }

  
  useEffect(() => {

    const getBooks = async () => {
      setBookData(await getData())
    }
    getBooks()
  }, []);

  

    return (
      <div>
        <Header />
        <div>
          <Parallax strength={500} className={css.parrallaxCont}>
            <div style={{fontWeight:'bold'}}>
              <div className={css.titleText}> 
                <span style={{color: "#FF555E"}}>B</span>
                <span style={{color: "#FF8650"}}>o</span>
                <span style={{color: "#F6BE00"}}>o</span>
                <span style={{color: "#77C66E"}}>k</span>
                <span style={{color: "#83B2FF"}}>s</span>
              </div>
              <Paper elevation={4} className={css.paperCont} data-testid = "books">

              <div>
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
                onChange={(event, value) => setPage(value)}
                count={Math.ceil(bookData.length / 9)}
                variant="outlined"
                color="primary"
                style={{ alignSelf: "center" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              flex: 1,
              justifyContent: "center",
            }}
          >
            Displaying {(page - 1) * 9 + 1}-
            {Math.min(page * 9, bookData.length)} of{" "}
            {bookData.length}
          </div>
          <div className={css.cardGrid}>
            {bookData.slice((page - 1) * 9, page * 9).map((book) => (
              <BookCard book={book} />
            ))}
          </div>
        </div>




              
              {/* <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Card variant="outlined" style={{width: 300}}>
                      <CardContent>
                        <h2><a id="linkButton-0" href="/books-0">The Hours</a></h2>
                        <p>Author: Michael Cunningham</p>
                        <p>Genre: Fiction</p>
                        <p>Publisher: Farrar</p>
                        <p>Year Published: 1988</p>
                        <p>Rating: 4.4</p>
                        <p>Pages: 230</p>
                        <p>Price: 11.79</p>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined" style={{width: 300}}>
                      <CardContent>
                        <h2><a href="/fingersmith">Fingersmith</a></h2>
                        <p>Author: Sarah Waters</p>
                        <p>Genre: Fiction</p>
                        <p>Publisher: Virago Press</p>
                        <p>Year Published: 2002</p>
                        <p>Rating: 4</p>
                        <p>Pages: 596</p>
                        <p>Price: 16.89</p>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined" style={{width: 300}}>
                      <CardContent>
                        <h2><a href="/the-price-of-salt">The Price of Salt</a></h2>
                        <p>Author: Patricia Highsmith</p>
                        <p>Genre: Fiction</p>
                        <p>Publisher: G. P. Putnam's Sons</p>
                        <p>Year Published: 1952</p>
                        <p>Rating: 4.5</p>
                        <p>Pages: 304</p>
                        <p>Price: 13.69</p>
                      </CardContent>
                    </Card>
                  </Grid>

              </Grid>  */}

               </Paper>
             </div>
           </Parallax>
         </div>
       </div>
    );
  }

export default Books;
