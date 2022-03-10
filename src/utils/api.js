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

export function addCommentToArticle(article_id, { comment: { author, body } }) {
	//article_id needs to be number - it is formatted in the api request in SCF and reading correct here.
	//comment format {author:body} all lowercase and it is
	console.log(article_id, { author, body });
	return mcAPI
		.post(`/articles/${article_id}/comments`, { author, body }, article_id)
		.then(({ data }) => {
			console.log(data);
			return data;
		});
}

/*
		describe("POST /api/articles/:article_id/comments", () => {
			test("Status 200 - Return body contains posted comment", () => {
				const comment = {
					author: "butter_bridge",
					body: "Wow,what a great comment!",
				};
				const articleID = 9;
				return request(app)
					.post(`/api/articles/${articleID}/comments`)
					.send(comment, articleID)
					.expect(201)
					.then(({ body }) => {
						expect(body).toEqual(
							expect.objectContaining({
								comment: {
									article_id: expect.any(Number),
									author: expect.any(String),
									body: expect.any(String),
									comment_id: expect.any(Number),
									created_at: expect.any(String),
									votes: expect.any(Number),
								},
							})
						);
					});
			});
			*/
