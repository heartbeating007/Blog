import Mock from 'mockjs';
Mock.mock('/api/setting', 'get', {
  code: 0,
  msg: '',
  data: {
    avatar:
      'https://img2.baidu.com/it/u=4126568663,2462169725&fm=253&fmt=auto&app=120&f=JPEG?w=420&h=640', //个人空间的头像
    siteTitle: 'heartbeating', //个人空间的标题
    github: 'https://github.com/', //空间主人的github地址
    qq: '786289616', //空间主人的qq号
    qqQrCode:
      'https://img2.baidu.com/it/u=4126568663,2462169725&fm=253&fmt=auto&app=120&f=JPEG?w=420&h=640', //空间主人的qq二维码
    weixin: 'heartbeating', //空间主人的微信
    weixinQrCode:
      'https://img2.baidu.com/it/u=4126568663,2462169725&fm=253&fmt=auto&app=120&f=JPEG?w=420&h=640', //空间主人的微信二维码
    mail: 'heartbeating@qq.com', //空间主人的邮箱
    icp: '京ICP备17001719号', //空间主人的备案号
    githubName: 'heartbeating', //空间主人的github名称
    favicon:
      'https://img2.baidu.com/it/u=4126568663,2462169725&fm=253&fmt=auto&app=120&f=JPEG?w=420&h=640' //网站的favicon地址
  }
});
