class Products {

  constructor(parentElement = '.products') {
    this.parentElement = parentElement;
    this._goods = [];

    this._receiveGoods();
    this._render();
  }

  _receiveGoods() {
    this._goods = [
      { id: 1, title: 'Notebook', price: 20000 },
      { id: 2, title: 'Mouse', price: 1500 },
      { id: 3, title: 'Keyboard', price: 5000 },
      { id: 4, title: 'Gamepad', price: 4500 },
    ];
  }
  _render() {
    const block = document.querySelector(this.parentElement);

    for (let product of this._goods) {
      const productObject = new ProductItem(product);
      block.insertAdjacentHTML('afterbegin', productObject.renderProduct());
    }
  }

  calculatePrice() {
    const products = this._goods;
    let sum = 0;
    for (const product of products) {
      sum += product.price;
    }
    return sum;
  }
}

class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
  }

  renderProduct() {
    return `<div class="product-item" data-id="${this.id}">
              <img class="product-item__img" src="https://picsum.photos/id/${this.id}/150" alt="img">
              <h3 class="product - item__h3 ">${this.title}</h3> 
              <p class = "product-item__p">${this.price} &#8381</p> 
              <button class = "product-item__btn">Добавить в корзину</button>
            </div>`;
  }
}

class CartProducts {
  constructor() {
    // В переменной productsInCart будет храниться массив товаров, которые попали в корзину
    this.productsInCart = [];

    // возможно еще метод render нужно будет добавлять, т.к. чтобы формировать список.
  }

  // метод, который добавляет товар в корзину. Вероятно по нажатию кнопки "добавить в корзину"
  pushProductToCart() {};

  // рассчитывает суммарную стоимость товаров в корзину
  calculatePrice() {
    cartProducts = this.productsInCart;
    let sum;
    for (const product of cartProducts) {
      sum += product.price;
    }
    return sum;
  }

  // функция аналогичная данной функции в классе Products
  _render() {

  }
}

class ItemInCart {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
  }
  // аналогично ProductItem будет рендериться продукт на странице корзины.
  render() {};
}

const products = new Products();

console.log(products.calculatePrice());

// const products = [
//   { id: 1, title: 'Notebook', price: 20000 },
//   { id: 2, title: 'Mouse', price: 1500 },
//   { id: 3, title: 'Keyboard', price: 5000 },
//   { id: 4, title: 'Gamepad', price: 4500 },
// ];

// const renderProduct = (title, price, id = 10) => {
//   return `<div class="product-item">
//             <img class="product-item__img" src="https://picsum.photos/id/${id}/150" alt="">
//             <h3 class="product-item__h3">${title}</h3>
//             <p class="product-item__p">${price}</p>
//             <button class="product-item__btn">Добавить в корзину</button>
//           </div>`;
// };

// const renderProducts = (list) => {
//   const productList = list.map(item => renderProduct(item.title, item.price, item.id));
//   document.querySelector('.products').innerHTML = productList.join('');
// };

// renderProducts(products);f