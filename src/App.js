import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts';
import PostLoadingComponent from './components/postLoading';

function App() {
	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
		setAppState({ loading: true });
        const http_scheme = window.location.protocol === "https:" ? "https://drf-react-bahri.herokuapp.com" : "http://127.0.0.1:8000";
        const apiUrl = http_scheme + '/api/'
		fetch(apiUrl)
			.then((data) => data.json())
			.then((posts) => {
				setAppState({ loading: false, posts: posts });
			});
	}, [setAppState]);
	return (
		<div className="App">
			<h1>Latest Posts</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default App;