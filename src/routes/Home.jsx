import * as api from "../utils/api.js";
import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { useParams } from "react-router-dom";

const ArticleList = () => {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { slug } = useParams();
	const topic = slug;

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
		<main className="container">
			<div className="grid">
				{articles.map(
					({
						article_id,
						title,
						topic,
						created_at,
						votes,
						author,
						comment_count,
					}) => {
						return (
							<div className="articleCard">
								<ArticleCard
									key={`${article_id}`}
									title={title}
									author={author}
									topic={topic}
									created_at={created_at}
									votes={votes}
									comment_count={comment_count}
								/>
							</div>
						);
					}
				)}
			</div>
		</main>
	);
};

export default ArticleList;
