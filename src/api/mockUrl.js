//是否使用mock数据
let mock=true;

//转换请求路径,请求mock数据
let mockUrls=[
  {
    url: '/synway-auth/synchList',
    mockUrl: '/mock/synchList',
  },
  {
    url: '/synway-auth/saveTaskPop',
    mockUrl: '/mock/synch',
  },
  {
    url: '/synway-auth/delSynch',
    mockUrl: '/mock/delSynch',
  },
  {
    url: '/synway-auth/synch',
    mockUrl: 'mock/synch',
  },
  {
    url: '/synway-auth/getSetItem',
    mockUrl: '/mock/getSetItem',
  },
  {
    url: '/synway-auth/queryForPage?nameSpace=ClassificationMapper&sqlId=selectAllByInput',
    mockUrl: '/mock/classifySearch'
  }
];

let filterUrl=function (url) {
  if(!mock) {
    return url;
  }
  for (let i = 0; i < mockUrls.length; i++) {
    if (mockUrls[i].url === url) {
      return mockUrls[i].mockUrl;
    }
  }
  return url;
}
export default filterUrl;
