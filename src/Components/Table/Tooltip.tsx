// import { useState } from "react";
// import { JSX } from "preact";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Tooltip(props: {
//   children?: JSX.Element;
//   text: string;
// }) {
//   const [active, setActive] = useState(false);

//   return (
//     <div
//       className="inline-block relative w-full"
//       onMouseEnter={() => setActive(true)}
//       onMouseLeave={() => setActive(false)}
//     >
//       <AnimatePresence>
//         {active && (
//           <motion.div
//             className="absolute bottom-full w-40 flex justify-center"
//             animate={{ scale: 1, y: -5 }}
//             initial={{ scale: 0, y: 10 }}
//             exit={{ scale: 0, y: 10 }}
//           >
//             <div className="w-full bg-gray-50 text-center rounded-md shadow-md">
//               {props.text}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//       {props.children}
//     </div>
//   );
// }

export {};