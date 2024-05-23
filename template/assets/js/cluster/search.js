import {createDiv,
    symbolBtn,
        textInp
} from "../../index.js";

export const searchMagnifier = (target, idInput) => {
    createDiv({
        selector: target,
        id: 'search' + idInput,
        class: 'card-r'
    })
    symbolBtn({
        selector: '#search' + idInput,
        id: '#searchBtn' + idInput,
        type: 'button',
        class: 'magnifier',
        textCont:' ',
    })
    textInp({                    
        selector: '#search' + idInput,
        id: '#searchInp' + idInput,
        placeholder: 'search',
        class: 'searchForm'
    })

}