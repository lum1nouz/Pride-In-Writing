import React, { ReactElement } from "react";
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
import Publisher from "../../models/publisher-model";
import stringToIntegerList from "../../common"

type rowdata = {
  publisher: ReactElement;
  country: string;
  types: string;
  authorsPublished: number | undefined;
  founded: string;
  id: number
};

function mapData(data: Publisher[]){
  let newData: rowdata[] = []
  data.forEach(function(data) {(
    newData.push({
      publisher: <a id={"linkButton-" + data.publisher_id} href={"/publisher-" + data.publisher_id}> {data.name} </a>,
      country: data.headquarters,
      types: data.publication_types,
      authorsPublished: stringToIntegerList(data.author_connections).length,
      founded: data.founded,
      id: data.publisher_id
    })
  )})
  return newData
}

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

type state = {
  dataStore: rowdata[]
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
  return JSON.parse(publishers);
}

class Publishers extends React.Component<props, state> {
  constructor(props: props){
    super(props)

    this.state = {
      dataStore: []
    };
  }

  async componentDidMount() {
    this.setState({dataStore: mapData(await getData())}) 
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <Parallax strength={500} className={css.parrallaxCont}>
            <div style={{fontWeight:'bold'}}>
              <div className={css.titleText}> 
                <span style={{color: "#FF555E"}}>P</span>
                <span style={{color: "#FF8650"}}>u</span>
                <span style={{color: "#F6BE00"}}>b</span>
                <span style={{color: "#77C66E"}}>l</span>
                <span style={{color: "#83B2FF"}}>i</span>
                <span style={{color: "#9B6EF3"}}>s</span>
                <span style={{color: "#FC6C85"}}>h</span>
                <span style={{color: "#1167b1"}}>e</span>
                <span style={{color: "#FF555E"}}>r</span>
                <span style={{color: "#FF8650"}}>s</span>
              </div>
              <Paper elevation={4} className={css.paperCont} data-testid = "publishers">
                <MaterialTable
                  icons={tableIcons}
                  style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}
                  options={{
                    paging: true,
                    pageSize: 10,
                    pageSizeOptions: [],
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
