import * as api from "../utils/api.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/Articles/ArticleCard";
import SortArticles from "../components/Articles/SortArticles.jsx";

const ArticleList = () => {
	const [err, setErr] = useState(null);
	const { topic } = useParams();
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [sort, setSort] = useState("created_at");
	const [order, setOrder] = useState("desc");
	const [err, setErr] = useState(null);

	useEffect(() => {
		setErr(null);
		if (!topic) {
			setIsLoading(true);

			api
				.fetchAllArticles(sort, order)
				.then((data) => {
					setArticles(data);
					setIsLoading(false);
				})
				.catch(() => {
					setErr(
						"Articles could not load, please refresh your browser to try again"
					);
					setIsLoading(false);
				});
		} else {
			setIsLoading(true);

			api
				.fetchArticlesByTopic(topic, sort, order)
				.then((data) => {
					setArticles(data);
					setIsLoading(false);
				})
				.catch(() => {
					setErr("No articles with that topic exist");
					setIsLoading(false);

				});
		}
	}, [topic, sort, order]);

	if (isLoading) return <p>Loading...</p>;

	if (err) return <h1 className="error">{err}</h1>;

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
