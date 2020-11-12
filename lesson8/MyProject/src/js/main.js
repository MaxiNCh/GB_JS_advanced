import headercomp from './header.js'
import {navcomp} from './nav.js'
import {promocomp} from './promo.js'
import {divisioncomp} from './division.js'
import {featuredcomp} from './featured.js'
import {offercomp} from './offer.js'
import {footercomp} from './footer.js'

const app = {
	el: '#app',
	components: {
		headercomp,
		navcomp,
		promocomp,
		divisioncomp,
		featuredcomp,
		offercomp,
		footercomp
	},
};

export default app;

