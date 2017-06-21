import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import SearchForm from './searchForm';
import ImageResults from './itemViews';
import Pagination from './pagination';

function ShowSearchResults(props) {
        if (props.searchResults == null) {
            return <div></div>
        }
        var results = [];
        for (var i=0; i<10; i++) {
            var imgURL = props.searchResults[i].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
            results.push(<ImageResults imageUrl={imgURL} 
                                       icon="glyphicon glyphicon-heart heartFav"
                                       key={i}
                                       product={props.searchResults[i]} />);
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
    }
} 

export default connect(mapStateToProps)(ShowSearchResults);






