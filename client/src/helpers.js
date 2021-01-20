export const total = (list) => {
  return list
    .reduce((total, product) => {
      return (total += product.price * product.quantity);
    }, 0)
    .toFixed(2);
};
