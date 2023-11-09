import { SetStateAction, Dispatch } from "react";
import { add, cancel, done } from "../../assets/icons";
// import { Clear, Done } from "@mui/icons-material";
import { Person } from "../../Types";
import Button from "./Button";

export default function CreateSharedItem(props: {
	selection: Person[];
	setSelection: Dispatch<SetStateAction<Person[]>>;
	selectionMode: boolean;
	setSelectionMode: Dispatch<SetStateAction<boolean>>;
	shared: Person[][];
	setShared: Dispatch<SetStateAction<Person[][]>>;
}) {
	return props.selectionMode ? (
		<SelectPrompt
			selection={props.selection}
			setSelection={props.setSelection}
			setSelectionMode={props.setSelectionMode}
			shared={props.shared}
			setShared={props.setShared}
		/>
	) : (
		<Button
			text="Add Shared Item"
			handleClick={() => props.setSelectionMode(true)}
			icon={add}
		/>
	);
}

function SelectPrompt(props: {
	selection: Person[];
	setSelection: Dispatch<SetStateAction<Person[]>>;
	setSelectionMode: Dispatch<SetStateAction<boolean>>;
	shared: Person[][];
	setShared: Dispatch<SetStateAction<Person[][]>>;
}) {
	const checkExists = () => {
		if (props.selection.length === 1) return true;
		for (const personArr of props.shared) {
			if (personArr.length !== props.selection.length) continue;
			if (personArr.every(person => props.selection.map(p => p.name).includes(person.name))) return true;
		}
	};

	return (
		<div className="bg-gray-100 px-2">
			<p className="text-gray-500">Select people to share an item:</p>
			{props.selection.map((person, index) => (
				<p
					key={index}
					className={checkExists() && "text-red-600"}
				>
					{person.name}
				</p>
			))}
			<button
				title="done"
				type="button"
				onClick={() => {
					if (checkExists()) return;
					props.setShared(old => [...old, props.selection]);
					props.setSelection([]);
					props.setSelectionMode(false);
				}}
				className="w-8"
			>
				<img
					src={done}
					alt=""
				/>
			</button>
			<button
				title="cancel"
				type="button"
				onClick={() => {
					props.setSelection([]);
					props.setSelectionMode(false);
				}}
				className="w-8"
			>
				<img
					src={cancel}
					alt=""
				/>
			</button>
		</div>
	);
}
