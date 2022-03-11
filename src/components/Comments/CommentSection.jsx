//IMPORT REACT
import { useState, useEffect } from "react";
//IMPORT API
import * as api from "../../utils/api";
//IMPORT COMPONENTS
import CommentList from "./CommentList";

const CommentSection = ({ comments, article_id, setComments }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [commentsShown, setCommentsShown] = useState(false);
	const [err, setErr] = useState(null);

	const toggleShown = () => {
		setCommentsShown((commentsOpen) => !commentsOpen);
	};

	useEffect(() => {
		if (article_id) {
			api.fetchCommentsByArticleId(article_id).then((article_comments) => {
				setComments(article_comments);
				setIsLoading(false);
			});
		}
	}, [article_id]);

	if (isLoading) return <p>Loading...</p>;

	if (err) return <h1 className="error">{err}</h1>;

	return (
		<div>
			<button onClick={toggleShown} className="comments-section-toggle">
				{commentsShown ? (
					<div className="comments-section">
						<button className="comments-section-toggle">Hide comments</button>
						{comments.map((comment, index) => (
							<CommentList
								key={index}
								author={comment.author}
								votes={comment.votes}
								body={comment.body}
								created_at={new Date(comment.created_at).toUTCString()}
							/>
						))}
					</div>
				) : (
					"Show comments"
				)}
			</button>
		</div>
	);
};
export default CommentSection;
