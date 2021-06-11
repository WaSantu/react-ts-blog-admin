import React, { useEffect, useState } from 'react';
import { IimgProps, IimgSelect } from '@/components/imgPicker/_imgPicker';
import ImgPickerContent from '@/components/imgPicker/_imgPicker';
const ImgPicker:React.FC<IimgProps> = (props) => {
	const [unmountImg,setUnmountImg] = useState<boolean>(false)
	const [imgShow,setImgShow] = useState<boolean>(false)
	const handleClose = () => {
		props.onClose()
	}
	const handleSelect = (data:IimgSelect[]) => {
		props.onSelect(data)
		props.onClose()
	}
	useEffect(()=>{
		if(props.show){
			setUnmountImg(true)
			setTimeout(()=>{
				setImgShow(true)
			},500)
		}
		else{
			setImgShow(false)
			setTimeout(()=>{
				setUnmountImg(false)
			},500)
		}
	},[props.show])
	return <>
		{unmountImg?(<ImgPickerContent fileType={props.fileType} onClose={handleClose} onSelect={handleSelect} multiple={props.multiple} show={imgShow}/>):null}
		</>
}

export default ImgPicker
