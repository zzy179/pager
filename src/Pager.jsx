import React from "react";
// import Pager from "./Pager.jsx";
import cls from "classnames";
import PropTypes from "prop-types";

require("./style/index.scss");

class Pager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.props.initialPage - 1,
			jumpPage: "",
			scrollTop: 0,
		};
		this.onNextBtnClick = this.onNextBtnClick.bind(this);
		this.onPreBtnClick = this.onPreBtnClick.bind(this);
		this.onJumpClick = this.onJumpClick.bind(this);
		this.onJumpInputChange = this.onJumpInputChange.bind(this);
		this._onPageChange = this._onPageChange.bind(this);
	}
	componentDidUpdate(preProps) {
		if (this.props.anchor !== preProps.anchor) {
			this.setScrollTop();
		}
	}

	setScrollTop() {
		let anchorDom = null;
		let top = 0;
		const anchor = this.props.anchor;
		const anchorType = typeof anchor;
		if (anchorType === "object") {
			anchorDom = anchor;
		} else if (anchorType === "string") {
			anchorDom = document.querySelector(anchor);
		} else if (anchorType === "number") {
			top = anchor;
		}

		if (anchorDom !== null) {
			top = anchorDom.getBoundingClientRect().top + window.scrollY;
		}
		this.setState({ scrollTop: top });
	}

	_onPageChange(page) {
		const { onPageChange } = this.props;

		onPageChange(page);
		window.scrollTo(0, this.state.scrollTop);
	}

	_renderPagers() {
		const { pageCount, pageRange } = this.props;
		const { currentPage } = this.state;

		const pages = [];
		//如果显示的页数大于总页数，则显示全部页码，无需显示...
		if (pageRange >= pageCount) {
			for (let i = 0; i < pageCount; i++) {
				pages.push(
					<li
						key={i}
						className={cls({ active: this.state.currentPage === i })}
						title={`第${i + 1}页`}
						onClick={() => this.onPageBtnClick(i)}
					>
						<a>{i + 1}</a>
					</li>,
				);
			}
		} else {
			let _start = 0;
			let _end = pageRange;
			let page;
			//超过一个range  后 左侧显示...
			if (currentPage + 1 >= pageRange) {
				pages.unshift(
					<li onClick={() => this.onPageBtnClick(0)} key="第一页">
						1
					</li>,
					<li className="deactive" key="向前更多">
						...
					</li>,
				);
				const isLast = currentPage + 3 > pageCount;
				_start = isLast ? pageCount - 5 : currentPage - 2;
				_end = isLast ? pageCount : currentPage + 3;
			}

			for (let i = _start; i < _end; i++) {
				page = i + 1;
				pages.push(
					<li
						key={page}
						className={cls({ active: this.state.currentPage === i })}
						title={`第${page}页`}
						onClick={() => this.onPageBtnClick(i)}
					>
						<a>{i + 1}</a>
					</li>,
				);
			}
			if (currentPage + 2 < pageCount) {
				pages.push(
					<li className="deactive" key="向后更多">
						...
					</li>,
					<li onClick={() => this.onPageBtnClick(pageCount - 1)} key="最后一页">
						{pageCount}
					</li>,
				);
			}
		}
		return pages;
	}

	onPageBtnClick(page) {
		this.setState({ currentPage: page });
		this._onPageChange(page + 1);
	}

	onPreBtnClick() {
		this.setState(preState => {
			this._onPageChange(preState.currentPage - 1 + 1);
			return {
				currentPage: preState.currentPage - 1,
			};
		});
	}

	onNextBtnClick() {
		this.setState(preState => {
			this._onPageChange(preState.currentPage + 1 + 1);
			return {
				currentPage: preState.currentPage + 1,
			};
		});
	}

	onJumpClick() {
		this.setState({ currentPage: this.state.jumpPage - 1 });
		this._onPageChange(this.state.jumpPage);
	}

	onJumpInputChange(e) {
		const { pageCount } = this.props;
		let value = +e.target.value;

		if (isNaN(Number(value))) return;

		if (value <= 0) {
			value = 1;
		}
		if (value > pageCount) {
			value = pageCount;
		}

		this.setState({ jumpPage: value });
	}

	render() {
		const { currentPage } = this.state;

		const {
			pageCount,
			preLabel,
			nextLabel,
			clsFix,
			showJump,
			autoHide,
		} = this.props;
		if (pageCount <= 1 && autoHide) {
			return null;
		}
		return (
			<div className={clsFix}>
				<ul>
					<li
						onClick={currentPage === 0 ? null : this.onPreBtnClick}
						className={cls({ disable: currentPage === 0 })}
					>
						<a title="上一页">{preLabel}</a>
					</li>

					{this._renderPagers()}

					<li
						onClick={currentPage === pageCount - 1 ? null : this.onNextBtnClick}
						className={cls({ disable: currentPage === pageCount - 1 })}
					>
						<a title="下一页">{nextLabel}</a>
					</li>
				</ul>
				{showJump ? (
					<div className="inputbox">
						到第
						<input
							type="text"
							value={this.state.jumpPage}
							onChange={this.onJumpInputChange}
						/>
						页
						<button className="goto" onClick={this.onJumpClick}>
							确定
						</button>
					</div>
				) : null}
			</div>
		);
	}
}
export default Pager;

function noop() {}

Pager.defaultProps = {
	initialPage: 1,
	onPageChange: noop,
	preLabel: "上一页",
	nextLabel: "下一页",
	clsFix: "sw-Pager",
	showJump: true,
	pageRange: 5,
	autoHide: false,
};
Pager.propTypes = {
	onPageChange: PropTypes.func,
	pageCount: PropTypes.number.isRequired,
	pageRange: PropTypes.number,
	preLabel: PropTypes.string,
	nextLabel: PropTypes.string,
	clsFix: PropTypes.string,
	showJump: PropTypes.bool,
	autoHide: PropTypes.bool,
	anchor: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.instanceOf(Element),
	]),
};
