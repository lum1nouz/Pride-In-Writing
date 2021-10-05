import React from "react";
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Publishers.module.css";
import bgPhoto from "../../Assets/bgPhoto.jpg";
import { Parallax, Background } from "react-parallax";
import MaterialTable from "material-table";
import internal from "stream";
import { Link } from "react-router-dom";

type rowdata = {
  publisher: Link;
  country: string;
  types: string;
  authorsPublished: string;
  founded: number;
};

const dataStore = [
  {
    publisher: <a href="/putnam">G. P. Putnam's Sons</a>,
    country: "United States",
    types: "Books",
    authorsPublished: "29+",
    founded: 1838,
  },
  {
    publisher: <a href="/farrar">Farrar, Straus and Giroux</a>,
    country: "United States",
    types: "Books",
    authorsPublished: "27+",
    founded: 1946,
  },
  {
    publisher: <a href="/putnam">Virago Press</a>,
    country: "United Kingdom",
    types: "Books, Women's Writing",
    authorsPublished: "20+",
    founded: 1973,
  },
];

type props = {};

type state = {};

class ListPage extends React.Component<props, state> {
  state: state = {};

  render() {
    return (
      <div>
        <Header />
        <div className={css.background}>
          <Parallax strength={500} className={css.parrallaxCont}>
            <div style={{}}>
              <div className={css.titleText}> Publishers </div>
              <Paper elevation={4} className={css.paperCont}>
                <MaterialTable
                  style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}
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
                  data={dataStore}
                  title=""
                />
              </Paper>
            </div>
          </Parallax>
        </div>
      </div>
    );
  }
}

export default ListPage;
