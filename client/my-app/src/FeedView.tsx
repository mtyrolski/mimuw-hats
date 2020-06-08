import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import {PostView} from "./PostView";
import {Post} from "./Post";
import {apiFetchAuth} from "./fetcher";
import {Spin} from "antd";

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
        perPage: 5,
        hasMore: true
    }

    async loadMorePosts(state: State) {
        await apiFetchAuth(true, `posts?page=${state.pageNr}&perPage=${state.perPage}`, {method: 'GET'})
            .then(response => response.json())
            .then(json => this.setState({hasMore: json.length === state.perPage, posts: [...state.posts, ...json], pageNr: state.pageNr + 1}));
    }

    render() {
        return <InfiniteScroll
            pageStart = {0}
            loadMore = {() => this.loadMorePosts(this.state)}
            hasMore = {this.state.hasMore}
            loader={
                <div style={{display: 'flex'}}>
                    <div style={{margin: 'auto'}}><Spin /></div>
                </div>
            }
        >
            {this.state.posts.map(post => <PostView post={post} />)}
        </InfiniteScroll>
    }
}
