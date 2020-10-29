const API = 'https://raw.githubusercontent.com/MaxiNCh/online-store-api/master/responses/';
class List {
	constructor() {
		this._goods = [];
	}

	_fetchProducts(url) {
		return fetch(url).then(response => response.json());
	}

	_render(goods, element) {
		const block = document.querySelector(element);

		for (let product of goods) {
			const productObject = new ProductItem(product);
			block.insertAdjacentHTML('beforeend', productObject.renderProduct());
		}
	}

	_addProducts(newGoods) {
		if (this._goods.length == 0) {
			this._goods = newGoods;
		} else {
			this._goods = [this._goods, ...newGoods];
		}
		this._render(this._goods, this.parentElement);
	}
}

class Products extends List {
	constructor(cart, parentElement = '.products', fileName = 'catalogData.json') {
		super();
		this.parentElement = parentElement;
		this.cart = cart;
		
		this._allProducts = [];
		this._catalogUrl = API + fileName;
		this._addProductsBounded = this._addProducts.bind(this);
		this._fetchProducts(this._catalogUrl).then(this._addProductsBounded);
		this._init();
		this._filtered = [];
	}

	filter(value) {
		const regExp = new RegExp(value, 'i');
		this._filtered = this._goods.filter(product => regExp.test(product.product_name));
		this._goods.forEach(el => {
      const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
      if(!this._filtered.includes(el)){
        block.classList.add('invisible');
      } else {
        block.classList.remove('invisible');
      }
    })
	}

	_init() {
		document.querySelector(this.parentElement).addEventListener('click', (event) => {
			if (event.target.classList.contains('product-item__btn')) {
				let productId = event.target.dataset.id;
				let productToAdd = this._goods.find(el => el.id_product == productId);
				this.cart.pushProductToCart(productToAdd);
			}
		});
		document.querySelector('.header__search-btn').addEventListener('click', (e) => {
			e.preventDefault();
			let filterValue = document.querySelector('.header__input').value;
			if (filterValue.length > 2) {
				this.filter(filterValue);
			} else {
				this.filter('');
			}
		});
		document.querySelector('.header__input').onchange = () => {
			let filterValue = document.querySelector('.header__input').value;
			if (filterValue.length > 2) {
				this.filter(filterValue);
			} else {
				this.filter('');
			}
		}


	}

}

class ProductItem {
	constructor(product) {
		this.title = product.product_name;
		this.price = product.price;
		this.id = product.id_product;
	}

	renderProduct() {
		return `
			<div class="product-item" data-id="${this.id}">
				<img class="product-item__img" src="https://picsum.photos/id/${this.id}/150" alt="img">
				<h3 class="product - item__h3 ">${this.title}</h3> 
				<p class = "product-item__p">${this.price} &#8381</p> 
				<button data-id="${this.id}" class="product-item__btn">Добавить в корзину</button>
			</div>`;
}
}

class CartProducts extends List {
	constructor(parentElement = '.cart__body', fileName = 'addToBasket.json') {
		super();
		this.parentElement = parentElement;

		this._catalogUrl = API + fileName;
		this._productsInCart = [];
		this._fetchProducts(this._catalogUrl).then(data => this._addArrayOfProducts)

		this._init();
	}

	_addArrayOfProducts(array) {
		if (array) {
			document.querySelector('.cart__empty').classList.add('invisible')
		}
		for (let product of array) {
			this.pushProductToCart(product, this._productsInCart);
		}
	}
	// метод, который добавляет товар в корзину. 
	pushProductToCart(product) {
		document.querySelector('.cart__empty').classList.add('invisible');
		document.querySelector('.header__cart-btn').classList.add('yellow');
		let productsInCart = this._productsInCart;
		let productId = product.id_product;
		let productInCart = productsInCart.find(product => product.id_product == productId);
		if (productInCart) {
			productInCart.quantity++;
			this.update(product);
		} else {
			product.quantity = 1;
			productsInCart.push(product);
			const newObject = new ItemInCart(product);      
			document.querySelector(this.parentElement).insertAdjacentHTML('beforeend', newObject.render(product));
		} 
	};

