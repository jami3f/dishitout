import { SetStateAction, Dispatch } from "react";
import Button from "./Button";

export default function EditPeople(props: { setRemoveState: Dispatch<SetStateAction<boolean>> }) {
	return (
		<Button
			text="Edit People"
			handleClick={() => props.setRemoveState(old => !old)}
		/>
	);
}
