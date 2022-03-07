//IMPORT MIDDLEWARES
import { BrowserRouter, Routes, Route } from "react-router-dom";

//IMPORT FILES
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./routes/Home";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
