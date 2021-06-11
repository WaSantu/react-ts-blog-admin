import { httpRequest,fileRequest } from '@/utils/axios';
interface IlistData {
	page?:number | string,
	pagesize?:number|string
	[propName:string]:any
}

interface IcommonData {
	[propName:string]:any

}

/**
 * @description 获取文章列表
 * @param data
 */
const doGetArticalList = (data: IlistData)=>httpRequest('/artical/admin_artical_list',data)
/**
 * @description 获取分类
 */
const doGetCategoryTree = (floor?:number[]) => httpRequest('/category/tree',{
	floor,
	tree:true
})

/**
 * @description 获取图片
 * @param data
 */
const doGetFile = (data:IlistData) => httpRequest('/file/list',data)

/**
 * @description 上传图片
 * @param file
 */
const doUploadFile = (file:File) => fileRequest('/file/upload',file)
/**
 * @description 删除文件
 * @param ids
 */
const doDeleteFile = (ids:string[]) => httpRequest('/file/delete',{ids})
/**
 * @description 编辑新建文章
 * @param data
 */
const doEditArtical = (data:IcommonData) => httpRequest('/artical/edit',data)
/**
 * @description 删除文章
 * @param ids
 */
const doDeleteArtical = (ids:string[]) => httpRequest('/artical/delete',{ids})

/**
 * @description 获取单个文章详情
 * @param id
 */
const doGetArticalDetail = (id:string) => httpRequest('/artical/find',{id})

/**
 * @description 编辑新增分类
 * @param data
 */
const doEditCategory = (data:IcommonData) => httpRequest('/category/edit',data)

const doGetCategoryPapa = (id:string) => httpRequest('/category/findPapa',{id})

export {
	doGetArticalList,
	doGetCategoryTree,
	doGetFile,
	doUploadFile,
	doEditArtical,
	doDeleteArtical,
	doGetArticalDetail,
	doEditCategory,
	doDeleteFile,
	doGetCategoryPapa
}
