import axios, { AxiosResponse }  from 'axios'
import { message } from 'antd'
const base = '/v1'
interface Idata {
	[propName:string] : any
}
const httpRequest = (url:string,data?:Idata,method?:string) => {
	return new Promise<AxiosResponse>((resolve, reject) => {
		let ttoken = window.localStorage['ttoken'] || window.sessionStorage['ttoken'] || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOnRydWUsIl9pZCI6IjYwYTRjMjJkMzBjNDZmMWRkYzM5OGExMiIsIm5hbWUiOiJzYW50dSIsInB3ZCI6IndlbnNoYW41MjAiLCJyb2xlIjoiYWRtaW4iLCJuaWNrbmFtZSI6InNhbnR1X25pY2tuYW1lIiwibWFpbCI6IjExMDIyMzQ2NDZAcXEuY29tIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0xOVQwNzo0NTo0OS43MjdaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0yOFQwNjozNzoxNS4xNDlaIiwiaWF0IjoxNjIzMzIzMDMzLCJleHAiOjE2MjMzNTE4MzN9.3Z3YTHL7z3QYOlOl6FEiV1zTvcYa99BpaAKUTWGaOqA'
		axios({
			method:'post',
			url:base+url,
			headers:{
				'Authorization': 'Bearer '+ttoken,
			},
			data:data
		}).then((r)=>{
			resolve(r)
		}).catch(error=>{
			message.error('请求错误')
			return
		})
	})
}

const fileRequest = (url:string,file:File,data?:Idata) => {
	return new Promise<AxiosResponse>((resolve, reject) => {
		let ttoken = window.localStorage['ttoken'] || window.sessionStorage['ttoken'] || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOnRydWUsIl9pZCI6IjYwYTRjMjJkMzBjNDZmMWRkYzM5OGExMiIsIm5hbWUiOiJzYW50dSIsInB3ZCI6IndlbnNoYW41MjAiLCJyb2xlIjoiYWRtaW4iLCJuaWNrbmFtZSI6InNhbnR1X25pY2tuYW1lIiwibWFpbCI6IjExMDIyMzQ2NDZAcXEuY29tIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0xOVQwNzo0NTo0OS43MjdaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0yOFQwNjozNzoxNS4xNDlaIiwiaWF0IjoxNjIzMzIzMDMzLCJleHAiOjE2MjMzNTE4MzN9.3Z3YTHL7z3QYOlOl6FEiV1zTvcYa99BpaAKUTWGaOqA'
		let ddata = new FormData()
		ddata.append('file',file)
		if(data){
			for(let va in data){
				ddata.append(va,data[va])
			}
		}
		axios({
			method:'post',
			url:base+url,
			headers:{
				'Authorization': 'Bearer '+ttoken,
			},
			data:ddata
		}).then((r)=>{
			resolve(r)
		}).catch(error=>{
			message.error('请求错误')
			return
		})
	})
}


export {
	fileRequest,
	httpRequest
}
