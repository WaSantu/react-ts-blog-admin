import React from 'react';
import style from './formTitle.css'
interface IformTitle {
	title:string
	subtitle?:string
}

const FormTitle:React.FC<IformTitle> = (prop) => {
	return <div className={style.form_title}>
		<span>{prop.title}</span>
		{prop.subtitle?(<span className={style.subtitle}>{prop.subtitle}</span>):(<></>)}
	</div>
}

export default FormTitle
