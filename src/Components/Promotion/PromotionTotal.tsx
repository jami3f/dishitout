// import { Tooltip } from "../Table";
import { Person } from "../../Types";
import { AnimatePresence, motion } from "framer-motion";

export default function PromotionTotal(props: { promotion: number; maxPromotion: number; people: Person[] }) {
	return (
		// <Tooltip text="The discount each person gets">
		<AnimatePresence>
			{props.promotion && (
				<motion.p
					className="col-span-2 inline"
					animate={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					exit={{ opacity: 0 }}
				>
					{props.people.map((p, index) => {
						return (
							<p key={index}>
								{p.name}: £{(p.total * (props.promotion / 100)).toFixed(2)}
							</p>
						);
					})}
				</motion.p>
			)}
		</AnimatePresence>
		/* </Tooltip> */
	);
}
