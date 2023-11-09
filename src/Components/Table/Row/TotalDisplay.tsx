import { Item, Person } from "../../../Types";
export default function TotalDisplay(props: { people: Person[]; items: Item[] }) {
	const { people, items } = props;
	return (
		<div className="col-span-2 inline">
			{people.map((p, i, arr) => {
				const prefix = arr.length > 1 ? p.name + ": " : "";
				return (
					<p key={i}>
						{items.length > 0 &&
							`${prefix}£${(items.map(i => i.price).reduce((a, b) => a + b) / people.length).toFixed(2)}`}
					</p>
				);
			})}
		</div>
	);
}
