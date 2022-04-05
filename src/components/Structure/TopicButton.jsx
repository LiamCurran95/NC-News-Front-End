import { Link } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";

const TopicButton = ({ topic }) => {
	return (
		<Button variant="outlined" className="topic-button">
			<Link to={`topic/${topic}`}>{topic}</Link>
		</Button>
	);
};

export default TopicButton;
