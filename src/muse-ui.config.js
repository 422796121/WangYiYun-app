//muse-ui配置
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/lib/styles/base.less'
import 'muse-ui-loading/dist/muse-ui-loading.css'
import Loading from 'muse-ui-loading'
import {
	AppBar, //顶部导航条
	Avatar, //原型图标
	Badge,
	Button, //按钮
	BottomNav,
	Drawer, //抽屉导航
	ExpansionPanel, //手风琴
	Helpers, //工具
	Icon, //图标
	List, //列表
	LoadMore, //加载更多
	Progress, //进度条
	Slider, //滑块
	Tooltip //提示框
} from 'muse-ui'

const muses = [AppBar, Avatar, Badge, Button, BottomNav, Drawer, ExpansionPanel, Helpers, Icon, List, LoadMore,
	Progress, Slider, Tooltip
]

export default {
	install(Vue) {
		muses.forEach(m => Vue.use(m))
		Vue.use(Loading)
	}
}
