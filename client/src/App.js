import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Graphql from "./graphqlApollo/Graphql";
import RestApi from "./restApi/RestApi";
import Book from "./graphqlApollo/Book";
import ChatScreen from "./chat/ChatScreen";

const App = () => {
	return (
		<BrowserRouter>
			<div>
				<Link to="/">Graphql</Link> --- <Link to="/rest">RestApi</Link>
				<hr />
			</div>
			<Routes>
				<Route path="/" element={<Graphql />} />
				<Route path="/rest" element={<RestApi />} />
				<Route path="/book/:id" element={<Book />} />
				<Route path="/subscription" element={<ChatScreen />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
