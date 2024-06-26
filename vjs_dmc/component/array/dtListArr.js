export const assetList = (src) => ({
    target:'root',
    id:'asset_list',
    data: src,
    delimiter:'/',
    optValue:['assetno', 'assetkategori','vjs_kategory'],
    optText:['assetno', 'assetkategori', 'assetname', 'location']
})


export const woList = (src) => ({
    target:'root',
    id:'woList',
    data: src,
    delimiter:' -- ',
    optValue:['wo_lot', 'wo_part', 'pt_desc1'],
    optText:['wo_lot']
})


export const allAsset = (src) => ({
    target:'root',
    id:'all_asset',
    data: src,
    delimiter:'/',
    optValue:['assetno', 'assetkategori', 'id', 'assetname', 'location'],
    optText:['assetno', 'assetkategori', 'assetname', 'location']
})

export const catData = (src) => ({
    target:'root',
    id:'sel_cat',
    data: src,
    delimiter:'',
    optValue:['mesin_cat'],
    optText:['mesin_cat']
})

export const insData = (src) => ({
    target:'root',
    id:'listInsp',
    data: src,
    delimiter:'--',
    optValue:['dmc_vjs','inspection'],
    optText:['dmc_vjs','inspection']
})
