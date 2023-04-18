// export function declensionSapphire(count: number): string {
//   const word = 'сапфир';
//   let result = '';

//   if (count % 10 === 1 && count % 100 !== 11) {
//     result = `${word}`;
//   } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
//     result = `${word}а`;
//   } else {
//     result = `${word}ов`;
//   }

//   return result;
// }

export function declineSubscription(count: number): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return count % 100 > 4 && count % 100 < 20
    ? 'подписок'
    : ['подписка', 'подписки', 'подписок'][count % 10 < 5 ? cases[count % 10] : 2];
}

export function declineSapphire(count: number): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return count % 100 > 4 && count % 100 < 20
    ? 'сапфиров'
    : ['сапфир', 'сапфира', 'сапфиров'][count % 10 < 5 ? cases[count % 10] : 2];
}


