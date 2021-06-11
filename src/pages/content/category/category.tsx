import React, { useEffect, useState } from 'react';
import { doEditCategory, doGetCategoryPapa, doGetCategoryTree } from '@/data/data';
import { Button, Space, Table, Modal, Cascader, Form, Input, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import FormTitle from '@/components/formTitle/formTitle';

interface ICateGory {
	id:string,
	des:string
	status:string
	parent:string | null
	title:string
	user_id:string
	children:ICateGory[] | null
}

interface Iinit {
	name:string
	des:string
	category:string[],
	id?:string|null
}

const Category: React.FC = () => {
	const columns:ColumnsType<ICateGory> = [{
		title: '名称',
		dataIndex: 'name',
		key: 'name',
	}, {
		title: '描述',
		dataIndex: 'des',
		key: 'des',
	}, {
		title: '状态',
		dataIndex: 'status',
	},{
		title: '用户',
		dataIndex: ['user_id','name'],
	},{
		title:'操作',
		key:'opreate',
		render: (data: any) => {
			return <>
				<Space>
					<Button type='primary' onClick={(e) => handleGoDetail(data.id,data)}>编辑</Button>
					<Button type='primary' danger onClick={(e) => handleDelete(data.id)}>删除</Button>
				</Space>
			</>;
		},
	}];
	const [categoryList,setCategoryList] = useState<ICateGory[]>([])
	const [modalShow,setModalShow] = useState<boolean>(false)
	const [selectCategoryList,setSelectCategoryList] = useState([])
	const [tableLoading,setTableLoading] = useState<boolean>(false)
	const [form] = Form.useForm()
	const initValue:Iinit = {
		name:'',
		des:'',
		category:[],
		id:null
	}
	const getTree = async () => {
		setTableLoading(true)
		let re = await doGetCategoryTree();
		setCategoryList(re.data)
		setTableLoading(false)
	};
	const handleGoDetail = async (id: string,data:ICateGory) => {
		let res = await doGetCategoryPapa(id)
		let re = await doGetCategoryTree([1, 2])
		setSelectCategoryList(re.data)
		setModalShow(true)
		initValue.category = res.data
		initValue.name = data.title
		initValue.des = data.des
		initValue.id = id
		form.setFieldsValue(initValue)
	}
	const handleDelete = (id:any) => {

	}
	const handleOpenModal = async () => {
		let re = await doGetCategoryTree([1, 2])
		setSelectCategoryList(re.data)
		setModalShow(true)
		form.setFieldsValue(initValue)
	}
	const handleSubmit = async (data: Iinit) => {
		let sendData = {
			name: data.name,
			status: true,
			des: data.des,
			parent: data.category.length ? data.category[data.category.length - 1] : null,
			floor: data.category.length + 1,
			id:data.id
		}
		let re = await doEditCategory(sendData)
		message.success('操作成功')
		getTree()
		setModalShow(false)
	}
	const handleCloseModal = () => {
		setModalShow(false)
	}
	useEffect(() => {
		getTree();
	}, []);
	return <>
		<FormTitle title='分类列表'/>
		<Button onClick={handleOpenModal} type='primary' style={{marginBottom:40}}>新增</Button>
		<Table loading={tableLoading} rowKey='id' columns={columns} dataSource={categoryList}/>
		<Modal destroyOnClose={true} closable={false} visible={modalShow} title='编辑分类' footer={[]}>
			<Form form={form} colon={false} onFinish={handleSubmit}>
				<Form.Item label='选择父级' name='category'>
					<Cascader
						options={selectCategoryList}
						changeOnSelect
						allowClear={false}
						fieldNames={{
							label: 'title',
							value: 'id',
							children: 'children',
						}}
						style={{ width: 250 }}
						placeholder='请选择分类' />
				</Form.Item>
				<Form.Item label='名称' name='name'>
					<Input style={{ width: 200 }}/>
				</Form.Item>
				<Form.Item label='描述' name='des'>
					<Input style={{ width: 200 }}/>
				</Form.Item>
				<Form.Item style={{display:'none'}} label=' ' name='id'>
					<Input/>
				</Form.Item>
				<Form.Item label='  '>
					<Space>
						<Button type='primary' htmlType='submit'>提交</Button>
						<Button onClick={handleCloseModal}>关闭</Button>
					</Space>
				</Form.Item>
			</Form>
		</Modal>
	</>;
};

export default Category;
