//IMPORT REACT
import * as api from "../utils/api.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//IMPORT COMPONENTS
import ArticleCard from "../components/Articles/ArticleCard";
import SortArticles from "../components/Articles/SortArticles.jsx";

const ArticleList = () => {
	const { topic } = useParams();
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [sort, setSort] = useState("created_at");
	const [order, setOrder] = useState("DESC");

	useEffect(() => {
		if (!topic) {
			api.fetchAllArticles(sort, order).then((data) => {
				setArticles(data);
				setIsLoading(false);
			});
		} else {
			api.fetchArticlesByTopic(topic, sort, order).then((data) => {
				setArticles(data);
				setIsLoading(false);
			});
		}
	}, [topic, sort, order]);

	if (isLoading) return <p>Loading...</p>;

	return (
		<main className="grid">
			<>
				<SortArticles
					sort={sort}
					setSort={setSort}
					order={order}
					setOrder={setOrder}
				/>
			</>
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
