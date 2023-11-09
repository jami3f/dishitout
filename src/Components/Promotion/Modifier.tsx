import { SetStateAction, Dispatch } from "react";
import { InputField } from "../Common";

function EditButton(props: { setModifier: Dispatch<SetStateAction<number | undefined>> }) {
	return (
		<button
			type="button"
			className="bg-blue-500 w-2 h-2 rounded"
			onClick={() => props.setModifier(undefined)}
		>
			Edit
		</button>
	);
}

export default function Modifier(props: {
	name: string;
	modifier: number | undefined;
	setModifier: Dispatch<SetStateAction<number | undefined>>;
	addToRefObject: (ref: HTMLInputElement) => void;
	refocus: (key: string) => void;
	children: string;
	colour: string;
	className?: string;
}) {
	const handleInput = (target: HTMLInputElement) => {
		props.setModifier(() => parseFloat(target.value));
		console.log(props.modifier);
		props.refocus(props.name);
	};
	return (
		<div className="grid grid-cols-2 justify-items-center p-2">
			<p className={props.colour + " " + props.className}>{props.name}</p>
			{props.modifier !== undefined ? (
				<div className="flex">
					{props.children}
					<EditButton setModifier={props.setModifier} />
				</div>
			) : (
				<InputField
					name={props.name}
					handleInput={handleInput}
					addToRefObject={props.addToRefObject}
					errorCondition={(value: string) => {
						const val = parseFloat(value);
						return isNaN(val) || val < 0;
					}}
					className="w-20"
					numeric
				/>
			)}
		</div>
	);
}
