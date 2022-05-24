import React, { useState, useEffect } from "react";

const RestApi = () => {
	const [loading, setLoading] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [postInit, setPostInit] = useState({
		title: "",
		body: "",
	});
	const [pagination, setPagination] = useState({
		start: 0,
		limit: 3,
	});
	const [data, setData] = useState([]);

	useEffect(() => {
		const api = `https://jsonplaceholder.typicode.com/posts?_start=${pagination.start}&_limit=${pagination.limit}`;
		setLoading(true);
		fetch(api)
			.then((res) => res.json())
			.then((res) => {
				setData(res);
			})
			.finally(() => setLoading(false));
	}, [pagination]);

	return (
		<div style={{ padding: "0 20px" }}>
			<h3>Reset</h3>
			{loading && <div>Loading...</div>}
			<div>
				{!loading &&
					data.map((post) => (
						<div
							key={post.id}
							onClick={() => {
								setPostInit(post);
								setIsEdit(true);
							}}
						>
							{post.id}
							<div>
								<mark>title</mark>: <span>{post.title}</span>
							</div>
							<div>
								<mark>body</mark>: <span>{post.body}</span>
							</div>
							<button
								onClick={(e) => {
									e.stopPropagation();
									const api = `https://jsonplaceholder.typicode.com/posts/${post.id}`;
									fetch(api, {
										method: "DELETE",
										headers: { "Content-Type": "application/json" },
									})
										.then((res) => res.json())
										.then((res) => {
											console.log(res, "vo day nao");
											setData(data.filter((item) => item.id !== post.id));
										});
								}}
							>
								Delete
							</button>
							<br />
							<br />
						</div>
					))}
			</div>
			<div>
				<button
					disabled={pagination.start === 0}
					onClick={() =>
						setPagination({ ...pagination, start: --pagination.start })
					}
				>
					prev
				</button>
				<button
					onClick={() => {
						setPagination({ ...pagination, start: ++pagination.start });
					}}
				>
					next
				</button>
			</div>

			<hr />
			<div>
				<div>
					<label htmlFor="">title: </label>
					<input
						type="text"
						placeholder="title"
						value={postInit.title}
						onChange={(e) =>
							setPostInit({ ...postInit, title: e.target.value })
						}
					/>
				</div>
				<div>
					<label htmlFor="">body: </label>
					<input
						type="text"
						placeholder="body"
						value={postInit.body}
						onChange={(e) => setPostInit({ ...postInit, body: e.target.value })}
					/>
				</div>
				<button
					onClick={() => {
						const api = `https://jsonplaceholder.typicode.com/posts/${
							isEdit ? postInit.id : ""
						}`;
						fetch(api, {
							method: isEdit ? "PATCH" : "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(
								isEdit ? { ...postInit, body: undefined } : postInit
							),
						})
							.then((res) => res.json())
							.then((res) => {
								setData(
									isEdit
										? data.map((item) => (item.id === res.id ? res : item))
										: [...data, res]
								);
							});

						setPostInit({ title: "", body: "" });
					}}
				>
					{isEdit ? "edit" : "add"}
				</button>
				<button
					onClick={() =>
						setPostInit({ title: "", body: "" }) + setIsEdit(false)
					}
				>
					clear
				</button>
			</div>
		</div>
	);
};

export default RestApi;
