export const searchBarMain = {// detail search
    target:'main',
    divStyle:['sl4', 'p2'],
    arrInp:
    {
        id:'input1',
        type:'text', // text or hidden
        placeholder:'-choose-',
        list:'asset_list',
        classSty:['mx2']
    },
    arrBtn: [
        {
            id:'btnSbmt1',
            mark:'',
            type:'button', // submit or button
            text: 'submit',
            classSty:['mx1'],
            js: {
                attr:'',
                value:''
            }
        },
        {
            id:'dlExcl',
            mark:'',
            type:'button', // submit or button
            text: 'download excel',
            classSty:['mx1'],
            js: {
                attr:'',
                value:''
            }
        }
    ]
}
