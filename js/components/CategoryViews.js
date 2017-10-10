import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import CategoryView from './CategoryView'

var categoriesData = {
    'Beauty': {
        'Wash face': {
            'bgClass': 'child bgCleanser',
            'parentClass': 'parent parentCleanser'
        },
        'Moisturizer': {
            'bgClass': 'child bgMoist',
            'parentClass': 'parent parentMoist'
        },
        'Serum for face': {
            'bgClass': 'child bgSerum',
            'parentClass': 'parent parentSerum'
        },
        'Oil treatment': {
            'bgClass': 'child bgTreatment',
            'parentClass': 'parent parentTreatment'
        },
        'Eyecream': {
            'bgClass': 'child bgEye',
            'parentClass': 'parent parentEye'
        },
        'Sunscreen': {
            'bgClass': 'child bgSun',
            'parentClass': 'parent parentSun'
        },
        'Toner': {
            'bgClass': 'child bgToner',
            'parentClass': 'parent parentToner'
        },
        'Hand repair and foot repair cream': {
            'bgClass': 'child bgHand',
            'parentClass': 'parent parentHand'
        },
    }
}

export function CategoryViews(props) {
    let results = [];
    let category = props.params.category;
    let categoryData = categoriesData[category];

    if(categoryData) {

        for (let keywords in categoryData) {
            let styleData = categoryData[keywords];

            results.push(<CategoryView category={category}
                                       keywords={keywords}
                                       styleData={styleData}
                                       key={keywords} />);
        }
        return (
            <div className="categoryPage">
                <div>
                    {results}
                </div>
            </div>
        )
    } else {
        return (
            <div className="errorMsgWrap">
                <h1>error</h1>
            </div>
        );
    }
}

export default connect()(CategoryViews);
