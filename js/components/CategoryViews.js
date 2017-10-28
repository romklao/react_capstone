import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import CategoryView from './CategoryView';
import Footer from './Footer';


var categoriesData = {
    'Beauty': {
        'Wash Face': {
            'bgClass': 'child bgCleanser',
            'parentClass': 'parent parentCleanser parentBeauty'
        },
        'Moisturizer': {
            'bgClass': 'child bgMoist',
            'parentClass': 'parent parentMoist parentBeauty'
        },
        'Serum for Face': {
            'bgClass': 'child bgSerum',
            'parentClass': 'parent parentSerum parentBeauty'
        },
        'Oil Treatment': {
            'bgClass': 'child bgTreatment',
            'parentClass': 'parent parentTreatment parentBeauty'
        },
        'Eyecream': {
            'bgClass': 'child bgEye',
            'parentClass': 'parent parentEye parentBeauty'
        },
        'Sunscreen': {
            'bgClass': 'child bgSun',
            'parentClass': 'parent parentSun parentBeauty'
        },
        'Toner for Face': {
            'bgClass': 'child bgToner',
            'parentClass': 'parent parentToner parentBeauty'
        },
        'Hand and Feet Cream': {
            'bgClass': 'child bgHand',
            'parentClass': 'parent parentHand parentBeauty'
        }
    },
    'Electronics': {
        'Headphone': {
            'bgClass': 'child bgHeadphone',
            'parentClass': 'parent parentHeadphone parentElectronics'
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
        'LED TVs': {
            'bgClass': 'child bgTV',
            'parentClass': 'parent parentTV parentElectronics'
        },
        'TV Stick': {
            'bgClass': 'child bgTVStick',
            'parentClass': 'parent parentTVStick parentElectronics'
        },
        'Echo Dot': {
            'bgClass': 'child bgEcoDot',
            'parentClass': 'parent parentEcoDot parentElectronics'
        },
        'Kindle': {
            'bgClass': 'child bgKindle',
            'parentClass': 'parent parentKindle parentElectronics'
        },
        'Unlocked Cell Phone': {
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
        },
        'Digital Zoom Camera': {
            'bgClass': 'child bgCamera',
            'parentClass': 'parent parentCamera parentElectronics'
        },
        'Fujifilm Instant Camera': {
            'bgClass': 'child bgInsCamera',
            'parentClass': 'parent parentInsCamera parentElectronics'
        }
    },
    'HealthPersonalCare': {
        'Vitamins': {
            'bgClass': 'child bgVitamins',
            'parentClass': 'parent parentVitamins'
        },
        'Mineral Supplements': {
            'bgClass': 'child bgMineral',
            'parentClass': 'parent parentVitamins'
        },
        'Prenatal Vitamins': {
            'bgClass': 'child bgPrenatal',
            'parentClass': 'parent parentVitamins'
        },
        'Nutritional Supplements': {
            'bgClass': 'child bgSupplements',
            'parentClass': 'parent parentVitamins'
        },
        'Herbal Supplements': {
            'bgClass': 'child bgHerbal',
            'parentClass': 'parent parentVitamins'
        },
        'Weight Loss Products': {
            'bgClass': 'child bgWeight',
            'parentClass': 'parent parentVitamins'
        },
        "Children's Vitamins": {
            'bgClass': 'child bgChildrenVitamins',
            'parentClass': 'parent parentBaby'
        },
    },
    'Baby': {
        'Disposable Diaper': {
            'bgClass': 'child bgDiaper',
            'parentClass': 'parent parentBaby'
        },
        'Diaper Wipes and Refills': {
            'bgClass': 'child bgDiaperWipes',
            'parentClass': 'parent parentBaby'
        },
        'Diaper Pails and Refills': {
            'bgClass': 'child bgDiaperPails',
            'parentClass': 'parent parentBaby'
        },
        'Toilet Training Pants': {
            'bgClass': 'child bgTrainingPants',
            'parentClass': 'parent parentBaby'
        },
        'Baby Thermometers': {
            'bgClass': 'child bgThermometers',
            'parentClass': 'parent parentBaby'
        },
        "Colic and Gas Relief": {
            'bgClass': 'child bgGasRelief',
            'parentClass': 'parent parentBaby'
        },
    }
}

export function CategoryViews(props) {
    console.log('category', props.params.category)
    let results = [];
    let category = props.params.category;
    let categoryHealth;
    let categoryGeneral

    if (category === "HealthPersonalCare") {
        categoryHealth = "Vitamins & Dietary Supplements";
    } else {
        categoryGeneral = category;
    }

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
                <h1 className="categoryGeneral">{categoryGeneral} {categoryHealth}</h1>
                <div className="row categoryWrap">
                    {results}
                </div>
                <Footer/>
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
