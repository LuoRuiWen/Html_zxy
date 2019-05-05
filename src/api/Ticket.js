import * as API from './'

export default{
  load:params=>{
    return API.GET("list",params);
  },
  findBySname:params=>{
    return API.GET("findBySname",params);
  },
  findByTname:params=>{
    return API.GET("findByTname",params);
  }
  // delete:params=>{
  //   return API.DELETE("delClassify",params);
  // },
  // add:params=>{
  //   return API.POST("addClassify",params);
  // },
  // change:params=>{
  //   return API.PUT("changeClassify",params);
  // }
}
