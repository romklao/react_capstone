import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import SearchForm from './searchForm';
import ItemViews from './itemViews';
import Pagination from './pagination';

function ShowSearchResults(props) {
        if (props.searchResults) {
            let results = [];
            for (let i=0; i<10; i++) {
                let item = props.searchResults[i];
                let price;

                if (item.OfferSummary) {
                    price = item.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
                }
                let imgURL = item.ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
                let icon = "glyphicon glyphicon-heart heartFav";
                let arrowLeftUrl = "css/images/arrowLeft.png";
                let arrowRightUrl = "css/images/right.png";
                let pageUrl = item.DetailPageURL[0];
                let blank = "_blank";
                let amazonLogoUrl = "css/images/amazonLogo.png";
                let productTitle = item.ItemAttributes[0].Title[0];

                results.push(<ItemViews imageUrl={imgURL} 
                                       icon={icon} 
                                       key={i}
                                       product={item}
                                       price={price}
                                       productTitle={productTitle}
                                       arrowLeftUrl={arrowLeftUrl}
                                       arrowRightUrl={arrowRightUrl}
                                       pageUrl={pageUrl}
                                       blank ={blank}
                                       amazonLogoUrl={amazonLogoUrl}/>);
            }
            console.log('searchResults', props.searchResults)
            console.log('results', results)
            return (
                <div className="searchResults">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 searchText">
                            <h1>The results of {props.searchInput} !</h1>
                        </div>
                    </div>
                    <div className="row itemViewsBox">
                        {results}
                    </div>
                    <div className="row">
                        <Pagination />
                    </div>
                </div>
            );
        } 
}

const mapStateToProps = (state, props) => {
    return {
        searchResults: state.searchResults,
        searchInput: state.searchInput,
        favorites: state.favorites,
        authenticated: state.authenticated,
        errorSearchMessage: state.errorSearchMessage,
        confirmAddFavoriteMessage: state.confirmAddFavoriteMessage
    }
} 

export default connect(mapStateToProps)(ShowSearchResults);






