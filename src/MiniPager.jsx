import React from "react";
import PropTypes from "prop-types";
import cls from "classnames";
import "./style/index.scss";
class MiniPager extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currentPage: 0 };
		this.onPreBtnClick = this.onPreBtnClick.bind(this);
		this.onNextBtnClick = this.onNextBtnClick.bind(this);
	}

	onPreBtnClick() {
		this.setState(preState => {
			this.props.onPageChange(preState.currentPage - 1 + 1);
			return {
				currentPage: preState.currentPage - 1,
			};
		});
	}
	onNextBtnClick() {
		this.setState(preState => {
			this.props.onPageChange(preState.currentPage + 1 + 1);
			return {
				currentPage: preState.currentPage + 1,
			};
		});
	}
	onFirstPageClick = () => {
		this.setState(preState => {
			this.props.onPageChange(1);
			return {
				currentPage: 0,
			};
		});
	};
	onLastPageClick = () => {
		this.setState(preState => {
			this.props.onPageChange(this.props.pageCount);
			return {
				currentPage: this.props.pageCount - 1,
			};
		});
	};
	render() {
		const { currentPage } = this.state;
		const {
			pageCount,
			preLabel,
			nextLabel,
			clsFix,
			autoHide,
			firstLabel,
			lastLabel,
		} = this.props;
		if (autoHide && pageCount <= 1) {
			return null;
		}
		return (
			<div className={clsFix}>
				<span
					onClick={this.onFirstPageClick}
					title={firstLabel}
					className={cls({ disable: currentPage === 0 })}
				>
					{firstLabel}
				</span>
				<span
					onClick={currentPage === 0 ? null : this.onPreBtnClick}
					title="上一页"
					className={cls({ disable: currentPage === 0 })}
					name={preLabel}
				>
					{preLabel}
				</span>
				<span>
					{currentPage + 1}/{pageCount}
				</span>
				<span
					onClick={currentPage === pageCount - 1 ? null : this.onNextBtnClick}
					title="下一页"
					className={cls({ disable: currentPage === pageCount - 1 })}
					name={nextLabel}
				>
					{nextLabel}
				</span>
				<span
					onClick={this.onLastPageClick}
					className={cls({ disable: currentPage === pageCount - 1 })}
					title={lastLabel}
				>
					{lastLabel}
				</span>
			</div>
		);
	}
}

function noop() {}
MiniPager.defaultProps = {
	onPageChange: noop,
	preLabel: "上一页",
	nextLabel: "下一页",
	firstLabel: "首页",
	lastLabel: "末页",
	clsFix: "sw-minipagination",
	anchor: 0,
	autoHide: false,
};
MiniPager.propTypes = {
	onPageChange: PropTypes.func,
	pageCount: PropTypes.number.isRequired,
	preLabel: PropTypes.string,
	nextLabel: PropTypes.string,
	firstLabel: PropTypes.string,
	lastLabel: PropTypes.string,
	clsFix: PropTypes.string,
	anchor: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.instanceOf(Element),
	]),
	autoHide: PropTypes.bool,
};
export default MiniPager;
