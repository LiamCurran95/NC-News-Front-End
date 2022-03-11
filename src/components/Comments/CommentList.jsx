//IMPORT REACT
import * as React from "react";
//IMPORT API
import * as api from "../../utils/api";
//IMPORT MUI
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

const CommentList = (comment) => {
	const handleDelete = (comment_id) => {
		console.log(comment_id);
		// api.deleteCommentFromArticle(comment_id);
	};

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
						<Avatar alt={comment.author} src="../public/generic-avatar.png" />
					</ListItemAvatar>
					<ListItemButton>
						<DeleteIcon onClick={handleDelete(comment.comment_id)} />
					</ListItemButton>
					<Divider variant="inset" component="li" />

					<ListItemText
						primary={comment.author}
						secondary={
							<React.Fragment>
								<Typography
									sx={{ display: "inline" }}
									component="span"
									variant="body2"
									color="text.primary"
								></Typography>
								{comment.body}
							</React.Fragment>
						}
					/>
					<Divider variant="inset" component="li" />
				</ListItem>
				<ListItemText Primary="Votes: " secondary={comment.votes} />
				<ListItemText Primary="Created at: " secondary={comment.created_at} />
				<Divider variant="inset" component="li" />
			</List>
		</div>
	);
};

export default CommentList;
