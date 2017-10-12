import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import CategoryView from './CategoryView'

var categoriesData = {
    'Beauty': {
        'Wash Face': {
            'bgClass': 'child bgCleanser',
            'parentClass': 'parent parentCleanser'
        },
        'Moisturizer': {
            'bgClass': 'child bgMoist',
            'parentClass': 'parent parentMoist'
        },
        'Serum for Face': {
            'bgClass': 'child bgSerum',
            'parentClass': 'parent parentSerum'
        },
        'Oil Treatment': {
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
        'Toner for Face': {
            'bgClass': 'child bgToner',
            'parentClass': 'parent parentToner'
        },
        'Hand Repair and Foot Repair Cream': {
            'bgClass': 'child bgHand',
            'parentClass': 'parent parentHand'
        }
    },
    'Electronics': {
        'Headphone': {
            'bgClass': 'child bgHeadphone',
            'parentClass': 'parent parentHeadphone parentElectronics'
        },
        'Bluetooth Headphone': {
            'bgClass': 'child bgBluetoothHeadphone',
            'parentClass': 'parent parentBluetoothHeadphone parentElectronics'
        },
        'Bluetooth Speaker': {
            'bgClass': 'child bgBluetoothSpeaker',
            'parentClass': 'parent parentBluetoothSpeaker parentElectronics'
        },
        'Flash Drive': {
            'bgClass': 'child bgUSB',
            'parentClass': 'parent parentUSB parentElectronics'
        },
        'Outlet Power Strip': {
            'bgClass': 'child bgOutlet',
            'parentClass': 'parent parentOutlet parentElectronics'
        },
        'Sonos': {
            'bgClass': 'child bgSonos',
            'parentClass': 'parent parentSonos parentElectronics'
        },
        'TV': {
            'bgClass': 'child bgTV',
            'parentClass': 'parent parentTV parentElectronics'
        },
        'TV Stick': {
            'bgClass': 'child bgTVStick',
            'parentClass': 'parent parentTVStick parentElectronics'
        },
        'Eco Dot': {
            'bgClass': 'child bgEcoDot',
            'parentClass': 'parent parentEcoDot parentElectronics'
        },
        'Kindle': {
            'bgClass': 'child bgKindle',
            'parentClass': 'parent parentKindle parentElectronics'
        },
        'iPhone Unlocked': {
            'bgClass': 'child bgiPhone',
            'parentClass': 'parent parentiPhone parentElectronics'
        },
        'Cell Phone Accessories': {
            'bgClass': 'child bgCellPhoneAccessories',
            'parentClass': 'parent parentCellPhoneAccessories parentElectronics'
        },
        'Power Bank': {
            'bgClass': 'child bgPowerBank',
            'parentClass': 'parent parentPowerBank parentElectronics'
        }
    }
}

export function CategoryViews(props) {
    console.log('category', props.params.category)
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
