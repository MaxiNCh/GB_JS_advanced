Vue.component('search', {
	props: ['search'],
	data() {
		return {
			searchValue: '',
		}
	},
	template: `
		<form action="#" class="search-form" @submit.prevent="$emit('search', searchValue)">
			<input type="text" class="search-field" @input="$emit('search', searchValue)" v-model="searchValue">
			<button class="btn-search" type="submit">
				<i class="fas fa-search"></i>
			</button>
		</form>
	`
}); 