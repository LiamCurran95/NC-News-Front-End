const ErrorPage = ({ error }) => {
	return (
		<div>
			<h1>{error.code}</h1>
			<h1>{error.msg}</h1>
		</div>
	);
};

export default ErrorPage;
