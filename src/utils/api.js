import axios from "axios";
const mcAPI = axios.create({
	baseURL: "https://lc-nc-news.herokuapp.com/api",
});

export function fetchAllArticles(sort, order) {
	return mcAPI
		.get("/articles", {
			params: {
				sort_by: sort,
				order: order,
			},
		})
		.then(({ data: { articles } }) => {
			return articles;
		});
}

export function fetchArticlesByTopic(topic, sort, order) {
	return mcAPI
		.get("/articles", {
			params: {
				topic: topic,
				sort_by: sort,
				order: order,
			},
		})
		.then(({ data: { articles } }) => {
			return articles;
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
			return article;
		})
		.catch((err) => {
			console.log(err);
		});
}

export function voteOnArticle(article_id, vote) {
	return mcAPI
		.patch(`/articles/${article_id}`, { inc_votes: vote })
		.then(({ data: { article } }) => {
			return article;
		});
}

export function fetchCommentsByArticleId(article_id) {
	return mcAPI
		.get(`/articles/${article_id}/comments`)
		.then(({ data: { article_comments } }) => {
			return article_comments;
		})
		.catch((err) => {
			console.log(err);
		});
}

export function addCommentToArticle(article_id, { comment }) {
	return mcAPI
		.post(`/articles/${article_id}/comments`, comment, article_id)
		.then(({ data }) => {
			return data;
		});
}

export function deleteCommentFromArticle(comment_id) {
	return mcAPI.delete(`/comments/${comment_id}`).then(({ data }) => {
		return data;
	});
}
