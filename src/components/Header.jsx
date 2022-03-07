import { useState } from "react";
import { userContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Header = () => {
	const [user, setUser] = useState({
		username: "Guest",
		avatar_url:
			"https://www.croptecshow.com/wp-content/uploads/2017/04/guest-avatar-250x250px.png",
		kudos: 0,
	});

	return (
		<userContext.Provider value={{ user, setUser }}>
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
		</userContext.Provider>
	);
};

export default Header;
