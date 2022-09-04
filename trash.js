import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps = {
        category: 'general',
        // country: "in"
    }
    static propTypes = {
        category: PropTypes.string,
        // country: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            // articles: this.articles,
            loading: false,
            page: 1,
            articles: [],
            totalResults: 0

        }
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=6`;
        this.props.setProgress(30);
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.props.setProgress(50);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }


    async componentDidMount() {
        this.updateNews();
    }


    render() {


        let fetchMoreData = async () => {
            this.setState({ page: this.state.page + 1 })
            const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=6`;
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
            })

        };

        return (
            <>

                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top Headlines</h1>

                <div className="container ">
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4 " key={element.url}>
                                        <NewsItem title={element.title} description={element.description} url={element.url} urlToImage={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>

                        </div>
                    </InfiniteScroll>
                </div>

            </>
        )
    }
}
