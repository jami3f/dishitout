export default function Button(props: {
	className?: string;
	text: string;
	handleClick: () => void;
	icon?: string;
}) {
	return (
		<button
			className={
				(props.className || "") +
				" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-sm m-2 p-2 rounded flex items-center justify-around transition-colors"
			}
			type="button"
			onClick={props.handleClick}
		>
			{props.icon && (
				<img
					alt={`${props.icon} icon`}
					src={props.icon}
					className="w-5 mr-1"
				></img>
			)}
			{props.text}
		</button>
	);
}