	update(product) {
		let block = document.querySelector(`.cart__item[data-id="${product.id_product}"]`);
		block.querySelector('.cart__item-qty').textContent = `Количество: ${product.quantity}`;
		block.querySelector('.cart__item-price').textContent = `Стоимость: ${product.quantity * product.price} \u20BD`;
	}

	decreaseProductQty(id) {
		let product = this._productsInCart.find(product => product.id_product == id);
		product.quantity--;
		if (product.quantity) {
			this.update(product)
		} else {
			this.removeProduct(product);
		}
	}

	removeProduct(product) {
		document.querySelector(`.cart__item[data-id="${product.id_product}"]`).remove();
		let index = this._productsInCart.indexOf(product);
		this._productsInCart.splice(index, 1);
		if (!this._productsInCart.length) {
			document.querySelector('.cart__empty').classList.remove('invisible');
			document.querySelector('.header__cart-btn').classList.remove('yellow');
		}
	}

	// рассчитывает суммарную стоимость товаров в корзину
	calculatePrice() {
		cartProducts = this.productsInCart;
		let sum;
		for (const product of cartProducts) {
			sum += product.price;
		}
		return sum;
	}

	_init() {
		document.querySelector('.header__cart-btn').addEventListener('click', (e) => {
			document.querySelector('.cart').classList.toggle('invisible');
		});
		document.querySelector('.cart').addEventListener('click', (e) => {
			if (e.path.find(el => el.className == 'cart__remove-btn')) {
				let productId = e.target.dataset.id;
				this.decreaseProductQty(productId);
			}
		})
	}

}

class ItemInCart {
	constructor(product) {
		this.title = product.product_name;
		this.price = product.price;
		this.id = product.id_product;
		this.quantity = 1;
	}
	// аналогично ProductItem будет рендериться продукт на странице корзины.
	render(product) {
		return `
		<div data-id=${this.id} class="cart__item">
			<img class="cart__img" src="https://picsum.photos/id/${this.id}/50" alt="img">
			<div class="cart__item-text">
				<h5 class="cart__item-name">${this.title}</h5>
				<p class="cart__item-qty">Количество: ${this.quantity}</p>
				<p class="cart__item-price">Стоимость: ${this.quantity * this.price} &#8381</p>

			</div>
			<button data-id=${this.id} class="cart__remove-btn"><i data-id=${this.id} class="fas fa-trash-alt"></i></button>
		</div>`
	};
}

class Validation {
	constructor() {
		this._name = '';
		this._phone = '';
		this._email = '';
		this._init();
}

	_validation(regExp, input) {
		if (!regExp.test(input.value) && (input.value.length > 0)) {
			input.classList.add('not-valid');
		} else {
			input.classList.remove('not-valid');
		}
	}
	_nameValidation(name) {
		const regExp = /^[a-zа-я]{3,}$/i;
		this._validation(regExp, name);
	}

	_phoneValidation(phone) {
		const regExp = /^\+7\(\d{3}\)\d{3}-\d{4}/;
		this._validation(regExp, phone);
	}

	_emailValidation(email) {
		const regExp = /^[\w.-]{3,20}@[a-z]{2,8}.(ru|com)/i;
		this._validation(regExp, email);
	}

	_init() {
		const nameInput = document.forms['responseForm']['name'];
		const phoneInput = document.forms['responseForm']['phone'];
		const emailInput = document.forms['responseForm']['mail'];
		nameInput.onchange = () => {
			this._nameValidation(nameInput);
		}
		phoneInput.onchange = () => {
			this._phoneValidation(phoneInput);
		}
		emailInput.onchange = () => {
			this._emailValidation(emailInput);
		}
	}

}

const cart = new CartProducts();
const products = new Products(cart);
const responseValidation = new Validation();

