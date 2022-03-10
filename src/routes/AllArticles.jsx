//IMPORT REACT
import * as api from "../utils/api.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//IMPORT COMPONENTS
import ArticleCard from "../components/Articles/ArticleCard";

const ArticleList = () => {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { topic } = useParams();

	useEffect(() => {
		if (!topic) {
			api.fetchAllArticles().then((data) => {
				setArticles(data);
				setIsLoading(false);
			});
		} else {
			api.fetchArticlesByTopic(topic).then((data) => {
				setArticles(data);
				setIsLoading(false);
			});
		}
	}, [topic]);

	if (isLoading) return <p>Loading...</p>;

	return (
		<main className="grid">
			{articles.map((article, index) => {
				return (
					<ArticleCard
						id={index}
						title={article.title}
						key={article.article_id}
						article={article.article}
						author={article.author}
						topic={article.topic}
						created_at={article.created_at}
						votes={article.votes}
						comment_count={article.comment_count}
						article_id={article.article_id}
					/>
				);
			})}
		</main>
	);
};

export default ArticleList;
