import { useEffect, useState } from 'react';
import { Table, Button, message, Space, Modal, Input } from 'antd';
import { doDeleteArtical, doGetArticalList } from '@/data/data';
import { ColumnsType } from 'antd/es/table';
import { history } from '@@/core/umiExports';
import FormTitle from '@/components/formTitle/formTitle';
import style from './artical.css'
interface Iartical {
	name: String,
	user_id: Object,
	_id: String,
	key?: String
}

function Artical() {
	const [list, setList] = useState([]);
	const [total,setTotal] = useState<number>(0)
	const [page,setPage] = useState<number>(1)
	const [name,setName] = useState<string>('')
	const [tableLoading,setTableLoading] = useState<boolean>(false)
	const handleGoDetail = (id?:string) => {
		if(id){
			history.push({ pathname: '/artical_detail', query: { id}});
		}else{
			history.push({pathname:'/artical_detail'})
		}
	};
	const handleDelete = (id: string) => {
		Modal.confirm({
			title:'提示',
			cancelText:'取消',
			okText:'确定',
			content:'确定要删除吗？',
			onOk:async () => {
				let re = await doDeleteArtical([id])
				message.success('操作成功')
				getList()
			}
		})
	}
	const handleSearch = (e:any) => {
		setName(e.target.value)
	}
	const columns: ColumnsType<Iartical> = [
		{
			title: '标题',
			dataIndex: 'title',
			key: 'title',
			width: 200,
		},
		{
			title: '用户',
			dataIndex: 'user_id',
			key: 'user_id',
			render: (data: any) => {
				return <div>{data.name}</div>;
			},
		},
		{
			title: '操作',
			key: 'operate',
			render: (data: any) => {
				return <>
					<Space>
						<Button type='primary' onClick={(e) => handleGoDetail(data._id)}>详情</Button>
						<Button onClick={(e) => handleGoDetail(data._id)}>{data.status == 1 ? '禁用' : '启用'}</Button>
						<Button type='primary' danger onClick={(e) => handleDelete(data._id)}>删除</Button>
					</Space>
				</>;
			},
		},
	];

	async function getList() {
		setTableLoading(true)
		let re = await doGetArticalList({
			page: page,
			name:name
		});
		setList(re.data.map((item: Iartical) => {
			item.key = item._id;
			return item;
		}));
		setTableLoading(false)
	}

	useEffect(() => {
		getList();
	}, [page,name]);
	return <>
		<FormTitle title='文章列表'/>
		<div className={style.opreate}>
			<Button onClick={()=>handleGoDetail()} type='primary'>新建文章</Button>
			<Input style={{width:250}} placeholder='请输入名称搜索' onPressEnter={handleSearch}/>
		</div>
		<Table loading={tableLoading} pagination={{total:total,current:page,pageSize:10,showTotal:(total)=>(<span>共有{total}条</span>)}} columns={columns} dataSource={list} />
	</>;
}

export default Artical;
