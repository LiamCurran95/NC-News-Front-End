import { Link } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";

const TopicButton = ({ topic }) => {
	return (
		<div>
			<Button
				variant="outlined"
				className="topic-button"
				alt="topic option buttons"
			>
				<Link to={`topic/${topic}`}>{topic}</Link>
			</Button>
		</div>
	);
};

export default TopicButton;
