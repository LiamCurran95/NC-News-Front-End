import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function AlignItemsList() {
	return (
		<List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
				</ListItemAvatar>
				<ListItemText
					primary="Brunch this weekend?"
					secondary={
						<React.Fragment>
							<Typography
								sx={{ display: "inline" }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								Ali Connors
							</Typography>
							{" — I'll be in your neighborhood doing errands this…"}
						</React.Fragment>
					}
				/>
			</ListItem>
			<Divider variant="inset" component="li" />
		</List>
	);
}

///

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
