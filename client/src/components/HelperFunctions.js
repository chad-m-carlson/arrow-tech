import React from "react";
export const determineCalculatedDosimeterRange = (
  dosimeterRange,
  isR,
  isMr,
  isSv,
  isMsv
) => {
  if (isR) {
    return `${dosimeterRange / 1000} R`;
  } else if (isMr) {
    return `${dosimeterRange} mR`;
  } else if (isSv) {
    return `${dosimeterRange / 10000} sV`;
  } else if (isMsv) {
    return `${dosimeterRange / 100} mSv`;
  }
};

export const convertValueReadToMr = (valueRead, isR, isMr, isSv, isMsv) => {
  if (isR) {
    valueRead = valueRead * 1000;
  } else if (isMsv) {
    valueRead = valueRead * 100;
  } else if (isSv) {
    valueRead = valueRead * 10000;
  } else valueRead = valueRead;
  return valueRead;
};

export const printUnit = (isR, isMr, isSv, isMsv) => {
  if (isR) return "R";
  else if (isMr) return "mR";
  else if (isSv) return "sV";
  else return "mSv";
};

export const printDate = dateToBePrinted => {
  let date = new Date(dateToBePrinted);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const renderPassFail = (tested, value) => {
  if (tested && value) return "Pass";
  else if (tested && !value) return "FAIL";
  else return <i>Not Tested</i>;
};

export const subtractDates = (dateOut, dateIn) => {
  const difference = Math.abs(dateOut - dateIn);
  return Math.ceil(difference / (1000 * 60 * 60 * 24));
};
