import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { Link } from "react-router-dom";

const Header = () => {
	const { user } = useContext(UserContext);

	return (
		<header className="Header">
			<h1 className="logo">
				<Link to="/">NC News</Link>
			</h1>

			<div className="userInfo">
				<ul key="userInfo">
					<li key="username">
						<span className="username">{user.username}</span>
					</li>
					<li key="avatar_img" className="avatar">
						<img src={user.avatar_url} alt={user.username} />
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
