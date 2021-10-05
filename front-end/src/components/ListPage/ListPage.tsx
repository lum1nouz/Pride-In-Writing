import React from "react";
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./listPage.module.css";
import bgPhoto from "../../Assets/bgPhoto.jpg";
import { Parallax, Background } from "react-parallax";
import MaterialTable from "material-table";
import internal from "stream";
import { Link } from "react-router-dom";

type rowdata = {
  name: string;
  yearBorn: number;
  nationality: string;
  gender: string;
  lifespan: number;
};

const dataStore = [
  {
    name: "Lisa Alther",
    yearBorn: 1944,
    nationality: "American",
    gender: "Female",
    lifespan: 0,
  },
];

type props = {};

type state = {};

class ListPage extends React.Component<props, state> {
  state: state = {};

  render() {
    return (
      <div>
        <Header></Header>
        <div className={css.background}>
          <Parallax strength={500} className={css.parrallaxCont}>
            <div style={{}}>
              <div className={css.titleText}> Authors </div>
              <Paper elevation={4} className={css.paperCont}>
                <MaterialTable
                  style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}
                  columns={[
                    { title: "Name", field: "name", type: "string" },
                    { title: "Year Born", field: "yearBorn", type: "numeric" },
                    {
                      title: "Nationality",
                      field: "nationality",
                      type: "string",
                    },
                    { title: "Gender", field: "gender", type: "string" },
                    { title: "Lifespan", field: "lifespan", type: "numeric" },
                  ]}
                  data={dataStore}
                  title=""
                  actions={[
                    {
                      icon: () => <div>Here</div>,
                      tooltip: "Save User",
                      onClick: (event, rowData?) =>
                        alert("You saved " + (rowData as rowdata).name),
                    },
                  ]}
                  components={{
                    Action: (props) => (
                      // <Button
                      // onClick={(event) => props.action.onClick(event, props.data)}
                      // color="primary"
                      // variant="text"
                      // style={{ textTransform: "none" }}
                      // size="small"
                      // >
                      // Save
                      // </Button>
                      <Link to="/page"> Here</Link>
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

export default ListPage;
