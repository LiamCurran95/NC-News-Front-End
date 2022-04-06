import { useState, useEffect } from "react";

import * as api from "../../utils/api";
import TopicButton from "./TopicButton";

const Navbar = () => {
	const [topic, setTopic] = useState([]);
	useEffect(() => {
		api.fetchAllTopics().then((data) => {
			setTopic(data);
		});
	}, []);

	return (
		<nav className="navbar" alt="navigation options">
			{topic.map(({ slug }) => {
				return <TopicButton key={slug} topic={slug} />;
			})}
		</nav>
	);
};

export default Navbar;
