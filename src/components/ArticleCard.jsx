import { Link } from "react-router-dom";
import { Card, CardActionArea } from "@mui/material";

const ArticleCard = ({
	article_id,
	title,
	topic,
	created_at,
	votes,
	author,
	comment_count,
}) => {
	return (
		<Link to={`/articles/${article_id}`} style={{ textDecoration: "none" }}>
			<CardActionArea className="grid">
				<Card variant="outlined" className="article-card-info">
					<h3 className="title">{title}</h3>
					<h4 className="author">Author: {author} </h4>
					<h5 className="comment_count">Comments: {comment_count} </h5>
					<h5 className="votes">Article votes: {votes}</h5>
					<h5 className="created_at">{created_at.slice(0, 10)}</h5>
					<h5 className="topic">#{topic}</h5>
				</Card>
			</CardActionArea>
		</Link>
	);
};

export default ArticleCard;
