import React, { createRef, useEffect, useRef, useState } from 'react';
import BraftEditor, { BraftEditorProps, BuiltInControlType, ExtendControlType } from 'braft-editor';
import ImgPicker  from '@/components/imgPicker/imgPicker';

// @ts-ignore
import { ContentUtils } from 'braft-utils'
import 'braft-editor/dist/index.css';
import { IimgSelect } from '../imgPicker/_imgPicker';

interface Ieditor {
	onGetHtml(value:string):void
	defaultValue:string
}

const Editor: React.FC<Ieditor> = (props) => {
	const [imgShow,setImgShow] = useState<boolean>(false)
	const [editorState,setEditorState] = useState(BraftEditor.createEditorState(null))
	const editorRef = createRef<BraftEditor>();
	const excludeControls: BuiltInControlType[] = ['media'];
	const extendControls:ExtendControlType[] = [
		'separator',
		{
			key: 'my-button', // 控件唯一标识，必传
			type: 'button',
			title: '选择图片', // 指定鼠标悬停提示文案
			className: 'my-button', // 指定按钮的样式名
			text:'图片',
			onClick: () => {
				setImgShow(true)
			},
		},
	];
	const doCloseImg = () => {
		setImgShow(false)
	}
	const doSelectImgs = (data:IimgSelect[]) => {
		let mediaArr = data.map((item)=>{
			return {
				type:'IMAGE',
				url:`http://localhost:3000${item.path}`
			}
		})
		setEditorState(ContentUtils.insertMedias(editorState,mediaArr))
	}
	const doEditorChange = (editorState1:any) => {
		setEditorState(editorState1)
		props.onGetHtml(editorState.toHTML())
	}
	useEffect(()=>{
		setEditorState(BraftEditor.createEditorState(props.defaultValue || ''))
	},[props.defaultValue])
	return <>
		{imgShow?(<ImgPicker show={imgShow} multiple={true} onClose={doCloseImg} onSelect={doSelectImgs}/>):null}
		<BraftEditor
			ref={editorRef}
			value={editorState}
			onChange={doEditorChange}
			extendControls={extendControls}
			excludeControls={excludeControls}
			style={{ width: 1200, border: '1px solid #d1d1d1', borderRadius: 5 }}
		/>
	</>;
};


export default Editor;
