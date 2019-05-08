import * as API from './'

export default {
  load: params => {
    return API.GET("orderList", params);
  },
  refund:params=>{
    return API.GET("refund",params)
  }
}


