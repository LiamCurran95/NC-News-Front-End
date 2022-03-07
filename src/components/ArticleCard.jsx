const ArticleCard = ({
	article_id,
	title,
	topic,
	created_at,
	votes,
	author,
	comment_count,
}) => {
	const published = created_at.toString().slice(0, 10);
	return (
		<article className="ArticleCard" key={article_id}>
			<div className="ArticleCard_info">
				<p className="topic">{title}</p>
				<p className="author">{author}</p>
				<p className="topic">{topic}</p>
				<p className="votes">Upvotes: {votes}</p>
				<p className="comment_count">Comment count: {comment_count}</p>
				<p className="created_at">Published on: {published}</p>
			</div>
		</article>
	);
};

export default ArticleCard;
