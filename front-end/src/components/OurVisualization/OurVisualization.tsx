import React from "react";
import Header from "../Header/Header";
import { Grid } from "@material-ui/core";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { ScatterChart, Scatter, LabelList } from "recharts";
import Author from "../../models/author-model";
import Publisher from "../../models/publisher-model";
import Book from "../../models/book-model";

// Code inspired by Music Now
// https://gitlab.com/brandtswan/musicnow/-/tree/dev/frontend/src/views/Visualizations/OurVisualizations

type autResponse = {
  data: Author[];
  count: number;
};

type bookResponse = {
  data: Book[];
  count: number;
};

type pubResponse = {
  data: Publisher[];
  count: number;
};

type dataGraphOne = {
  nat: string;
  count: number;
};

type dataGraphTwo = {
  coa: string;
  count: number;
};

type dataGraphThree = {
  label: string;
  value: number;
};

type props = {};

type state = {
  autData: dataGraphOne[];
  pubData: dataGraphTwo[];
  bookData: dataGraphThree[];
};

class OurVisualization extends React.Component<props, state> {
  state: state = {
    autData: [],
    pubData: [],
    bookData: [],
  };
  private myRef: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
  }

  mapAuthors(aut: Author[]) {
    let retArray: dataGraphOne[] = [];
    aut.forEach(function (value) {
      let needToAdd = true;
      retArray.forEach(function (val2) {
        if (val2.nat === value.nationality) {
          val2.count = val2.count + 1;
          needToAdd = false;
        }
      });
      if (needToAdd === true) {
        retArray.push({ nat: value.nationality, count: 1 });
      }
    });
    return retArray;
  }

  mapPublishers(pub: Publisher[]) {
    let retArray: dataGraphTwo[] = [];
    pub.forEach(function (value) {
      let needToAdd = true;
      retArray.forEach(function (val2) {
        if (val2.coa === value.origin) {
          val2.count = val2.count + 1;
          needToAdd = false;
        }
      });
      if (needToAdd === true) {
        retArray.push({ coa: value.origin, count: 1 });
      }
    });
    return retArray;
  }

  mapBooks(book: Book[]) {
    let retArray: dataGraphThree[] = [];
    book.forEach(function (value) {
      let needToAdd = true;
      retArray.forEach(function (val2) {
        if (val2.label === value.avg_rating + "") {
          val2.value = val2.value + 1;
          needToAdd = false;
        }
      });
      if (needToAdd === true) {
        retArray.push({ label: value.avg_rating + "", value: 1 });
      }
    });
    return retArray;
  }

  async componentDidMount() {
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

    const publishers: pubResponse = await fetch(
      "https://api.prideinwriting.me/api/publishers"
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });

    const books: bookResponse = await fetch(
      "https://api.prideinwriting.me/api/books"
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });

    this.setState({
      autData: this.mapAuthors(authors.data),
      pubData: this.mapPublishers(publishers.data),
      bookData: this.mapBooks(books.data),
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
              <h3> Nationality by Author </h3>
              <ResponsiveContainer width="100%" height={600}>
                <BarChart
                  width={700}
                  height={600}
                  data={this.state.autData}
                  margin={{ top: 10, right: 50, left: 50, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nat"></XAxis>
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
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <h3> Country of Origin by Publisher </h3>

              <ResponsiveContainer width="100%" height={600}>
                <PieChart width={300} height={300}>
                  <Legend
                    payload={this.state.pubData.map((item, index) => ({
                      id: item.coa,
                      type: "square",
                      value: `${item.coa} (${item.count})`,
                      color: this.COLORS[index % this.COLORS.length],
                    }))}
                  />
                  <Pie
                    data={this.state.pubData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={true}
                    outerRadius={200}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {this.state.pubData.map((val, index) => (
                      <Cell
                        key={`cell-${val.count}`}
                        fill={this.COLORS[index % this.COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
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
              <h3> Rating by Book </h3>

              <ResponsiveContainer width="100%" height={600}>
                <div>
                  <ScatterChart
                    width={600}
                    height={400}
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <CartesianGrid />
                    <XAxis type="category" dataKey="label" name="Rating" />
                    <YAxis type="number" dataKey="value" name="Count" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter
                      name="Rating by Book"
                      data={this.state.bookData}
                      fill="#8884d8"
                    ></Scatter>
                  </ScatterChart>
                </div>
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

export default OurVisualization;
