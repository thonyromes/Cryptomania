import * as FileSystem from 'expo-file-system';

import csvtojson from 'csvtojson';

const convertCsvToJSON = async (csvFile) => {
  let convertedCsvToJson = null;
  try {
    // read csv file and convert to string
    const csvString = await FileSystem.readAsStringAsync(csvFile);

    // convert csv string to json
    convertedCsvToJson = await csvtojson().fromString(csvString);
  } catch (e) {
    console.log(e);
  }

  return convertedCsvToJson;
};

export default convertCsvToJSON;
