const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
	el: '#app',
	data: {
		catalogUrl: '/catalogData.json',
		products: [],
		imgCatalog: 'https://placehold.it/200x150',
		searchValue: '',
		isVisibleCart: false,
		isCartEmpty: true
	},
	methods: {
		getJson(url) {
			return fetch(url)
				.then(result => result.json())
				.catch(error => {
					console.log(error);
				})
		},
		addProduct(product) {
			console.log(product.id_product)
		},
		filterGoods(event, value) {
			event.preventDefault();
			console.log(value);
			let regExp = new RegExp(value, 'i');
			if (value.length > 2) {
				this.products.forEach(product => {
					if (!regExp.test(product.product_name)) {
						product.isVisible = false;
					} else {
						product.isVisible = true;
					}
				})
			} else {
				this.products.forEach(product => {
					product.isVisible = true;
				})
			}
		},
		toggleCart() {
			this.isVisibleCart = !this.isVisibleCart;
		}
	},
	beforeCreate() {
		console.log('beforeCreate');
	},
	created() {
		console.log('created');
		this.getJson(`${API}${this.catalogUrl}`)
			.then(data => {
				for (el of data) {
					el.isVisible = true;
					this.products.push(el);
				}
			});
	},
	beforeMount() {
		console.log('beforeMount');
	},
	mounted() {
		console.log('mounted');
	},
	beforeUpdate() {
		console.log('beforeUpdate');
	},
	updated() {
		console.log('updated');
	},
	beforeDestroy() {
		console.log('beforeDestroy');
	},
	destroyed() {
		console.log('destroyed');
	},
});