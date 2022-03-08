import * as api from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CommentList = ({ article_comments }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [commentsShown, setCommentsShown] = useState(false);
	const { article_id } = useParams();

	useEffect(() => {
		if (article_id) {
			api.fetchCommentsByArticleId(article_id).then((article_comments) => {
				setComments(article_comments);
				setIsLoading(false);
			});
		}
	}, [article_id]);

	const toggleShown = () => {
		setCommentsShown((commentsOpen) => !commentsOpen);
	};

	if (isLoading) return <p>Loading...</p>;

	return (
		<div>
			<button onClick={toggleShown}>
				{commentsShown ? "Hide Comments" : "Show comments"}
			</button>
			{/* <div className="container-comments">{comments.map({article_id, author, body, comment_id, created_at, votes}) => {return ( <div>className</div>)} }</div> */}
		</div>
	);
};
export default CommentList;
