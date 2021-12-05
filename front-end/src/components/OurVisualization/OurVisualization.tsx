import React from "react";
import Header from "../Header/Header";
import Grid from "@material-ui/core/Grid";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label } from "recharts";
import Author from "../../models/author-model"

// Code inspired by Music Now
// https://gitlab.com/brandtswan/musicnow/-/tree/dev/frontend/src/views/Visualizations/OurVisualizations

type autResponse = {
  data: Author[]
  count: number
}

type dataGraphOne = {
  nat: string,
  count: number
}

type props = {};

type state = {
  autData: dataGraphOne[]
};

class OurVisualization extends React.Component<props, state> {
  state: state = {
    autData: [],
  };

   mapAuthors(aut: Author[]){
     let retArray: dataGraphOne[] = []
     aut.forEach(function (value) {
      let needToAdd = true
       retArray.forEach( function (val2) {
         if(val2.nat === value.nationality) {
           val2.count = val2.count + 1
           needToAdd = false
         }
       })
       if(needToAdd === true ){
         retArray.push({nat: value.nationality, count: 1})
       }
     })
     return retArray
  }

  async componentDidMount(){
    const authors: autResponse = await fetch(
      "https://api.prideinwriting.me/api/authors" 
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
      
      this.setState({
        autData: this.mapAuthors(authors.data)
      });
  }



  private myRef: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return (
      <div>
        <div>
          <Header></Header>
        </div>

        <div>
          <Grid container spacing={2} style={{ position: "relative" }}>
            <Grid
              item
              xs={7}
              style={{
                backgroundColor: "white",
                height: "100px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >

          </Grid>
        <ResponsiveContainer width="100%" height={600}>
            <BarChart width={700} height={600} data={this.state.autData} margin={{top: 10, right: 50, left: 50, bottom: 50}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nat"></XAxis>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>

            
            </Grid>
            <div style={{ paddingTop: 40 }}>
              <p style={{ color: "white", textAlign: "center" }}>
                Copyright &copy; 2021 Pride In Writing
              </p>
            </div>
          </div>
        </div>
    );
  }
}

export default OurVisualization;