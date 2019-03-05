**Install**

```shell
npm install '@aimer2/pager'
```

**Usage**

```jsx
import { Pager } from "@aimer2/pager";

<Pager
	pageCont={10}
	onPageChange={page => {
		//fetchNewData
	}}
/>;
```

**props**

```javascript
    //触发分页变化时的回调函数，参数为page,表示当前页
    onPageChange: PropTypes.func,
    //总页数
	pageCount: PropTypes.number.isRequired,
    pageRange: PropTypes.number,
    //上一页按钮文字
    preLabel: PropTypes.string,
    //下一页按钮文字
    nextLabel: PropTypes.string,
    //自定义css 类
    clsFix: PropTypes.string,
    //是否显示页面跳转输入框
    showJump: PropTypes.bool,
    //当总页数小于或等于一页时是否自动隐藏
    autoHide: PropTypes.bool,
    //触发分页变化时，是否需要是页面滚动到某一位置
	anchor: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.instanceOf(Element),
	]),

```
