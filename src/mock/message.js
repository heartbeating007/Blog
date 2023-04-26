import Mock from 'mockjs';
import qs from 'querystring';

Mock.mock('/api/message', 'post', {
  code: 0,
  msg: '',
  data: {
    id: '@guid',
    nickname: '@cname',
    content: '@cparagraph(1, 10)',
    createDate: Date.now(),
    'avatar|1': [
      'https://ww4.sinaimg.cn/mw690/0064RSADly1h9n80wujhjj30u00u0q6j.jpg',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F03%2F20200603102532_ikVzn.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1677856281&t=810443c6378fc9da002454bd81bc239e',
      'https://img2.baidu.com/it/u=3217093043,2045983727&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F28%2F20210628001932_2d9a7.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1677856312&t=890361f415646bd7d9fac6fe484f5deb'
    ]
  }
});

Mock.mock(/^\/api\/message\/?(\?.+)?$/, 'get', function (options) {
  const query = qs.parse(options.url);

  return Mock.mock({
    code: 0,
    msg: '',
    data: {
      total: 52,
      [`rows|${query.limit || 10}`]: [
        {
          id: '@guid',
          nickname: '@cname',
          content: '@cparagraph(1, 10)',
          createDate: Date.now(),
          'avatar|1': [
            'https://ww4.sinaimg.cn/mw690/0064RSADly1h9n80wujhjj30u00u0q6j.jpg',
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F03%2F20200603102532_ikVzn.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1677856281&t=810443c6378fc9da002454bd81bc239e',
            'https://img2.baidu.com/it/u=3217093043,2045983727&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F28%2F20210628001932_2d9a7.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1677856312&t=890361f415646bd7d9fac6fe484f5deb'
          ]
        }
      ]
    }
  });
});
