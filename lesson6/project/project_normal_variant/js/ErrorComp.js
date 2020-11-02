Vue.component('error-comp', {
	props: ['error'],
	template: `
		<div id="myModal" class="modal">
		  <!-- Modal content -->
		  <div class="modal-content">
		    <span class="close" @click="$emit('close')">&times;</span>
		    <p>There is an error of connection: {{ error }}</p>
		  </div>
		</div>
	`
})