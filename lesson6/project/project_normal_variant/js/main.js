const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const app = new Vue({
    el: '#app',
    data: {
        isError: false,
        connectionError: ''
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => {
                    if (!result.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return result.json()
                })
                .catch(error => {
                    console.log(error);
                    this.isError = true;
                    this.connectionError = error;
                })
        },
        closeModal() {
            this.isError = false;
        }
    },
    mounted() {
        console.log(this);
    }
});

