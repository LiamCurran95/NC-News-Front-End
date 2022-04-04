import * as api from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ThumbUpOffAlt, ThumbDownOffAlt } from "@mui/icons-material/";
import CommentSection from "../components/Comments/CommentSection";
import SubmitCommentForm from "../components/Comments/SubmitCommentForm";

const SingleArticle = () => {
	const [err, setErr] = useState(null);
	const { article_id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [article, setArticle] = useState({});
	const [currentVotes, setVotes] = useState(0);

	const handleVote = (value) => {
		setVotes((currentVotes) => currentVotes + value);
		setErr(null);
		api.voteOnArticle(article_id, value).catch(() => {
			if (value) setVotes((votes) => votes - value);
			setErr("Vote failed, please try again");
		});
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
						setComments(article_comments);
						setIsLoading(false);
					});
				})
				.catch(() => {
					console.log("here");
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

				<IconButton onClick={() => handleVote(1)} color="primary">
					<ThumbUpOffAlt fontSize="large" />
				</IconButton>
				<IconButton onClick={() => handleVote(-1)} color="primary">
					<ThumbDownOffAlt fontSize="large" />
				</IconButton>

				{err ? <p>{err}</p> : null}

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
				/>
			</div>
		</main>
	);
};

export default SingleArticle;
