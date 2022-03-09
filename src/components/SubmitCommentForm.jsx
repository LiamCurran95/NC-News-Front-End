import { useState } from "react";
import { useParams } from "react-router-dom";

const SubmitCommentForm = (prop) => {
	const { article_id } = useParams();
	const { addedComment } = prop;
	const [comment, setComment] = useState("");

	const handleComment = (e) => {
		e.preventDefault();
		const commentBody = e.target.elements[0].value;
		const commentAuthor = 1;
		const newComment = { comment: { commentAuthor, commentBody } };

		api.SubmitCommentForm(article_id, newComment).catch((err) => {
			setErr("Your comment was not posted, please try again");
		});

		//figure out how to move state (i.e. logged in user and pass here, also setup a create new user page)
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
					onChange={(e) => setComment(e.target.elements[0].value)}
				></input>
				<button className="submit-button" type="submit">
					Post your comment!
				</button>
			</form>
		</div>
	);
};

export default SubmitCommentForm;
