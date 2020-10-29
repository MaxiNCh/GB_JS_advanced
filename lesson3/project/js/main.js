const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не использовать fetch а Promise
let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error');
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send();
  })
};

// –--------------------------------

class ProductList {
  #goods;

  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this._allProducts = [];

    // this._fetchGoods();
    this.#getProducts().then((data) => {
      this.#goods = [...data];
      // this.#goods = Array.from(data);
      this.#render();

      //добавляем обрабочтик при клике на кнопку
      document.querySelectorAll('.buy-btn').forEach((el) => {
        el.addEventListener('click', (event) => {
          let productId = event.target.parentElement.parentElement.dataset.id;
          cartList.pushProductToCart(productId);
        })
       })

    });

    console.log(this.sum());
  }

  // _fetchGoods() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     console.log(data);
  //     this.#goods = JSON.parse(data);
  //     this.#render();
  //     console.log(this.#goods);
  //   });
  // }

  #getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then(response => response.json())
        .catch((error) => {
          console.log(error);
        });
  }

  get allProducts() {
    if (this._allProducts) {
      return this._allProducts;
    }
  }

  sum() {
    return this.#goods.reduce((sum, { price }) => sum + price, 0);
  }

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);

      this._allProducts.push(productObject);

      block.insertAdjacentHTML('beforeend', productObject.getGoodHTML());
    }
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  getGoodHTML() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
            </div>`;
  }
}

class CartProducts {
  constructor() {
    // В переменной productsInCart будет храниться массив товаров, которые попали в корзину
    this.productsInCart = [];

   
    // возможно еще метод render нужно будет добавлять, т.к. чтобы формировать список.
  }

  // метод, который добавляет товар в корзину. Передаем в качестве параметров каталога все продуктов, и id продукта, который добавляем. По этому id находим нужный продукт и добавляем его в корзину.
  pushProductToCart(products, id) {
    for (const product of products) {
      if (product.id == id) {
        this.productsInCart.push(product);
      }
    }
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

const list = new ProductList();
const cartList = new CartProducts();

