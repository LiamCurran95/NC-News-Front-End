//IMPORT REACT
import * as React from "react";
//IMPORT MUI
import {
	List,
	ListItem,
	Divider,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Typography,
} from "@mui/material";

const CommentList = (comment) => {
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
