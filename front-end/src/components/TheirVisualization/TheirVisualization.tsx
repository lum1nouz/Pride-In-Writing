import React from "react";
import Header from "../Header/Header";
import Grid from "@material-ui/core/Grid";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Label,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { ScatterChart, Scatter, LabelList } from "recharts";

// Code inspired by Music Now
// https://gitlab.com/brandtswan/musicnow/-/tree/dev/frontend/src/views/Visualizations/OurVisualizations

type Country = {
  area: string;
  city: city;
  coatOfArms: string;
  commonName: string;
  continent: string;
  currency: currency[];
  flag: string;
  id: number;
  language: language[];
  latitude: string;
  longitude: string;
  maps: string;
  officialName: string;
  population: string;
  region: string;
  subregion: string;
  timezone: timezone[];
};

type CovidData = {
  cases: number;
  country: country;
  country_id: number;
  deaths: number;
  id: number;
  lastCovidCase: string;
  recovered: number;
};

type language = {
  name: string;
};

type country = {
  commonName: string;
  officialName: string;
};

type currency = {
  name: string;
};

type timezone = {
  zone: string;
};

type city = {
  id: number;
  name: string;
};

type dataGraphOne = {
  continent: string;
  count: number;
};

type dataGraphTwo = {
  name: string;
  cases: number;
};

type props = {};

type state = {
  conData: dataGraphOne[];
  covData: dataGraphTwo[];
  thirdData: Country[];
};

class TheirVisualization extends React.Component<props, state> {
  state: state = {
    conData: [],
    covData: [],
    thirdData: [],
  };

  mapCountries(aut: Country[]) {
    console.log(aut);

    let retArray: dataGraphOne[] = [];

    aut.forEach(function (value) {
      let needToAdd = true;

      retArray.forEach(function (val2) {
        if (val2.continent === value.continent) {
          val2.count = val2.count + 1;
          needToAdd = false;
        }
      });

      if (needToAdd === true) {
        retArray.push({ continent: value.continent, count: 1 });
      }
    });
    return retArray;
  }

  mapCovid(aut: CovidData[]) {
    console.log(aut);

    let retArray: dataGraphTwo[] = [];

    aut.forEach(function (value) {
      let needToAdd = true;

      retArray.forEach(function (val2) {
        if (val2.name === value.country.commonName) {
          val2.cases = val2.cases + value.cases;
          needToAdd = false;
        }
      });

      if (needToAdd === true) {
        retArray.push({ name: value.country.commonName, cases: value.cases });
      }
    });
    return retArray;
  }

  async componentDidMount() {
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

    const covData: CovidData[] = await fetch(
      "https://api.crown19db.me/v1/models/covid/all"
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });

    console.log(countries);

    this.setState({
      conData: this.mapCountries(countries as Country[]),
      covData: this.mapCovid(covData),
      thirdData: countries as Country[],
    });
  }

  COLORS = [
    "#EE00FF",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF3333",
    "#AA0000",
  ];

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
              xs={12}
              style={{
                backgroundColor: "white",
                height: "100px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            ></Grid>

            <Grid
              item
              xs={12}
              style={{
                backgroundColor: "white",
                height: "600px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <ResponsiveContainer width="100%" height={600}>
                <BarChart
                  width={700}
                  height={600}
                  data={this.state.conData}
                  margin={{ top: 10, right: 50, left: 50, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="continent"></XAxis>
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                backgroundColor: "white",
                height: "600px",
                marginTop: "50px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <h3> Countries by Population </h3>

              <ResponsiveContainer width="100%" height={600}>
                <div>
                  <ScatterChart
                    width={600}
                    height={400}
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 40,
                    }}
                  >
                    <CartesianGrid />
                    <XAxis
                      type="category"
                      dataKey="commonName"
                      name="Countries"
                    />
                    <YAxis
                      type="number"
                      dataKey="population"
                      name="Population"
                    />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter
                      name="Population By Countries"
                      data={this.state.thirdData}
                      fill="#8884d8"
                    ></Scatter>
                  </ScatterChart>
                </div>
              </ResponsiveContainer>
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                backgroundColor: "white",
                height: "1200px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <h3> Cases by Country </h3>

              <ResponsiveContainer width="100%" height={1200}>
                <PieChart width={400} height={500}>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={this.state.covData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={false}
                    outerRadius={300}
                    fill="#8884d8"
                    dataKey="cases"
                  >
                    {this.state.covData.map((val, index) => (
                      <Cell
                        key={`cell-${val.cases}`}
                        fill={this.COLORS[index % this.COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid>
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="cases">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default TheirVisualization;
