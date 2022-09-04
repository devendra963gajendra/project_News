import React from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from 'react';
import { useEffect } from 'react';

const News = (props) => {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [page, setpage] = useState(1);
    const [articles, setarticles] = useState([]);
    const [totalResults, settotalResults] = useState(0)
    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=6`;
        props.setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json()
        props.setProgress(50);
        props.setProgress(70);
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
        // eslint-disable-next-line
    }, [])


    let fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=6`;
        setpage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setarticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
    };

    return (
        <>
            <h1 className="text-center " style={{ margin: '35px 0px', marginTop: "79px" }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)}</h1>
            <div className="container ">
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
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

News.defaultProps = {
    category: 'general',
    // country: "in"
}
News.propTypes = {
    category: PropTypes.string,
    // country: PropTypes.string
}


export default News