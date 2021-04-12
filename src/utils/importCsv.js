import * as DocumentPicker from 'expo-document-picker';

import Toast from 'react-native-toast-message';

import convertCsvToJSON from './convertCsvToJSON';

import validateCsvHeaders from './validateCsvHeaders';

const importCsv = async (validCsvHeaders) => {
  let convertedJSON = [];
  try {
    const doc = await DocumentPicker.getDocumentAsync();

    if (doc.type === 'success') {
      if (!doc.name.endsWith('.csv')) {
        throw new Error('Only Csv files are supported');
      }

      convertedJSON = await convertCsvToJSON(doc.uri);

      const csvHeaders = validateCsvHeaders(convertedJSON, validCsvHeaders);

      if (!csvHeaders.valid) {
        convertedJSON = [];
        throw new Error(
          `Selected Csv header structure is not supported\nExpected: ${validCsvHeaders.join(
            ',',
          )}\nSaw: ${csvHeaders.selected.join(',')}`,
        );
      }

      Toast.show({
        text1: `Imported: ${doc.name}`,
        visibilityTime: 3000,
      });
    }
  } catch (e) {
    Toast.show({
      type: 'error',
      text1: 'Import Failed',
      text2: e.toString(),
      visibilityTime: 6000,
    });
  }
  return convertedJSON;
};

export default importCsv;
