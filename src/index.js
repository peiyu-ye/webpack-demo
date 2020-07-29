import Vue from 'vue';
import router from './router'
import App from './App.vue';
import './icons'

new Vue({
    render: h => h(App),
    router: router,  
}).$mount('#app')
