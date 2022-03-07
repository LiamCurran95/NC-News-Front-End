const ArticleCard = ({
	article_id,
	title,
	topic,
	created_at,
	votes,
	author,
	comment_count,
}) => {
	return (
		<article className="ArticleCard" key={article_id}>
			<div className="ArticleCard_info">
				<p className="topic">{title}</p>
				<p className="topic">{topic}</p>
				<p className="author">${author}</p>
				<p className="votes">${votes}</p>
				<p className="comment_count">${comment_count}</p>
				<p className="created_at">${created_at}</p>
			</div>
		</article>
	);
};

export default ArticleCard;
