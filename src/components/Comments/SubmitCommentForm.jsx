//IMPORT REACT
import { useState, useContext } from "react";
//IMPORT API
import * as api from "../../utils/api";
//IMPORT CONTEXT
import { UserContext } from "../../context/UserProvider";
//IMPORT MUI
import { Box, TextField, Button } from "@mui/material";

const SubmitCommentForm = ({ article_id, setComments, addedComment }) => {
	const { user } = useContext(UserContext);
	const [err, setErr] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [postingComment, setPostingComment] = useState(false);

	const handleComment = (e) => {
		e.preventDefault();
		setPostingComment(true);
		setErr(null);
		const commentBody = e.target.elements[0].value;
		const newComment = {
			comment: { author: user.username, body: commentBody },
		};

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
			})
			.catch(() => {
				setPostingComment(false);
				setErr("Your comment was not posted, please try again");
			});
	};

	if (isLoading) return <p>Loading...</p>;

	if (err) return <h1 className="error">{err}</h1>;

	return (
		<Box
			component="form"
			sx={{ width: 2000, height: 500 }}
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
			<Button
				variant="contained"
				className="submit-button"
				type="submit"
				disabled={postingComment}
			>
				Post your comment!
			</Button>
		</Box>
	);
};

export default SubmitCommentForm;
