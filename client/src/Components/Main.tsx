import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { loadQuiz, clearResults, setAmount } from "../actions";
import { IMain, selectOption } from "../types";
import Select from 'react-select';

const amountOptions: Array<selectOption> = [
	{value: 10, label: "10"},
	{value: 20, label: "20"},
	{value: 30, label: "30"},
];

const selectStyles = {
	option: (provided: any, state: any) => ({
		...provided,
		color: 'black',
	}),
}


const Main: React.FC<IMain> = (props) => {
	const [amount, setAmount] = useState(10);
	useEffect(() => {
		props.clearResults();
	});

	const handleAmountChange = (value: selectOption | null) => {
		console.log(value);
		value && setAmount(value.value);
	}

	return (
		<div className="main-wrapper">
			<h1>Welcome to quiz</h1>
			<div className="main-content">
				<span>Select amount of questions</span>
				<div className="select-amount">
					<Select
						options={amountOptions}
						value={amountOptions.find(option => option.value === amount)}
						onChange={value => handleAmountChange(value)}
						isSearchable={false}
						isClearable={false}
						styles={selectStyles}
						placeholder={''}
						components={{IndicatorSeparator: () => null,}}
					/>
				</div>
			</div>
			<NavLink className="quiz-link" to={{pathname: "/quiz", state: 'main',}} onClick={() => props.setAmount(amount)}>ПАЙИХАЛИ!</NavLink>
		</div>
	);
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		loadQuiz: (amount: number) => dispatch(loadQuiz(amount)),
		clearResults: () => dispatch(clearResults()),
		setAmount: (amount: number) => dispatch(setAmount(amount)),
	}
}

export default connect(null, mapDispatchToProps)(Main);
