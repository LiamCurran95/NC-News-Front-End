import { useState, useContext } from "react";
import * as api from "../../utils/api";
import { UserContext } from "../../context/UserProvider";
import { Box, TextField, Button } from "@mui/material";

const SubmitCommentForm = ({ article_id, setComments, addedComment }) => {
	const { user } = useContext(UserContext);
	const [err, setErr] = useState(null);
	const [inlineErr, setInlineErr] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [postingComment, setPostingComment] = useState(false);

	const handleComment = (e) => {
		e.preventDefault();
		setPostingComment(true);
		const commentBody = e.target.elements[0].value;
		const newComment = {
			comment: { author: user.username, body: commentBody },
		};
		if (newComment.comment.body.length !== 0) {
			api
				.addCommentToArticle(+article_id, newComment)
				.then(({ comment }) => {
					setPostingComment(false);
					setComments((existing_comments) => {
						const newComments = [...existing_comments];
						newComments.push(comment);
						return newComments;
					});
					setIsLoading(false);
					setErr(false);
				})
				.catch(() => {
					setPostingComment(false);
					setInlineErr("Your comment was not posted, please try again");
				});
		}
		if (newComment.comment.body.length === 0) {
			setInlineErr("You cannot post an empty comment");
		}
	};

	if (isLoading) return <p>Loading...</p>;

	if (err) return <h1>{err}</h1>;
	if (inlineErr) return <h2 className="error">{inlineErr}</h2>;

	return (
		<Box
			className="comment-box"
			component="form"
			noValidate
			autoComplete="off"
			onSubmit={handleComment}
		>
			<div>
				<TextField
					id="full-width-text-field"
					label="Write your comment here."
					multiline
					minRows={5}
					maxRows={10}
					value={addedComment}
					onSubmit={(e) => setComments(e.target.elements[0].value)}
					variant="filled"
					fullWidth={true}
				/>
			</div>
			<Button variant="contained" type="submit" disabled={postingComment}>
				Post your comment!
			</Button>
		</Box>
	);
};

export default SubmitCommentForm;
