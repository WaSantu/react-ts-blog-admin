import { defineConfig } from 'umi';

export default defineConfig({
	nodeModulesTransform: {
		type: 'none',
	},
	routes: [
		{
			path: '/',
			component: '@/pages/layout/layout',
			routes: [
				{
					path:'/dashboard',
					component:'@/pages/content/dashboard/dashboard'
				},{
					path:'/artical',
					component: '@/pages/content/artical/artical'
				},{
					path:'/artical_detail',
					component: '@/pages/content/artical_detail/artical_detail'
				},{
					path:'/category',
					component:'@/pages/content/category/category'
				}
			],
		},
	],
	antd: {
		compact: true,
	},
	proxy:{
		'/v1': {
			'target': 'http://localhost:3000',
			'changeOrigin': true,
			'pathRewrite': { '/v1' : '/v1' },
		},
	},
	theme: {
		'@primary-color': '#13C2C2', // 全局主色
		'@link-color': '#13C2C2', // 链接色
		'@success-color': '#52c41a', // 成功色
		'@warning-color': '#faad14', // 警告色
		'@error-color': '#f5222d', // 错误色
		'@font-size-base': '14px', // 主字号
		'@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
		'@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
		'@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
		'@disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
		'@border-radius-base': '5px', // 组件/浮层圆角
		'@border-color-base': '#d9d9d9', // 边框色
		'@box-shadow-base': '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 9px 28px 8px rgba(0, 0, 0, 0.05)', // 浮层阴影
	},
	fastRefresh: {},
});
