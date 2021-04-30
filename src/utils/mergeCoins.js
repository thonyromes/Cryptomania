// const mergeCoins = (list) => list.reduce((acc, cur) => {
//   let accumulator = acc;
//   // Get the index of the key-value pair.
//   const occursIndex = accumulator.reduce(
//     (n, item, i) => (item['coin/token'] === cur['coin/token'] ? i : n),
//     -1,
//   );

//   // If the name is found,
//   if (occursIndex >= 0) {
//     // prettier-ignore
//     // add the current unit/cost to previous occurrences' units/cost.
//     accumulator[occursIndex].unit = Number(accumulator[occursIndex].unit) + Number(cur.unit);
//     accumulator[occursIndex]['total cost'] = Number(accumulator[occursIndex]['total cost'])
//       + Number(cur['total cost']);

//     // Otherwise,
//   } else {
//     // add the current item to the accumulator
//     accumulator = [...accumulator, cur];
//   }

//   return accumulator;
// }, []);

const mergeCoins = (list) => {
  const coins = [...list];

  const merge = {};

  let obj;

  coins.forEach((coin) => {
    obj = merge[coin['coin/token']] || {};

    // prettier-ignore
    if (obj['coin/token'] === coin['coin/token']) {
      merge[coin['coin/token']].unit = Number(merge[coin['coin/token']].unit) + Number(coin.unit);
      merge[coin['coin/token']]['total cost'] = Number(merge[coin['coin/token']]['total cost'])
        + Number(coin['total cost']);
    } else {
      merge[coin['coin/token']] = coin;
    }
  });

  return Object.values(merge);
};

export default mergeCoins;
