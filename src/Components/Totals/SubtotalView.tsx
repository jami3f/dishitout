import { Person } from "../../Types";
export default function SubtotalView(props: { people: Person[] }) {
	return (
		<div className="p-2 border-r pr-5">
			<p className="font-semibold">Subtotals:</p>
			{props.people
				.filter(p => p.total > 0)
				.map((person, index) => (
					<p key={index}>
						{person.name}: £{person.total.toFixed(2)}
					</p>
				))}
		</div>
	);
}
