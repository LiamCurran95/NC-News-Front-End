import { useState, useEffect, Fragment } from "react";
import * as api from "../../utils/api";
import { UserContext } from "../../context/UserProvider";

import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	ListItemButton,
	Divider,
	Avatar,
	Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const CommentList = ({
	setComments,
	existing_comments,
	comment_id,
	article_id,
	created_at,
	author,
	body,
	votes,
}) => {
	const {
		user: { username },
	} = useContext(UserContext);
	const [deleteComment, setDeleteComment] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [err, setErr] = useState(null);

	const handleDelete = (deletedComment) => {
		setDeleteComment(true);
		setErr(null);
		api
			.deleteCommentFromArticle(deletedComment)
			.then(() => {
				setDeleteComment(false);
				const newComments = existing_comments.filter(
					(comment) => comment.comment_id !== comment_id
				);
				setComments(newComments);
			})
			.catch(() => {
				setDeleteComment(false);
				setErr("Comment was not deleted, please try again");
			});
	};

	useEffect(() => {
		if (deleteComment === true) {
			api.fetchCommentsByArticleId(article_id).then((article_comments) => {
				setComments(article_comments);
				setIsLoading(false);
				setErr(null);
			});
		}
	}, [setComments, article_id, deleteComment]);

	if (isLoading) return <p>Loading...</p>;
	if (err) return <h1 className="error">{err}</h1>;

	return (
		<div>
			<List
				sx={{
					width: "100%",
					maxWidth: 1000,
					bgcolor: "background.paper",
				}}
			>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt={author} src="../public/generic-avatar.png" />
					</ListItemAvatar>
					<ListItemText
						primary={author}
						secondary={
							<Fragment>
								<Typography
									sx={{ display: "inline" }}
									component="span"
									variant="body2"
									color="text.primary"
								></Typography>
								{body}
							</Fragment>
						}
					/>
				</ListItem>
				{username === author && (
					<ListItemButton>
						<DeleteIcon
							disabled={deleteComment}
							onClick={() => {
								handleDelete(comment_id);
							}}
						/>
					</ListItemButton>
				)}
				<ListItemText secondary={"Votes: " + votes} />
				<ListItemText secondary={created_at} />
				<Divider variant="inset" component="li" />
			</List>
		</div>
	);
};

export default CommentList;
