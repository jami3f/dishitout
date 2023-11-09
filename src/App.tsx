import React, { useEffect, useState } from "react";
import { Button, CreatePerson, CreateSharedItem, EditPeople } from "./Components/Buttons";
import { Modifier } from "./Components/Promotion";
import { Headings, Row } from "./Components/Table";
import { SubtotalView, TotalView } from "./Components/Totals";
import { TopBar } from "./Components/Visual";
import { Person } from "./Types";

// function showToolTip(e: Event, ref: RefObject<HTMLDivElement>) {
//   const target = e.target as HTMLElement;
//   const tooltip = ref.current;
//   if (tooltip) {
//     tooltip.style.display = "block";
//     tooltip.style.left = `${target.offsetLeft + target.offsetWidth}px`;
//     tooltip.style.top = `${target.offsetTop}px`;
//     tooltip.innerHTML = target.title;
//   }
// }

export default function App() {
	const [promotion, setPromotion] = useState<number>();
	const [promotionCap, setPromotionCap] = useState<number>();

	const [service, setService] = useState<{ [key: string]: Person }>({
		Service: {
			name: "Service",
			items: [],
			total: 0,
			id: -1,
		},
	});

	const [people, setPeople] = useState<{ [key: string]: Person }>({});
	const [shared, setShared] = useState<Person[][]>([]);
	const [selectionMode, setSelectionMode] = useState(false);
	const [selection, setSelection] = useState<Person[]>([]);
	const [inputRefs, setInputRefs] = useState<{
		[key: string]: HTMLInputElement | null;
	}>({
		"Promotion (%)": null,
		"Promotion Cap": null,
		Service: null,
	});
	const [removeState, setRemoveState] = useState(false);

	function handleNameClick(event: React.MouseEvent<HTMLParagraphElement>) {
		const name = (event.target as HTMLParagraphElement).innerText;
		if (selection.filter(i => i.name === name).length > 0) {
			setSelection(old => old.filter(person => person.name !== name));
			return;
		}
		setSelection(old => [...old, people[name]]);
	}

	useEffect(() => {
		const savedPeople: string[] = JSON.parse(localStorage.getItem("people") || "[]");

		setPeople(() => {
			return savedPeople.reduce(
				(obj: { [name: string]: Person }, name: string, index: number) => ({
					...obj,
					[name]: {
						name: name,
						items: [],
						total: 0,
						id: index,
					},
				}),
				{}
			);
		});
	}, []);

	useEffect(() => {
		localStorage.setItem("people", JSON.stringify(Object.keys(people)));
		if (Object.values(people).length == 0) {
			setRemoveState(false);
		}
	}, [people]);

	const promotionRef = inputRefs["Promotion (%)"];

	useEffect(() => {
		inputRefs["Promotion (%)"]?.focus();
	}, [inputRefs, promotionRef]);

	// This allows the correct input to be focused when the user presses enter
	// We want the same field to be focussed in general except for the first two fields
	function refocus(key: string) {
		switch (key) {
			case "Promotion (%)":
				inputRefs["Promotion Cap"]?.focus();
				break;
			case "Promotion Cap":
				inputRefs["Service"]?.focus();
				break;
			default:
				inputRefs[key]?.focus();
		}
	}

	// Passed down to child components to set their reference so they can be controlled in this component
	function addToRefObject(ref: HTMLInputElement) {
		if (ref === null || ref === undefined) return;
		setInputRefs(old => ({ ...old, [ref.title]: ref }));
	}

	function removePerson(name: string) {
		const newPeople = { ...people };
		delete newPeople[name];
		setPeople(newPeople);
	}

	return (
		<div className="w-screen overflow-hidden">
			<TopBar />
			<div className="md:pt-20 md:pl-20 md:pr-20">
				<div className="w-64 flex flex-col divide-y justify-center border-x border-t rounded-t">
					<Modifier
						name="Promotion (%)"
						modifier={promotion}
						setModifier={setPromotion}
						addToRefObject={addToRefObject}
						refocus={refocus}
						colour="text-green-700"
					>
						{promotion == 0 ? "No Promotion" : promotion + "%"}
					</Modifier>
					<Modifier
						name="Promotion Cap"
						modifier={promotionCap}
						setModifier={setPromotionCap}
						addToRefObject={addToRefObject}
						refocus={refocus}
						colour="text-green-500"
					>
						{promotionCap == 0 ? "No Promotion Cap" : "£" + promotionCap?.toFixed(2)}
					</Modifier>
				</div>
				<div
					id="section-container"
					className="grid md:grid-cols-65/35"
				>
					<div
						id="item-entry-container"
						className="w-auto h-auto border-y border-l text-center rounded-bl"
					>
						<Headings />
						<Row
							people={[service["Service"]]}
							setPeople={setService}
							className="text-orange-500"
							refocus={refocus}
							addToRefObject={addToRefObject}
						/>
						{Object.values(people).map(person => (
							<Row
								key={person.name}
								people={[person]}
								setPeople={setPeople}
								removePerson={removePerson}
								removeState={removeState}
								className={selectionMode ? "text-blue-600 cursor-pointer" : ""}
								handleNameClick={handleNameClick}
								refocus={refocus}
								addToRefObject={addToRefObject}
							/>
						))}
						{shared.map(people => (
							<Row
								key={people.map(person => person.name).join("")}
								people={[...people]}
								setPeople={setPeople}
								removePerson={removePerson}
								removeState={removeState}
								className="text-gray-700"
								refocus={refocus}
								addToRefObject={addToRefObject}
							></Row>
						))}
						<div className="flex flex-row items-center">
							<CreatePerson
								people={people}
								setPeople={setPeople}
							/>
							<CreateSharedItem
								{...{
									selection,
									setSelection,
									selectionMode,
									setSelectionMode,
									shared,
									setShared,
								}}
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 border w-full rounded-r">
						<SubtotalView people={[...Object.values(people), ...Object.values(service)]} />
						<TotalView
							promotion={promotion}
							promotionCap={promotionCap}
							service={service["Service"].total}
							people={Object.values(people)}
						/>
					</div>
				</div>
				<div className="flex">
					<EditPeople setRemoveState={setRemoveState} />
					<Button
						text="Clear People"
						handleClick={() => setPeople({})}
						className="w-28"
					/>
				</div>
			</div>
		</div>
	);
}
