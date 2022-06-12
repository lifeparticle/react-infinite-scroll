import { useState, useCallback, useRef } from "react";
import "./App.css";
import { Virtuoso } from "react-virtuoso";

const generateNumbers = () => {
	return Array(10)
		.fill()
		.map(() => Math.floor(Math.random() * 100));
};

function App() {
	const [numbersLeft, setNumbersLeft] = useState(() => generateNumbers());
	const [numbersRight, setNumbersRight] = useState(() => generateNumbers());

	const parentRef = useRef();
	const loadMoreLeft = useCallback(() => {
		return setTimeout(() => {
			setNumbersLeft((numbers) => [...numbers, ...generateNumbers()]);
		}, 200);
	}, []);

	const loadMoreRight = useCallback(() => {
		return setTimeout(() => {
			setNumbersRight((numbers) => [...numbers, ...generateNumbers()]);
		}, 200);
	}, []);

	return (
		<div className="app">
			<Virtuoso
				style={{ height: 400 }}
				data={numbersLeft}
				endReached={loadMoreLeft}
				itemContent={(index) => (
					<div className="scrollLeft">
						<div>
							<h1>{numbersLeft[index]}</h1>
						</div>
					</div>
				)}
			/>
			<div className="scrollRightParent" ref={parentRef}>
				<Virtuoso
					style={{ height: "100vh" }}
					data={numbersRight}
					endReached={loadMoreRight}
					useWindowScroll
					customScrollParent={parentRef.current}
					itemContent={(index) => (
						<div className="scrollRight">
							<div>
								<h1>{numbersRight[index]}</h1>
							</div>
						</div>
					)}
				/>
			</div>
		</div>
	);
}

export default App;
