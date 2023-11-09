import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { inputErrorKeyframes } from "../../assets/Keyframes";

// const ENTER_KEYCODE = "13";

function InputField(props: {
	name: string;
	handleInput: (target: HTMLInputElement) => void;
	addToRefObject?: (ref: HTMLInputElement) => void;
	handleEmpty?: () => void;
	numeric?: boolean;
	errorCondition?: (value: string) => boolean;
	className?: string;
}) {
	const parseInput = (
		e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
		handleInput: (target: HTMLInputElement) => void,
		handleEmpty?: () => void,
		errorCondition?: (value: string) => boolean
	) => {
		const target = e.target as HTMLInputElement;
		const value = target.value;
		if (value === "") return handleEmpty?.();
		if (errorCondition && errorCondition(value)) {
			inputErrorAnimation.start(inputErrorKeyframes);
			return ((e.target as HTMLInputElement).value = "");
		}
		handleInput(target);
	};

	const inputErrorAnimation = useAnimationControls();

	const localRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		props.addToRefObject?.(localRef.current as HTMLInputElement);
	}, []);

	return (
		<motion.input
			ref={localRef}
			key={props.name}
			title={props.name}
			animate={inputErrorAnimation}
			transition={{ duration: 0.5 }}
			className={`text-center border self-center rounded ${props.className}`}
			onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
				e.key === "Enter" && parseInput(e, props.handleInput, props.handleEmpty, props.errorCondition)
			}
			onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
				parseInput(e, props.handleInput, props.handleEmpty, props.errorCondition)
			}
			{...(props.numeric ? { type: "number", inputMode: "decimal" } : { type: "text" })}
		></motion.input>
	);
}

export default InputField;
