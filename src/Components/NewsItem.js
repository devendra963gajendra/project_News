// import PropTypes from 'prop-types'
import React from 'react'

const Newsitem = (props) => {

    let { title, description, url, urlToImage, author, date } = props
    return (
        <div>
            <div className="card" >
                <img src={urlToImage ? urlToImage : "https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/06/Amazon-Alexa.jpg"} className="card-img-top" alt="sdfasdf" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text"> {description} .</p>
                    <p className="card-text" ><small className="text-muted">By {!author ? "Aonymous" : author} at  {date}  </small></p>
                    <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a>

                </div>
            </div>
        </div >
    )
}

export default Newsitem