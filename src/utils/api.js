import axios from "axios";
const mcAPI = axios.create({
	baseURL: "https://lc-nc-news.herokuapp.com/api",
});

export function fetchAllArticles() {
	return mcAPI
		.get("/articles")
		.then(({ data: { articles } }) => {
			return articles;
		})
		.catch((err) => {
			console.log(err);
		});
}

export function fetchArticlesByTopic(topic) {
	return mcAPI
		.get(`/articles?topic=${topic}`)
		.then(({ data: { articles } }) => {
			return articles;
		})
		.catch((err) => {
			console.log(err);
		});
}

export function fetchAllTopics() {
	return mcAPI
		.get("/topics")
		.then(({ data: { topics } }) => {
			return topics;
		})
		.catch((err) => {
			console.log(err);
		});
}

export function fetchArticleById(article_id) {
	return mcAPI
		.get(`/articles/${article_id}`)
		.then(({ data: { article } }) => {
			console.log(article);
			return article;
		})
		.catch((err) => {
			console.log(err);
		});
}
