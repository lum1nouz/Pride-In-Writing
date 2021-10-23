import React from "react";
import { forwardRef } from 'react';
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Publishers.module.css";
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
                  icons={tableIcons}
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
