import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import SearchForm from './searchForm';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        
    }

    onClick(pageNum) {
        this.setState({pageNum: pageNum});
        this.props.dispatch(actions.searchSubmit(this.props.searchInput, pageNum));
    }

    render() {
        return (
            <div className="col-lg-12 col-sm-12" >
                <ul className="pagination">
                    <li><a href="#" value="1" onClick={() => this.onClick(1)}>1</a></li>
                    <li><a href="#" value="2" onClick={() => this.onClick(2)}>2</a></li>
                    <li><a href="#" value="3" onClick={() => this.onClick(3)}>3</a></li>
                    <li><a href="#" value="4" onClick={() => this.onClick(4)}>4</a></li>
                    <li><a href="#" value="5" onClick={() => this.onClick(5)}>5</a></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        searchInput: state.searchInput,
    }
}

export default connect(mapStateToProps)(Pagination);


