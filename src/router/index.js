//Landing and Home
import Landing from '@/views/Landing.vue'
import Home from '@/views/Home.vue'
import List from '@/views/List.vue'
import Edit from '@/views/Edit.vue'
//Account matters
import LogIn from '@/views/LogIn.vue'
import LogOut from '@/views/LogOut.vue'
import Registration from '@/views/Registration.vue'
import ForgetPassword from '@/views/ForgetPassword.vue'
// Tips Page
import Tips from '@/views/Tips.vue'
import StorageGuide from '@/views/StorageGuide.vue'
import Recipes from '@/views/Recipes.vue'
// Shopping List Page
import ShoppingList from '@/views/ShoppingList.vue'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)
export default new Router ({
    routes: [
    {
        path: '/',
        name: 'Landing',
        component: Landing 
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home 
    },
    {
        path:'/list',
        name: 'List',
        component: List
    },
    {
        path: '/editlist',
        name: 'EditList',
        component: Edit
    },
    {
        path: '/Login',
        name: 'LogIn',
        component: LogIn 
    },
    {
        path: '/LogOut',
        name: 'LogOut',
        component: LogOut 
    },
    {
        path: '/Registration',
        name: 'Registration',
        component: Registration 
    },
    {
        path: '/ForgetPassword',
        name: 'ForgetPassword',
        component: ForgetPassword 
    },
    {
        path: '/Tips',
        name: 'Tips',
        component: Tips 
    },
    {
        path: '/StorageGuide',
        name: 'StorageGuide',
        component: StorageGuide 
    },
    {
        path: '/Recipes',
        name: 'Recipes',
        component: Recipes 
    },
    {
        path: '/ShoppingList',
        name: 'ShoppingList',
        component: ShoppingList 
    },

]
})
