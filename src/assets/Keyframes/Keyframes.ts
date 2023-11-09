import { ControlsAnimationDefinition } from "framer-motion";

export const inputErrorKeyframes: ControlsAnimationDefinition = {
	x: [-5, 5, -5, 5, -5, 0],
	outlineColor: [
		"rgb(255, 0, 0)",
		"rgb(255, 0, 0)",
		"rgb(255, 0, 0)",
		"rgb(255, 0, 0)",
		"rgb(255, 0, 0)",
		"rgb(0, 0, 0)",
	],
};

export const itemErrorKeyframes: ControlsAnimationDefinition = {
	x: [-2, 2, -2, 2, -2, 0],
	color: ["rgb(255, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 0, 0)", "rgb(0, 0, 0)"],
};
