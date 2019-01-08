//muse-ui配置
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/lib/styles/base.less'
import {
	AppBar, //顶部导航条
	Avatar,
	Badge,
	Button, //按钮
	BottomNav,
	Drawer, //抽屉导航
	Icon, //图标
	List, //列表
	TextField
} from 'muse-ui'

const muses = [AppBar, Avatar, Badge, Button, BottomNav, Drawer, Icon, List, TextField]

export default {
	install(Vue) {
		muses.forEach(m => Vue.use(m))
	}
}
