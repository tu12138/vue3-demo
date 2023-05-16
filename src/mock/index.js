import Mock from 'mockjs';

Mock.mock('/api/login', (req) => {
    return {
        code: 200,
        msg: '登录成功',
        token: 'joaaohiefuopieeaskfoefeop',
        data: {
            userName: JSON.parse(req.body).userName,
            // avatar: Mock.Random.image(),
            // avatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
            avatar: 'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180614/194dfa4c229d460f97b26259d895fdbb.gif'
        },
    }
})

Mock.mock('/api/goodlists', (req) => {
    return {
        code: 200,
        data: {
            list: {
                order_info: [
                    {
                        id: 1,
                        status: 4,
                        name: 'zhangsna',
                        date: '2016-05-03',
                        address: 'No. 189, Grove St, Los Angeles',
                        children: [
                            {
                                sku_id: 1,
                                status: 2,
                                img_path: 'https://n.sinaimg.cn/translate/320/w640h480/20180418/e3iG-fzihnep3936683.gif'
                            },
                            {
                                sku_id: 2,
                                status: 2,
                                img_path: 'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180614/194dfa4c229d460f97b26259d895fdbb.gif'
                            },
                            {
                                sku_id: 3,
                                status: 2,
                                img_path: 'https://n.sinaimg.cn/translate/320/w640h480/20180418/e3iG-fzihnep3936683.gif'
                            },
                            {
                                sku_id: 4,
                                status: 2,
                                img_path: 'https://n.sinaimg.cn/translate/320/w640h480/20180418/e3iG-fzihnep3936683.gif'
                            }
                        ]
                    },
                    {
                        id: 2,
                        status: 2,
                        name: 'Tom',
                        date: '2016-05-03',
                        address: 'No. 189, Grove St, Los Angeles',
                        children: [
                            {
                                sku_id: 1,
                                status: 2,
                                img_path: 'https://n.sinaimg.cn/translate/320/w640h480/20180418/e3iG-fzihnep3936683.gif'
                            },
                            {
                                sku_id: 2,
                                status: 2,
                                img_path: 'https://n.sinaimg.cn/translate/320/w640h480/20180418/e3iG-fzihnep3936683.gif'
                            },
                            {
                                sku_id: 3,
                                status: 2,
                                img_path: 'https://n.sinaimg.cn/translate/320/w640h480/20180418/e3iG-fzihnep3936683.gif'
                            },
                            {
                                sku_id: 4,
                                status: 2,
                                img_path: 'https://n.sinaimg.cn/translate/320/w640h480/20180418/e3iG-fzihnep3936683.gif'
                            },
                            {
                                sku_id: 5,
                                status: 2,
                                img_path: 'https://n.sinaimg.cn/translate/320/w640h480/20180418/e3iG-fzihnep3936683.gif'
                            }
                        ]
                    }
                ]
            }
        }
    }
})