import Vue from 'vue'
import vueRouter from 'vue-router'

import Login from '../pages/login'
import Home from '../pages/home'
import Create from '../pages/create'
import Word from '../pages/word'
import My from '../pages/my'

Vue.use(vueRouter);

const router = new vueRouter({
    routes: [{
        path: '/',
        redirect: '/login',
    },{
        path: '/login',
        name: 'login',
        component: Login,
    },{
        path: '/home',
        name: 'home',
        component: Home,
    },{
        path: '/create',
        name: 'create',
        component: Create,
    },{
        path: '/word',
        name: 'word',
        component: Word,
    },{
        path: '/my',
        name: 'my',
        component: My,
    }]
});

export default router;