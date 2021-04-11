// prettier-ignore
const mergeCoins = (list) => list.reduce((acc, cur) => {
  let accumulator = acc;
  // Get the index of the key-value pair.
  const occursIndex = accumulator.reduce(
    (n, item, i) => (item['coin/token'] === cur['coin/token'] ? i : n),
    -1,
  );

  // If the name is found,
  if (occursIndex >= 0) {
    // prettier-ignore
    // add the current unit/cost to previous occurrences' units/cost.
    accumulator[occursIndex].unit = Number(accumulator[occursIndex].unit) + Number(cur.unit);
    accumulator[occursIndex]['total cost'] = Number(accumulator[occursIndex]['total cost'])
      + Number(cur['total cost']);

    // Otherwise,
  } else {
    // add the current item to the accumulator
    accumulator = [...accumulator, cur];
  }

  return accumulator;
}, []);

export default mergeCoins;
