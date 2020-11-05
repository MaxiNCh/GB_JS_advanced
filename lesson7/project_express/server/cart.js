const stats = require('./stats.js');

const add = (cart, req) => {
  cart.contents.push(req.body);
  stats.addToStats('add', req.body.product_name);
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  // const find = cart.contents.find(el => el.id_product === +req.params.id);
  const findIndex = cart.contents.findIndex(el => el.id_product === +req.params.id);
  cart.contents[findIndex].quantity += req.body.quantity;

  if (req.body.quantity > 0) {
    stats.addToStats('add', cart.contents[findIndex].product_name);
  } else if (req.body.quantity < 0) {
    stats.addToStats('del', cart.contents[findIndex].product_name);
  }
  
  if (cart.contents[findIndex].quantity === 0) {
    cart.contents.splice(findIndex, 1);
  }
  // Записываем в файл добавляем или удаляем продукт.
  

  return JSON.stringify(cart, null, 4);
};
// const del = (cart, req) => {
//   const findIndex = cart.contents.findIndex(el => el.id_product === +req.params.id);
//   if (cart[findIndex].quantity > 0) {
//     cart[findIndex].quantity += req.body.quantity;
//   } else {

//   }
//   return JSON.stringify(cart, null, 4);
// };

module.exports = {
  add,
  change,
};
