import * as API from '/'

export default{
	login:params=>{
		return API.POST('api/user/login',params);
    },
    register:params=>{
		return API.POST('api/user/register',params);
	}
	// findAllEmps:params=>{
	// 	return API.GET('findAllEmps',params)
	// },
	// deleteEmpById:params=>{
	// 	return API.GET('deleteEmpById',params);
	// },
	// deleteSomeEmp:params=>{
	// 	return API.POST('deleteSomeEmp',params);
	// }
}
