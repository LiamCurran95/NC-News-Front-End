export function compareCommentDate(a) {
	const sorted = a.sort((a, b) => {
		return a.created_at < b.created_at
			? -1
			: a.created_at > b.created_at
			? 1
			: 0;
	});
	return sorted.reverse();
}
