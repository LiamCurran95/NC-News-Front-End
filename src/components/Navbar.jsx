import * as api from "../utils/api";
import TopicButton from "../components/TopicButton";
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
				{topic.map(({ slug }) => {
					return <TopicButton key={slug} topic={slug} />;
				})}
			</div>
		</nav>
	);
};

export default Navbar;
