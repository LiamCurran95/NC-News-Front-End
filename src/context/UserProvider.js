import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
		username: "grumpy19",
		avatar_url:
			"https://www.croptecshow.com/wp-content/uploads/2017/04/guest-avatar-250x250px.png",
		kudos: 0,
	});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
