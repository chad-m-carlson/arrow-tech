export const determineCalculatedDosimeterRange = (dosimeterRange, isR,  isMr, isSv, isMsv, ) => {
  if(isR){
    return `${dosimeterRange/1000} R`
  }else if (isMr){
    return `${dosimeterRange} mR`
  }else if (isSv){
    return  `${dosimeterRange/10000} sV`
  }else if (isMsv) {
    return `${dosimeterRange/100} mSv`
  };
};

export const convertValueReadToMr = (valueRead, isR,  isMr, isSv, isMsv) => {
  if(isR){
    valueRead = valueRead * 1000
  }else if (isMsv){
    valueRead = valueRead * 100
  }else if (isSv){
    valueRead = valueRead * 10000
  }else valueRead = valueRead
  return valueRead
};