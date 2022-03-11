//IMPORT MIDDLEWARES
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

//IMPORT FILES
import "./App.css";
import Header from "./components/Structure/Header";
import Navbar from "./components/Structure/Navbar";
import Footer from "./components/Structure/Footer";
import Home from "./routes/AllArticles";
import SingleArticle from "./routes/SingleArticle";
import ErrorPage from "./components/ErrorPage";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Container maxWidth="xl" disableGutters={true}>
					<Header />
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="*" element={<ErrorPage />} />
						<Route path="/topic/:topic" element={<Home />} />
						<Route path="/articles/:article_id" element={<SingleArticle />} />
					</Routes>
					<Footer />
				</Container>
			</div>
		</BrowserRouter>
	);
}

export default App;
