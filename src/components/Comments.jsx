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
			<button onClick={toggleShown} className="comments-section-toggle">
				{commentsShown ? (
					<div className="comments-section">
						<button className="comments-section-toggle">Hide comments</button>
						{comments.map(({ votes, created_at, author, body }) => {
							return (
								<div>
									<ul className="comments-section-author">{author}</ul>
									<ul className="comments-section-created-at">{created_at}</ul>
									<ul className="comments-section-votes">{votes}</ul>
									<ul className="comments-section-body">{body}</ul>
								</div>
							);
						})}
					</div>
				) : (
					"Show comments"
				)}
			</button>
		</div>
	);
};
export default CommentList;
