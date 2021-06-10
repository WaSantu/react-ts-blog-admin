import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import style from './imgLayout.css'
import { IimgSelect } from '@/components/imgPicker/_imgPicker';
import { Image, Space } from 'antd';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
interface IimgLayout {
	imgList:IimgSelect[]
	onSelect():void
}

const ImgLayout:React.FC<IimgLayout> = (props) => {
	const handleClick = () => {
		props.onSelect()
	}
	return <div className={style.imglist}>
		<Space>
			<div onClick={handleClick} className={style.upload}>
				<UploadOutlined />
			</div>
			{props.imgList.map((item)=><img key={item._id} style={{objectFit:'contain'}} src={`http://localhost:3000${item.path}`} height={128} width={128}/>)}
		</Space>
	</div>
}

export default ImgLayout
