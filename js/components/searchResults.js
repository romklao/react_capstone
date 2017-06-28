import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import SearchForm from './searchForm';
import ItemView from './itemViews';
import Pagination from './pagination';

function ShowSearchResults(props) {
        if (props.searchResults) {
            var results = [];
            for (var i=0; i<10; i++) {
                var item = props.searchResults[i];
                var price;

                if (item.OfferSummary) {
                    price = item.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
                }
                var imgURL = item.ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
                var icon = "glyphicon glyphicon-heart heartFav";
                var leftArrow = "glyphicon glyphicon-chevron-left leftArrow";
                var rightArrow = "glyphicon glyphicon-chevron-right rightArrow";
                var pageUrl = item.DetailPageURL[0];
                var blank = "_blank"

                results.push(<ItemView imageUrl={imgURL} 
                                       icon={icon} 
                                       key={i}
                                       product={item}
                                       price={price}
                                       leftArrow={leftArrow}
                                       rightArrow={rightArrow}
                                       pageUrl={pageUrl}
                                       blank ={blank}
                                       amazonLogoUrl="css/images/amazonLogo.png"/>);
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
                    <div className="row">
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
    }
} 

export default connect(mapStateToProps)(ShowSearchResults);






