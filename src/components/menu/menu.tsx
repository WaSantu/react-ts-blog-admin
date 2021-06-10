import { Component } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
import menu from '@/utils/menu';
import { Link, useHistory, useLocation } from 'umi';
interface Imenu  {
	children?:Array<Imenu>,
	path:string,
	name:string
}

function MenuTree(){
	const history = useLocation()
	const renderMenu = function(data:Imenu){
		if(data.children){
			return <SubMenu key={data.path} title={data.name}>
				{data.children.map(item=>renderMenu(item))}
			</SubMenu>
		}else{
			return <Menu.Item key={data.path} style={{height:50}}>
				<Link to={data.path}>{data.name}</Link>
			</Menu.Item>
		}
	}
	return <Menu
		style={{ width: 200,height:'calc(100% - 64px)' }}
		selectedKeys={[history.pathname]}
		mode="inline"
	>
		{menu.map(item=>renderMenu(item as Imenu))}
	</Menu>
}

export default MenuTree
