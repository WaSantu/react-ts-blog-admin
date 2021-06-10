import { Component } from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { IRouteComponentProps } from 'umi'
import MenuTree from '@/components/menu/menu';
import style from './layout.less'
// @ts-ignore
import { Scrollbars } from 'react-custom-scrollbars';
class LayoutPage extends Component<IRouteComponentProps,{}> {
	constructor(props:IRouteComponentProps) {
		super(props);
	}
	render() {
		return <Layout hasSider style={{height:'100%'}}>
			<Sider>
				<div className={style.topIcon}>

				</div>
				<MenuTree/>
			</Sider>
			<Layout>
				<Header>Header</Header>
				<Content>
					<Scrollbars>
						<div className={style.mainContent}>
							<div className={style.contentLayout}>
								{this.props.children}
							</div>
						</div>
						<Footer>Footer</Footer>
					</Scrollbars>
				</Content>
			</Layout>
		</Layout>;

	}
}


export default LayoutPage;
