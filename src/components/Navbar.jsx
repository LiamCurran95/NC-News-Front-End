import * as api from "../utils/api";
import TopicFilter from "../components/TopicButton";
import { useState, useEffect } from "react";

const Navbar = () => {
	const [topic, setTopic] = useState([]);
	useEffect(() => {
		api.fetchAllTopics().then((data) => {
			setTopic(data);
		});
	}, []);

	return (
		<nav className="Navbar">
			<div className="filter">
				{topic.map(({ topic }) => {
					return <TopicFilter key={topic} topic={topic} />;
				})}
			</div>
		</nav>
	);
};

export default Navbar;
