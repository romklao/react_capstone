import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import SearchForm from './searchForm';
import ItemView from './itemViews';
import Pagination from './pagination';

function ShowSearchResults(props) {
        if (props.searchResults == null) {
            return <div></div>;
        }

        var results = [];
        for (var i=0; i<10; i++) {
            var item = props.searchResults[i];
            var price = item.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
                console.log('price', price);
            var imgURL = item.ImageSets[0].ImageSet[0].LargeImage[0].URL[0];

            var icon = "glyphicon glyphicon-heart heartFav"

            if (props.favorites) {
                for (var favorite of props.favorites) {
                    if (favorite.product.ASIN && item.ASIN[0] == favorite.product.ASIN[0]) {
                      icon += " changeTored";
                      break;
                    }
                  }
            }

            results.push(<ItemView imageUrl={imgURL} 
                                       icon={icon} 
                                       key={i}
                                       product={item}
                                       price={price} />);
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
                <div className="row imageSet">
                    {results}
                </div>
                <div className="row">
                    <Pagination />
                </div>
            </div>
        );
    
}

const mapStateToProps = (state, props) => {
    return {
        searchResults: state.searchResults,
        searchInput: state.searchInput,
        favorites: state.favorites,
    }
} 

export default connect(mapStateToProps)(ShowSearchResults);






