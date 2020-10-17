const products = [
  { id: 1, title: 'Notebook', price: 20000 },
  { id: 2, title: 'Mouse', price: 1500 },
  { id: 3, title: 'Keyboard', price: 5000 },
  { id: 4, title: 'Gamepad', price: 4500 },
];

const renderProduct = (title, price, id = 10) => {
  return `<div class="product-item">
            <img class="product-item__img" src="https://picsum.photos/id/${id}/150" alt="">
            <h3 class="product-item__h3">${title}</h3>
            <p class="product-item__p">${price}</p>
            <button class="product-item__btn">Добавить в корзину</button>
          </div>`;
};

const renderProducts = (list) => {
  const productList = list.map(item => renderProduct(item.title, item.price, item.id));
  document.querySelector('.products').innerHTML = productList.join('');
};

renderProducts(products);