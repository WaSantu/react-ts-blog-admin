import React, { KeyboardEventHandler, useEffect, useState } from 'react';
import { Drawer, Image, Pagination, Spin, Space, Button, Upload, Input, Modal, message,Tag } from 'antd';
import { CheckCircleOutlined, YoutubeOutlined, UploadOutlined, SelectOutlined, VideoCameraOutlined, FileImageOutlined } from '@ant-design/icons';
import { doDeleteFile, doGetFile, doUploadFile } from '@/data/data';
import style from './_imgPicker.css';

export interface IimgProps {
	show: boolean
	multiple?: boolean
	fileType?: number

	onSelect(imgList: IimgSelect[]): void

	onClose(): void
}

export interface IimgSelect {
	createdAt: string
	md5: string
	name: string
	path: string,
	realPath: string
	fileType: number
	updatedAt: string
	_id: string
}


const ImgPickerContent: React.FC<IimgProps> = (props) => {
	const [fileList, setFileList] = useState([]);
	const [total, setTotal] = useState(0);
	const [pickList, setPickList] = useState<IimgSelect[]>([]);
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [btnloading, setBtnLoading] = useState<boolean>(false);
	const [keyWords, setKeyWords] = useState<string>('');
	const [opreateMode, setOpreateMode] = useState<boolean>(false);
	const getFile = async (inputPage?: number) => {
		setLoading(true);
		let re = await doGetFile({ page: inputPage ? inputPage : page, keywords: keyWords, type: props.fileType });
		setFileList(re.data.list);
		setTotal(re.data.total);
		setLoading(false);
	};
	const pickImg = (item: IimgSelect) => {
		if (opreateMode) {
			return;
		}
		let isIndex = pickList.findIndex(ite => ite._id == item._id);
		if (isIndex != -1) {
			pickList.splice(isIndex, 1);
		} else {
			if (!props.multiple) {
				setPickList([item]);
				return;
			} else {
				pickList.push(item);
			}
		}
		setPickList([...pickList]);
	};
	const changePage = (data: number) => {
		setPage(data);
	};
	const doUpload = async (options: any) => {
		try {
			setBtnLoading(true);
			let re = await doUploadFile(options.file);
			getFile();
			setBtnLoading(false);
		} catch (e) {
			setBtnLoading(false);
		}
	};
	const handleDelete = () => {
		Modal.confirm({
			title: '提示',
			content: '确定删除所选项吗？',
			onOk: async () => {
				let fileIds = pickList.map(item => item._id);
				let re = await doDeleteFile(fileIds);
				getFile(1);
				message.success('删除成功');
			},
		});
	};
	const doKeyWordsSearch = (e: any) => {
		setPage(() => 1);
		setKeyWords(e.target.value);
	};
	const selectDown = () => {
		props.onSelect(pickList);
		props.onClose();
	};
	const closeImg = () => {
		props.onClose();
	};
	const handleChangeMode = () => {
		setOpreateMode(!opreateMode);
	};
	useEffect(() => {
		getFile();
	}, [page, keyWords]);
	return <Drawer
		title='文件选择'
		destroyOnClose={true}
		visible={props.show}
		width='650'
		closable={false}
	>
		<div className={style.drawContent}>
			<div className={style.opreateLayout}>
				<Space>
					<Button disabled={opreateMode} onClick={selectDown} type='primary'>选择</Button>
					<Button onClick={handleChangeMode} icon={opreateMode ? <SelectOutlined /> :
						<YoutubeOutlined />}>{opreateMode ? '选择模式' : '预览模式'}</Button>
					<Upload showUploadList={false} customRequest={doUpload} multiple={true}>
						<Button loading={btnloading}><UploadOutlined />上传</Button>
					</Upload>
					<Button onClick={handleDelete} type='primary' danger>删除所选项</Button>
					<Button onClick={closeImg} danger type='primary'>关闭</Button>
				</Space>
				<div>
					<Input onPressEnter={doKeyWordsSearch} placeholder='文件名搜索' />
				</div>
			</div>
			<div className={style.imgLayout}>
				<Spin spinning={loading} wrapperClassName={style.imgList}>
					<div className={style.imgList}>
						{fileList.map((item: IimgSelect, index) => (
							item.fileType ? (
									<div onClick={(e) => pickImg(item)} key={item._id} className={style.imgItem}>
										{opreateMode ? (<></>) : (
											<div className={`${style.imgItemHover} ${pickList.findIndex(ite => item._id == ite._id) != -1 ? style.showHover : ''}`}>
												{pickList.findIndex(ite => item._id == ite._id) != -1 ?
													<CheckCircleOutlined style={{
														color: '#13C2C2',
														fontSize: 30,
													}} /> : <></>}
											</div>)}
										<video playsInline={true} controls={opreateMode} width='170' height='170' key={item._id}>
											<source src={`http://localhost:3000${item.path}`} />
										</video>
										<Tag icon={<VideoCameraOutlined />} color="magenta" className={style.imgIcon}>视频</Tag>
										<div className={style.name}>{item.name}</div>
									</div>
								) :
								(
									<div onClick={(e) => pickImg(item)} key={item._id} className={style.imgItem}>
										{opreateMode ? (<></>) : (
											<div className={`${style.imgItemHover} ${pickList.findIndex(ite => item._id == ite._id) != -1 ? style.showHover : ''}`}>
												{pickList.findIndex(ite => item._id == ite._id) != -1 ?
													<CheckCircleOutlined style={{
														color: '#13C2C2',
														fontSize: 30,
													}} /> : <></>}
											</div>)}
										<Image preview={opreateMode} style={{ objectFit: 'contain' }} height={170} width={170} src={`http://localhost:3000${item.path}`} />
										<Tag icon={<FileImageOutlined />} color="volcano" className={style.imgIcon}>图片</Tag>
										<div className={style.name}>{item.name}</div>
									</div>
								)
						))}
					</div>
				</Spin>
				<div className={style.pageLayout}>
					<Pagination onChange={changePage} total={total} current={page} pageSize={10} />
				</div>
			</div>
		</div>
	</Drawer>;
};

export default ImgPickerContent;
