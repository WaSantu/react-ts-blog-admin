import React, { useState } from 'react';
import { Button } from 'antd';

const dashboard:React.FC = () => {
	const [imgshow,setImgShow] = useState(false)
	const button = () => {
		setImgShow(!imgshow)
	}
	return <div>
		<Button onClick={button}>213</Button>
	</div>
}

export default dashboard
