export default function Headings() {
	return (
		<div className="p-2 grid grid-cols-7 gap-x-2 border-b">
			<div className="font-semibold col-span-2">Name </div>
			<div className="font-semibold">Price </div>
			<div className="font-semibold col-span-2">Items</div>
			<div className="font-semibold col-span-2">Total</div>
		</div>
	);
}
