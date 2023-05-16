const nested = {
    path: '/nested',
    name: 'Nested',
    meta: { title: 'Nested Routes', icon: 'LaptopOutlined' },
    children: [
        {
            path: '/nested/menu1',
            component: () => import('@/views/nested/menu1/index.vue'),
            name: 'Menu1',
            meta: { title: 'Menu1', icon: 'LaptopOutlined' },
            children: [
                {
                    path: '/nested/menu1/menu1-1',
                    component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
                    name: 'Menu1-1',
                    meta: { title: 'Menu1-1', icon: 'LaptopOutlined' }
                },
                {
                    path: '/nested/menu1/menu1-2',
                    component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
                    name: 'Menu1-2',
                    meta: { title: 'Menu1-2', icon: 'LaptopOutlined' }
                }
            ]
        },
        {
            path: '/nested/menu2',
            component: () => import('@/views/nested/menu2/index.vue'),
            name: 'Menu2',
            meta: { title: 'Menu2', icon: 'LaptopOutlined' }
        }
    ]
}

export default nested