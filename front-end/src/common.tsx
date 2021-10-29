import React from "react";

function stringToIntegerList(str: string | undefined): number[] {
  if (typeof str === "undefined") {
    return [];
  }
  let s = str as string;
  let temp: string[] = [];
  temp = s.split(",");
  let temp2: number[] = [];
  let counter = 0;
  temp.forEach(function (x) {
    temp2.push(parseInt(temp[counter], 10));
    counter += 1;
  });
  return temp2;
}

export default stringToIntegerList;
