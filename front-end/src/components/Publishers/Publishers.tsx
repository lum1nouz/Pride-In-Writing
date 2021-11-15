import React, { ReactElement } from "react";
import { Paper, Button } from "@material-ui/core";
import { TablePagination } from "@material-ui/core";
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
  dataStore: rowdata[];
  curFilter: filter;
  curSort: sort;
  perPage: number;
  page: number;
  search: string;
};

async function getData() {
  const publishers = await fetch(`https://api.prideinwriting.me/api/publishers`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
  return publishers;
}

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
      page: 0,
      search: "" 
    };
  }

  async componentDidMount() {
    this.setState({ dataStore: mapData(await this.getData()), curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: this.state.page});
  }

    //Calls API 
  async getData() {
    const authors = await fetch("https://api.prideinwriting.me/api/publishers" + this.createApiString())
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
  createApiString() {
    let filterString = ""
    let sortString = ""
    if(this.state.curFilter.category !== "") {
      filterString = "?Filter" + this.state.curFilter.category + "=" + this.state.curFilter.value
    }
    if(this.state.curSort.category !== "") {
      sortString = "?Sort" + this.state.curSort.category + "=" + this.state.curSort.value
    }
    return "?perPage=" + this.state.perPage + "?page=" + this.state.page + filterString + sortString;
  }

  //Handles the submit button for updating the data
  async handleSubmit(){
    this.setState({ dataStore: mapData(await this.getData()), curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: this.state.perPage, page: this.state.page, search: this.state.search});
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
              <Paper
                elevation={4}
                className={css.paperCont}
                data-testid="publishers"
              >
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
                                 this.handleSubmit()
                             }}
                            onChangeRowsPerPage={event => {
                              this.setState({ dataStore: this.state.dataStore, curSort: this.state.curSort, curFilter: this.state.curFilter, perPage: +event.target.value, page: this.state.page, search: this.state.search})
                            }}
                          />
                        ),
                              }}
                />
              </Paper>
            </div>
          </Parallax>
        </div>
      </div>
    );
  }
}

export default Publishers;
