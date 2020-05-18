import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import {PostView} from "./PostView";
import {Post} from "./Post";
import {apiFetchAuth} from "./fetcher";

interface State {
    posts: Post[],
    pageNr: number,
    perPage: number,
    hasMore: boolean
}

export class FeedView extends React.Component {
    state = {
        posts: [],
        pageNr: 0,
        perPage: 20,
        hasMore: true
    }

    async loadMorePosts(state: State) {
        // FIXME hasMore
        await apiFetchAuth(true, `posts?_page=${state.pageNr}&_limit=${state.perPage}`, {method: 'GET'})
            .then(json => this.setState({hasMore: json !== [], posts: [...state.posts, ...json], pageNr: state.pageNr + 1}));
    }

    render() {
        return <InfiniteScroll
            pageStart = {0}
            loadMore = {() => this.loadMorePosts(this.state)}
            hasMore = {this.state.hasMore}
            loader={
                <div>Loading...</div>
            }
        >
            {this.state.posts.map(post => <PostView post={post} />)}
        </InfiniteScroll>
    }
}
