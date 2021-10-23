import React from "react";
import { forwardRef } from 'react';
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Authors.module.css";
import bgPhoto from "../../Assets/bgPhoto.jpg";
import { Parallax, Background } from "react-parallax";
import MaterialTable from "material-table";
import internal from "stream";
import { Link } from "react-router-dom";
import AddBox from '@material-ui/icons/AddBox';
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

type rowdata = {
  author: Link;
  yearBorn: number;
  nationality: string;
  sexuality: string;
  gender: string;
  books_Published: number;
};

const dataStore = [
  {
    author: <a href="/patricia-highsmith">Patricia Highsmith</a>,
    yearBorn: 1921,
    nationality: "American",
    sexuality: "Homosexual",
    gender: "Female",
    books_Published: 297,
  },
  {
    author: <a href="/michael-cunningham">Michael Cunningham</a>,
    yearBorn: 1952,
    nationality: "American",
    sexuality: "Homosexual",
    gender: "Male",
    books_Published: 48,
  },
  {
    author: <a href="/sarah-waters">Sarah Waters</a>,
    yearBorn: 1966,
    nationality: "Welsh",
    sexuality: "Homosexual",
    gender: "Female",
    books_Published: 31,
  },
];

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

type props = {};

type state = {};

class Authors extends React.Component<props, state> {
  state: state = {};

  render() {
    return (
      <div>
        <Header />
        <div>
          <Parallax strength={500} className={css.parrallaxCont}>
            <div style={{fontWeight:'bold'}}>
              <div className={css.titleText}> 
                <span style={{color: "#FF555E"}}>A</span>
                <span style={{color: "#FF8650"}}>u</span>
                <span style={{color: "#F6BE00"}}>t</span>
                <span style={{color: "#77C66E"}}>h</span>
                <span style={{color: "#83B2FF"}}>o</span>
                <span style={{color: "#9B6EF3"}}>r</span>
                <span style={{color: "#FC6C85"}}>s</span>
               </div>
              <Paper elevation={4} className={css.paperCont} data-testid = "authors">
                <MaterialTable
                  icons={tableIcons}
                  style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}
                  columns={[
                    { title: "Author", field: "author", type: "string" },
                    { title: "Year Born", field: "yearBorn", type: "numeric" },
                    {
                      title: "Nationality",
                      field: "nationality",
                      type: "string",
                    },
                    { title: "Sexuality", field: "sexuality", type: "string" },
                    { title: "Gender", field: "gender", type: "string" },
                    {
                      title: "Books Written",
                      field: "books_Published",
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

export default Authors;