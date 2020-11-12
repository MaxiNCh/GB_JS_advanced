const headercomp = {
	template: `
		<header class="header center">
			<div class="header__left">
				<a href="#" class="logo"><img class="logo__img" alt="logo" src="img/logo.png">BRAN<span class="logo__span">D</span></a>
				<form class="header__form" action="#">
					<div class="header__browse">Browse <i class="arrow-down"></i>
						<div class="drop drop_browse drop_block">
							<div class="drop__col">
								<h3 class="drop__h3">Women</h3>
								<ul class="drop__ul">
									<li><a href="./index.html" class="drop__link">Dresses</a></li>
									<li><a href="#" class="drop__link">Tops</a></li>
									<li><a href="#" class="drop__link">Sweaters/Knits</a></li>
									<li><a href="#" class="drop__link">Jackets/Coats</a></li>
									<li><a href="#" class="drop__link">Blazers</a></li>
									<li><a href="#" class="drop__link">Denim</a></li>
									<li><a href="#" class="drop__link">Leggings/Pants</a></li>
									<li><a href="#" class="drop__link">Skirts/Shorts</a></li>
									<li><a href="#" class="drop__link">Accessories</a></li>
								</ul>
								<h3 class="drop__h3">Men</h3>
								<ul class="drop__ul">
									<li><a href="#" class="drop__link">Tees/Tank tops</a></li>
									<li><a href="#" class="drop__link">Shirts/Polos</a></li>
									<li><a href="#" class="drop__link">Sweaters</a></li>
									<li><a href="#" class="drop__link">Sweatshirts/Hoodies</a></li>
									<li><a href="#" class="drop__link">Blazers</a></li>
									<li><a href="#" class="drop__link">Jackets/vests</a></li>
								</ul>
							</div>
						</div>
					</div>
					<input class="header__input" type="text">
					<button type="button" class="header__search"><img src="img/search.png" alt="search"></button>
				</form>
			</div>
			<div class="header__right">
				<div class="header__drop"><a href="./cart.html"><img class="header__cart" src="img/cart.png" alt="cart"></a>
					<div class="drop drop_block drop__cart drop_sm-pad">
						<div class="drop__col">
							<div class="drop__row">
								<a href="#"><img src="./img/cart-item1.png" alt="cart-item"></a>
								<div class="drop__body">
									<a href="#">
										<h4 class="drop__h4">Rebox Zane</h4>
									</a>
									<p class="drop__cart-p">1 x $250</p>
								</div>
								<button class="remove-btn"><i class="fas fa-times-circle"></i></button>
							</div>
							<div class="drop__row">
								<a href="#"><img src="./img/cart-item2.png" alt="cart-item"></a>
								<div class="drop__body">
									<a href="#">
										<h4 class="drop__h4">Rebox Zane</h4>
									</a>
									<p class="drop__cart-p">1 x $250</p>
								</div>
								<button class="remove-btn"><i class="fas fa-times-circle"></i></button>
							</div>
							<div class="drop__price">
								<h2 class="drop__h2">total</h2>
								<h2 class="drop__h2">$500.00</h2>
							</div>
							<a href="./checkout.html" class="drop__btn drop__btn_orange">Checkout</a>
							<a href="./cart.html" class="drop__btn">Go to cart</a>
						</div>
					</div>
				</div>
				<a href="#" class="button">My Account <i class="arrow-down"></i></a>
			</div>
		</header>
	`
};

export default headercomp;