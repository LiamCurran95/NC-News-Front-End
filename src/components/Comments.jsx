import * as api from "../utils/api";
import { useState, useEffect } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";
import {
	List,
	ListItem,
	Divider,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Typography,
} from "@mui/material";

const CommentList = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [commentsShown, setCommentsShown] = useState(false);
	const { article_id } = useParams();

	useEffect(() => {
		if (article_id) {
			api.fetchCommentsByArticleId(article_id).then((article_comments) => {
				setComments(article_comments);
				setIsLoading(false);
			});
		}
	}, [article_id]);

	const toggleShown = () => {
		setCommentsShown((commentsOpen) => !commentsOpen);
	};

	if (isLoading) return <p>Loading...</p>;

	return (
		<div>
			<button onClick={toggleShown} className="comments-section-toggle">
				{commentsShown ? (
					<div className="comments-section">
						<button className="comments-section-toggle">Hide comments</button>
						{comments.map(({ votes, created_at, author, body }) => {
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
												<Avatar
													alt={author}
													src="../public/generic-avatar.png"
												/>
											</ListItemAvatar>
											<ListItemText
												primary={author}
												secondary={
													<React.Fragment>
														<Typography
															sx={{ display: "inline" }}
															component="span"
															variant="body2"
															color="text.primary"
														></Typography>
														{body}
													</React.Fragment>
												}
											/>
											<Divider variant="inset" component="li" />
										</ListItem>
										<ListItemText Primary="Votes: " secondary={votes} />
										<ListItemText
											Primary="Created at: "
											secondary={created_at}
										/>
										<Divider variant="inset" component="li" />
									</List>
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
};
export default CommentList;
