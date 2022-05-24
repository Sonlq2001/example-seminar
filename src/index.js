const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http = require("http");
const mongoose = require("mongoose");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const typeDefs = require("./schemas");
const resolvers = require("./resolvers");
const context = require("./context");

(async function (typeDefs, resolvers) {
	const app = express();
	const port = process.env.PORT || 8000;
	const httpServer = http.createServer(app);

	mongoose
		.connect("mongodb://localhost:27017/graphql")
		.then(() => console.log("connect db success"))
		.catch(() => console.log("connect db fail"));

	const schema = makeExecutableSchema({ typeDefs, resolvers });

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: "/graphql",
	});

	const serverCleanup = useServer({ schema }, wsServer);

	const server = new ApolloServer({
		schema,
		context: () => context,
		csrfPrevention: true,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
						},
					};
				},
			},
		],
	});

	await server.start();
	server.applyMiddleware({
		app,
		path: "/graphql",
	});

	httpServer.listen(port, () => {
		console.log(
			`🚀 Query endpoint ready at http://localhost:${port}${server.graphqlPath}`
		);
		console.log(
			`🚀 Query endpoint ready at ws://localhost:${port}${server.graphqlPath}`
		);
	});
})(typeDefs, resolvers);
