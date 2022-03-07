import { Link } from "react-router-dom";

const TopicButton = ({ topic }) => {
	return (
		<button>
			<Link to={`topic/${topic}`}>{topic}</Link>
		</button>
	);
};

export default TopicButton;
