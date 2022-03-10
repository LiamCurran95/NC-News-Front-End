import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import * as api from "../utils/api";

const SubmitCommentForm = (prop) => {
	const { article_id } = useParams();
	const { addedComment } = prop;
	const [comment, setComment] = useState("");
	const [err, setErr] = useState(null);
	const { user } = useContext(UserContext);

	const handleComment = (e) => {
		e.preventDefault();
		setErr(null);
		const commentBody = e.target.elements[0].value;
		const commentAuthor = user.username;
		const newComment = {
			comment: { author: commentAuthor, body: commentBody },
		};

		api.addCommentToArticle(+article_id, newComment).catch((err) => {
			setErr("Your comment was not posted, please try again");
		});
	};

	return (
		<div>
			<form className="comment-form" onSubmit={handleComment}>
				<label className="comment" htmlFor="comment">
					Comment here
				</label>
				<input
					type="text"
					id="comment"
					placeholder="Write your comment here"
					className="comment"
					value={addedComment}
					onSubmit={(e) => setComment(e.target.elements[0].value)}
				></input>
				<button className="submit-button" type="submit">
					Post your comment!
				</button>
				{err ? <p>{err}</p> : null}
			</form>
		</div>
	);
};

export default SubmitCommentForm;
