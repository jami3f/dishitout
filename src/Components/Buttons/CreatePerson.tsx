import { useEffect, useState, SetStateAction, Dispatch } from "react";
import { Person } from "../../Types";
import { add } from "../../assets/icons";
import { InputField } from "../Common";
import Button from "./Button";
export default function CreatePerson(props: {
	people: { [key: string]: Person };
	setPeople: Dispatch<SetStateAction<{ [key: string]: Person }>>;
}) {
	const [inputMode, setInputMode] = useState(false);
	function handleClick() {
		setInputMode(true);
	}
	return inputMode ? (
		<NameInput
			setPeople={props.setPeople}
			setInputMode={setInputMode}
		/>
	) : (
		<Button
			text="Add Person"
			handleClick={handleClick}
			icon={add}
		/>
	);
}

function NameInput(props: {
	setPeople: Dispatch<SetStateAction<{ [key: string]: Person }>>;
	setInputMode: Dispatch<SetStateAction<boolean>>;
}) {
	const { setPeople, setInputMode } = props;
	const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
	useEffect(() => {
		inputRef?.focus();
	}, [inputRef]);
	return (
		<InputField
			name="New User"
			handleEmpty={() => {
				setInputMode(false);
			}}
			addToRefObject={(ref: HTMLInputElement) => {
				setInputRef(ref);
			}}
			handleInput={(target: HTMLInputElement) => {
				const input = target.value.trim();
				const name = input
					.split(" ")
					.map(n => n.charAt(0).toUpperCase() + n.slice(1))
					.join(" ");
				console.log("Creating person: " + name);
				setPeople(old => {
					return {
						...old,
						[name]: {
							name: name,
							items: [],
							total: 0,
							id: Object.keys(old).length,
						},
					};
				});
				setInputMode(false);
			}}
			className="ml-2"
		/>
	);
}
