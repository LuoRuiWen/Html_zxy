import * as API from './'

export default {
  addTrain: params => {
    return API.POST("backstage/train/train", params);
  },
  trainList: params => {
    return API.GET("backstage/train/trainList", params);
  },
  deleteTrain: (params) =>{
    return API.DELETE("backstage/train/train/"+params);
  },
  trainDetail:params=>{
    return API.GET("backstage/train/train/"+ params);
  },

  modifyTrain:params=>{
  return API.PUT("backstage/train/trainStops/",params);
},
  findByTname: params => {
    return API.GET("findByTname", params);
  }
}
