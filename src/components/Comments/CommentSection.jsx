import { useState, useEffect } from "react";
import * as api from "../../utils/api";
import CommentList from "./CommentList";
import { compareCommentDate } from "../../utils/compareCommentDate";

const CommentSection = ({ existing_comments, article_id, setComments }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState(null);

	useEffect(() => {
		if (article_id) {
			api.fetchCommentsByArticleId(article_id).then((article_comments) => {
				const sortedComments = compareCommentDate(article_comments);
				setComments(sortedComments);
				setIsLoading(false);
				setErr(null);
			});
		}
	}, [article_id, setComments]);

	if (isLoading) return <p>Loading...</p>;
	if (err) return <h1 className="error">{err}</h1>;

	return (
		<div className="comment-section" alt="comment section">
			{existing_comments.map((comment, index) => (
				<CommentList
					key={index}
					author={comment.author}
					votes={comment.votes}
					body={comment.body}
					created_at={new Date(comment.created_at).toUTCString()}
					setComments={setComments}
					comment_id={comment.comment_id}
					existing_comments={existing_comments}
					article_id={article_id}
				/>
			))}
		</div>
	);
};
export default CommentSection;
