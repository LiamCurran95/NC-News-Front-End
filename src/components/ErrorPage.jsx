const ErrorPage = ({ error }) => {
	return (
		<div>
			<h1 alt="error code">{error.code}</h1>
			<h1 alt="error message">{error.msg}</h1>
		</div>
	);
};

export default ErrorPage;
