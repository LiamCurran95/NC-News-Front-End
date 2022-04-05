import * as api from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ThumbUpOffAlt, ThumbDownOffAlt } from "@mui/icons-material/";
import CommentSection from "../components/Comments/CommentSection";
import SubmitCommentForm from "../components/Comments/SubmitCommentForm";
import { compareCommentDate } from "../utils/compareCommentDate";

const SingleArticle = () => {
	const [err, setErr] = useState(null);
	const [inlineErr, setInlineErr] = useState(null);
	const { article_id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [article, setArticle] = useState({});
	const [currentVotes, setVotes] = useState(0);
	const [userVoted, setUserVoted] = useState(false);

	const handleVote = (value) => {
		if (userVoted === false) {
			setVotes((currentVotes) => currentVotes + value);
			setInlineErr(null);
			api.voteOnArticle(article_id, value).catch(() => {
				if (value) setVotes((votes) => votes - value);
				setErr("Vote failed, please try again");
			});
			setUserVoted(true);
		}
		if (userVoted === true) {
			setInlineErr("You cannot vote on an article twice.");
		}
	};

	useEffect(() => {
		if (article_id) {
			setIsLoading(true);
			api
				.fetchArticleById(article_id)
				.then((data) => {
					setArticle(data);
					setIsLoading(false);
				})
				.then(() => {
					api.fetchCommentsByArticleId(article_id).then((article_comments) => {
						const sortedComments = compareCommentDate(article_comments);
						setComments(sortedComments);
						setIsLoading(false);
					});
				})
				.catch(() => {
					setErr("No article by that ID exists, please try again");
					setIsLoading(false);
				});
		}
	}, [article_id]);

	if (isLoading) return <p>Loading...</p>;
	if (err) return <h1>{err}</h1>;

	return (
		<main className="grid">
			<div className="single-article">
				<h1 className="article_title">{article.title}</h1>
				<h2 className="article_author">{article.author}</h2>
				<p className="article_body">{article.body}</p>
				<h3 className="article_topic">#{article.topic}</h3>
				<p className="article_created_at">
					{new Date(article.created_at).toUTCString()}
				</p>
				<p className="article_votes">
					Article votes: {article.votes + currentVotes}
				</p>

				<IconButton onClick={() => handleVote(1)}>
					<ThumbUpOffAlt fontSize="large" />
				</IconButton>
				<IconButton onClick={() => handleVote(-1)}>
					<ThumbDownOffAlt fontSize="large" />
				</IconButton>

				{inlineErr ? <p>{inlineErr}</p> : null}

				<SubmitCommentForm
					article_id={article_id}
					existing_comments={comments}
					comment_count={article.comment_count}
					setComments={setComments}
				/>

				<CommentSection
					existing_comments={comments}
					article_id={article_id}
					comment_count={article.comment_count}
					setComments={setComments}
					comments={comments}
				/>
			</div>
		</main>
	);
};

export default SingleArticle;
