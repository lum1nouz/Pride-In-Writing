import React from "react";
import Header from "../Header/Header";
import Grid from "@material-ui/core/Grid";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label } from "recharts";

// Code inspired by Music Now
// https://gitlab.com/brandtswan/musicnow/-/tree/dev/frontend/src/views/Visualizations/OurVisualizations

type Country = {
    area: string,
    city: city,
    coatOfArms: string,
    commonName: string,
    continent: string,
    currency: currency[],
    flag: string,
    id: number,
    language: language[],
    latitude: string,
    longitude: string,
    maps: string,
    officialName: string,
    population: string,
    region: string,
    subregion: string,
    timezone: timezone[],
}

type CountryResponse = {
    count: number;
    data: Country[];
}

type language = {
    name: string;
}

type currency = {
    name: string;
}

type timezone = {
    zone: string
}

type city = {
    id: number
    name: string;
}

type dataGraphOne = {
  continent: string,
  count: number
}

// interface Country {
//     id: number;
//     area: number;
//     officialName: string;
//     population: number;
//     continent: string;
//     flag: string;
//     capital: City;
// }

// interface CountryResponse {
//     count: number;
//     data: Country[];
// }

// interface City {
//     name: string;
// }



type props = {};

type state = {
  conData: dataGraphOne[]
};

class TheirVisualization extends React.Component<props, state> {
  state: state = {
    conData: [],
  };

   mapCountries(aut: Country[]){

    console.log(aut)

     let retArray: dataGraphOne[] = []

     aut.forEach(function (value) {
      let needToAdd = true

       retArray.forEach(function (val2) {
         if(val2.continent === value.continent) {
           val2.count = val2.count + 1
           needToAdd = false
         }
       })

       if(needToAdd === true ){
         retArray.push({continent: value.continent, count: 1})
       }
     })
     return retArray
  }

  async componentDidMount(){
    const countries: Country[] = await fetch(
        "https://api.crown19db.me/v1/models/country/all" 
      )
        .then((response) => {

          return response.json();
        })
        .catch((err) => {
          console.log(err);
          return {};
        });

     console.log(countries)
    
      this.setState({
        conData: this.mapCountries(countries as Country[])
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
            <BarChart width={700} height={600} data={this.state.conData} margin={{top: 10, right: 50, left: 50, bottom: 50}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="continent"></XAxis>
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

export default TheirVisualization;