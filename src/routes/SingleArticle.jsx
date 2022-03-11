//IMPORT REACT
import * as api from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//IMPORT MUI
import { IconButton } from "@mui/material";
import { ThumbUpOffAlt, ThumbDownOffAlt } from "@mui/icons-material/";

//IMPORT COMPONENTS
import CommentSection from "../components/Comments/CommentSection";
import SubmitCommentForm from "../components/Comments/SubmitCommentForm";

const SingleArticle = () => {
	const { article_id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState(null);
	const [comments, setComments] = useState([]);
	const [article, setArticle] = useState({});
	const [currentVotes, setVotes] = useState(0);

	const handleVote = (value) => {
		setVotes((currentVotes) => currentVotes + value);
		setErr(null);
		api.voteOnArticle(article_id, value).catch((err) => {
			if (value) setVotes((votes) => votes - value);
			setErr("Vote failed, please try again");
		});
	};

	useEffect(() => {
		if (article_id) {
			api.fetchArticleById(article_id).then((data) => {
				setArticle(data);
				setIsLoading(false);
			});
		}
		if (article_id) {
			api.fetchCommentsByArticleId(article_id).then((article_comments) => {
				setComments(article_comments);
				setIsLoading(false);
			});
		}
	}, [article_id]);

	if (isLoading) return <p>Loading...</p>;

	return (
		<main className="container">
			<div className="singleArticle">
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
