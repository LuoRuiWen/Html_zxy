import * as API from './'

export default {
  addTrain: params => {
    return API.POST("backstage/train/train", params);
  },
  findBySname: params => {
    return API.GET("findBySname", params);
  },
  findByTname: params => {
    return API.GET("findByTname", params);
  }
}
