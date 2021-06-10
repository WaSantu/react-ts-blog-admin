import React, { useEffect, useState } from 'react';
import { IRouteComponentProps, useLocation } from 'umi';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { Button, Form, Input, Cascader, Radio, message, Spin } from 'antd';
import { doEditArtical, doGetArticalDetail, doGetCategoryTree } from '@/data/data';
import FormTitle from '@/components/formTitle/formTitle';
import ImgPicker from '@/components/imgPicker/imgPicker';
import Editor from '@/components/ editor/editor';
import { IimgSelect } from '@/components/imgPicker/_imgPicker';
import ImgLayout from '@/components/imgLayout/imgLayout';
import { history } from '@@/core/umiExports';

interface IinitValue {
	title: string,
	category: []
	content: string
	cover: IimgSelect[]
	is_hot: number | string
	status: number | string
	_id?: string

	[propName: string]: any
}


const ArticalDetail: React.FC<IRouteComponentProps> = (prop) => {
	const [categoryTree, setCateGoryTree] = useState([]);
	const [formTitle, setFromTitle] = useState<string>('新建文章');
	const [imgShow, setImgShow] = useState<boolean>(false);
	const [loading,setLoading] = useState<boolean>(false)
	const [initValue, setInitValue] = useState<IinitValue>({
		title: '',
		category: [],
		cover: [],
		content: '',
		is_hot: 0,
		status: 0,
		_id: '',
	});
	const [form] = Form.useForm();
	const getCateTree = async () => {
		let re = await doGetCategoryTree();
		setCateGoryTree(re.data);
	};
	const doSelectImgs = (imglist: IimgSelect[]) => {
		initValue.cover?.push(...imglist);
		setInitValue(initValue);
	};
	const getDetail = async () => {
		setLoading(true)
		let id: any = prop.location.query.id;
		let re = await doGetArticalDetail(id);
		for (let va in initValue) {
			initValue[va] = re.data[va];
		}
		setInitValue({ ...initValue });
		form.setFieldsValue({ ...initValue });
		setLoading(false)
	};
	useEffect(() => {
		getCateTree();
		if (prop.location.query.id) {
			getDetail();
			setFromTitle('编辑文章');
			return;
		}
		form.setFieldsValue({ ...initValue });
	}, []);
	const submit = async (values: IinitValue) => {
		Object.assign(initValue, values);
		initValue.cover.map(item => item._id);
		let re = await doEditArtical(initValue);
		message.success('操作成功');
		history.go(-1);
	};
	const doCloseImg = () => {
		setImgShow(false);
	};
	const doOpenImg = () => {
		setImgShow(true);
	};
	const handleGetHtml = (value: string) => {
		initValue.content = value;
		setInitValue(initValue);
	};

	return <>
		<Spin spinning={loading}>
			<FormTitle title={formTitle} />
			<Form
				colon={false}
				form={form}
				labelCol={{ span: 2 }}
				onFinish={submit}
			>
				<Form.Item label='标题' name='title'>
					<Input style={{ width: 250 }} placeholder='请填写标题' />
				</Form.Item>
				<Form.Item label='分类' name='category'>
					<Cascader
						options={categoryTree}
						fieldNames={{
							label: 'title',
							value: 'id',
							children: 'children',
						}}
						style={{ width: 250 }}
						placeholder='请选择分类' />
				</Form.Item>
				<Form.Item label='封面图'>
					<ImgLayout imgList={initValue.cover} onSelect={doOpenImg} />
				</Form.Item>
				<Form.Item label='内容'>
					<Editor defaultValue={initValue.content} onGetHtml={handleGetHtml} />
				</Form.Item>
				<Form.Item label='是否置顶' name='is_hot'>
					<Radio.Group>
						<Radio value={0}>否</Radio>
						<Radio value={1}>是</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label='是否展示' name='status'>
					<Radio.Group>
						<Radio value={0}>否</Radio>
						<Radio value={1}>是</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label=' '>
					<Button size='large' type='primary' htmlType='submit'>提交</Button>
				</Form.Item>
			</Form>
			<ImgPicker onClose={doCloseImg} onSelect={doSelectImgs} show={imgShow} multiple={true} />
		</Spin>
	</>
};

export default ArticalDetail;
