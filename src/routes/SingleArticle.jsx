import * as api from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleArticle = () => {
	const [articles, setArticles] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { article_id } = useParams();

	useEffect(() => {
		let isMounted = true;
		if (article_id) {
			api.fetchArticleById(article_id).then((data) => {
				if (isMounted) setArticles(data);
				setIsLoading(false);
			});
			return () => {
				isMounted = false;
			};
		}
	}, [article_id]);

	if (isLoading) return <p>Loading...</p>;
	const published = articles.created_at.toString().slice(0, 10);

	return (
		<main className="container">
			<div className="singleArticle">
				<h1 className="article_title">{articles.title}</h1>
				<h2 className="article_author">{articles.author}</h2>
				<h3 className="article_topic">{articles.topic}</h3>
				<p className="article_created_at">{published}</p>
				<p className="article_votes">{articles.votes}</p>
				<p className="article_comment_count">{articles.comment_count}</p>
			</div>
		</main>
	);
};

export default SingleArticle;
