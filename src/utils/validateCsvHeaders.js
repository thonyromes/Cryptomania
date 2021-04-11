const validateCsvHeaders = (csv, headers) => {
  // get headers of first object
  const selectedCsvHeaders = Object.keys(csv[0]);

  // check if every valid header exists and their length equals to selected csv headers
  // prettier-ignore
  const headersValid = headers.every((header) => selectedCsvHeaders.includes(header))
      && headers.length === selectedCsvHeaders.length;

  return {
    valid: headersValid,
    selected: selectedCsvHeaders,
  };
};

export default validateCsvHeaders;
