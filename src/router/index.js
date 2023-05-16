import { createRouter, createWebHistory } from "vue-router";

import store from "@/store";
import Layout from "@/layout/index.vue";
import nestedRouter from "./modules/nested";

// 通用页面，不需要权限控制
const constRouter = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        children: [],
        meta: { hidden: true, } // hidden 用来判断导航菜单栏忽略选项
    },

    {
        path: '',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/home/index.vue'),
                meta: { title: 'Home', icon: 'LaptopOutlined' },
            },

            {
                path: '/table',
                name: 'Table',
                component: () => import('@/views/table/index.vue'),
                meta: { title: 'Table', icon: 'TableOutlined' },
            },

            {
                path: '/crypto-js',
                name: 'CryptoJs',
                component: () => import('@/views/cryptoJs/index.vue'),
                meta: { title: 'CryptoJs', icon: 'InsuranceOutlined' },
            },
            {
                path: '/directive',
                name: 'Directive',
                component: () => import('@/views/directives/index.vue'),
                meta: { title: 'Directive', icon: 'TableOutlined' },
            },
            nestedRouter
        ],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constRouter
});

router.beforeEach((to, from, next) => {
    if (to.path === '/home' && from.path === '/') {
        // 更新store中的数据
        store.commit('setTabsList', [{
            name: to.name,
            path: to.path,
            fullPath: [to.path]
        }])
        store.commit('setSelectKeys', [to.path])
    }
    next()
})

export default router;
