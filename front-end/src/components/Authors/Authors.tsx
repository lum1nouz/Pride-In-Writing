import React, { ReactElement } from "react";
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Authors.module.css";
import { Parallax } from "react-parallax";
import MaterialTable from "material-table";
import Author from "../../models/author-model";
import {stringToIntegerList, tableIcons} from "../../common";

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

type props = {};

type state = {
  dataStore: rowdata[];
  curSorts: sorts[]
};

async function getData() {
  const authors = await fetch(`https://api.prideinwriting.me/api/authors`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
  return authors;
}

class Authors extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      dataStore: [],
      curSorts: [sorts.default, sorts.default, sorts.default, sorts.default, sorts.default, sorts.default]
    };
  }

  async componentDidMount() {
    this.setState({ dataStore: await mapData(await getData()), curSorts: this.state.curSorts});
  }

  changeSort(col: number){
    let curSort = this.state.curSorts[col]
    let nextSort = curSort + 1
    if (curSort === 2) {
      nextSort = 0
    }
    let newSorts = []
    for(let i: number = 0; i < this.state.curSorts.length; i++) {
      if( i === col) {
        newSorts.push(nextSort)
      } else {
        newSorts.push(0)
      }
    }
    this.setState({ dataStore: this.state.dataStore, curSorts: newSorts});
  }



  render() {
    console.log(this.state.curSorts[0])
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
              <Paper
                elevation={4}
                className={css.paperCont}
                data-testid="authors"
              >
                <div>
                <div className="filters">
                  <div className="filter-block d-flex flex-row align-items-center mb-2">
                    <h4>Name</h4>
                    <Button onClick={() => this.changeSort(0)}> Sort </Button>
                  </div>
                  <div className="filter-block d-flex flex-row align-items-center mb-2">
                    <h4>Year Born</h4>
                    <Button onClick={() => this.changeSort(1)}> Sort </Button>
                  </div>
                  <div className="filter-block d-flex flex-row align-items-center mb-2">
                    <h4>Nationality</h4>
                    <Button onClick={() => this.changeSort(2)}> Sort </Button>
                  </div>
                  <div className="filter-block d-flex flex-row align-items-center mb-2">
                    <h4>Genres</h4>
                    <Button onClick={() => this.changeSort(3)}> Sort </Button>
                  </div>
                  <div className="filter-block d-flex flex-row align-items-center mb-2">
                    <h4>On Tour</h4>
                    <Button onClick={() => this.changeSort(4)}> Sort </Button>
                  </div>
                  <div className="filter-block d-flex flex-row align-items-center mb-2">
                    <h4>Books Published</h4>
                    <Button onClick={() => this.changeSort(5)}> Sort </Button>
                  </div>
                </div>


                <MaterialTable
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
