import { splitCustomString, strToNumber, currentDate } from '../../component/process.js';
import { jig_location_query, log_location_query, jig_master_query, log_master_query, jig_function_query, log_function_query } from '../../class.js';

export const updateInsertData = async() => {
    try {
        // ambil data dari input / form
        let data = [];
        let newData = [];
        data['key']=[];
        newData['key']=[];
        data['filter']=[];
        const form = document.querySelectorAll('[data-fromdb = "change"]');
        form.forEach(dt=> {
            const arrInput = dt.querySelectorAll('[data-input]');
            if (arrInput.length >0 ) {
                for (let i=0; i<arrInput.length; i++) {
                    const rawId = arrInput[i].id;
                    const id = splitCustomString("+", rawId);
                    const key = id[0];
                    const value = arrInput[i].value;
                    if (!data['key'].includes(`${key}`)) {
                        const codeLength = data['key'].length;
                        data['key'][codeLength] = key;
                    }
                    if (!data[key]) {
                        data[key] = [value];    
                    } else {
                        data[key].push(value);
                    }
                }}
            }
        )

        // for updating data
        // utk jig_location_query
        // code, item_jig, qty_per_unit, unit, lokasi, status, urut, toleransi
        const update1 = {
            item_jig: [],
            qty_per_unit: [],
            unit: [],
            lokasi: [],
            status: [],
            urut: [],
            toleransi: [],
            code: [],
        }
        let filter1 = {
            code:[]
        };

        let insert1 = {
            code: [],
            item_jig: [],
            qty_per_unit: [],
            unit: [],
            lokasi: [],
            trans_date: [],
            remark: [],
            status: [],
            urut: [],
            toleransi: [],
            addSub: [],
            qty_change: [],
        };

        const itemJig = document.getElementById('searchStock').value;
        const status = 'active';
        const tol = document.getElementById('tol').value;
        const today = currentDate();
        if(form.length>0) {
            console.log(data['qty'].length);
        for (let i=0; i<data['qty'].length; i++) {
            let qty_new = 0;
            if (data['addSub'][i] === 'tambah') {
                qty_new = parseInt(data['cur_qty_per_unit'][i]) + parseInt(data['qty'][i]);
            } else if (data['addSub'][i] === 'kurang') {
                if (parseInt(data['cur_qty_per_unit'][i])<parseInt(data['qty'][i])){
                    return alert("quantity perubahan lebih kecil dari pada qty on hand");
                }
                qty_new = parseInt(data['cur_qty_per_unit'][i]) - parseInt(data['qty'][i]);
            }
            const urut = parseInt(data['code'][i].substring(data['code'][i].length - 3));
            update1['item_jig'].push(itemJig); //
            update1['qty_per_unit'].push(qty_new);
            update1['unit'].push(data['unit'][i]);
            update1['lokasi'].push(data['lokasi'][i]);
            update1['status'].push(status); //
            update1['urut'].push(urut);
            update1['toleransi'].push(tol); //
            update1['code'].push(data['code'][i]);

            filter1['code'].push(data['code'][i]);

            insert1['code'].push(data['code'][i]);
            insert1['item_jig'].push(itemJig);
            insert1['qty_per_unit'].push(qty_new);
            insert1['unit'].push(data['unit'][i]);
            insert1['lokasi'].push(data['lokasi'][i]);
            insert1['trans_date'].push(today); //   
            insert1['remark'].push(data['remark'][i]);
            insert1['status'].push(status);
            insert1['urut'].push(urut);

            insert1['toleransi'].push(tol);
            insert1['addSub'].push(data['addSub'][i]);
            insert1['qty_change'].push(data['qty'][i]);
        }}
        

        // for new data 
        const arrNew = document.querySelectorAll('[data-new]');
        if(arrNew.length >0) {
        for (let i=0; i<arrNew.length; i++) {
            const rawId = arrNew[i].id;
            const id = splitCustomString("+", rawId);
            const key = id[0];
            const value = arrNew[i].value;
            if (!newData['key'].includes(`${key}`)) {
                const codeLength = newData['key'].length;
                newData['key'][codeLength] = key;
            }
            if (!newData[key]) {
                newData[key] = [value];    
            } else {
                newData[key].push(value);
            }
        }}

        let insert2 = {
            code: [],
            item_jig: [],
            qty_per_unit: [],
            unit: [],
            lokasi: [],
            status: [],
            urut: [],
            toleransi: [],
        }

        // insert log_location for new data
        let insert3 = {
            code: [],
            item_jig: [],
            qty_per_unit: [],
            unit: [],
            lokasi: [],
            trans_date: [],
            remark: [],
            status: [],
            urut: [],
            toleransi: [],
            addSub: [],
            qty_change: [],
        }

        if(newData['key'].length>0) {
            for (let i=0; i<newData['code'].length; i++) {
                const urut = parseInt(newData['code'][i].substring(newData['code'][i].length - 3));

                insert2['code'].push(newData['code'][i]);
                insert2['item_jig'].push(itemJig);
                insert2['qty_per_unit'].push(parseInt(newData['qty'][i]));
                insert2['unit'].push(newData['unit'][i]);
                insert2['lokasi'].push(newData['lokasi'][i]);
                insert2['status'].push(status);
                insert2['urut'].push(urut);
                insert2['toleransi'].push(tol);

                insert3['code'].push(newData['code'][i]);
                insert3['item_jig'].push(itemJig);
                insert3['qty_per_unit'].push(parseInt(newData['qty'][i]));
                insert3['unit'].push(newData['unit'][i]);
                insert3['lokasi'].push(newData['lokasi'][i]);
                insert3['status'].push(status);
                insert3['urut'].push(urut);
                insert3['toleransi'].push(tol);
                insert3['trans_date'].push(today);
                insert3['remark'].push(newData['remark'][i]);
                insert3['addSub'].push(newData['addSub'][i]);
                insert3['qty_change'].push(newData['qty'][i]);
            }
        }
        console.log({update1, filter1, insert2, insert3});
        if (newData['key'].length == 0) {
            const result3 = await jig_location_query.updateData(update1, filter1);     
            if (!result3.includes('fail')) {
                const result1 = await log_location_query.insertData(insert1);
                alert('data successfully updated');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } else {
                alert('data is not updated');
            }
            return;
        }

        const result3 = await jig_location_query.updateData(update1, filter1);     
        const result2 = await jig_location_query.insertData(insert2);
        if (!result3.includes('fail') && !result2.includes('fail')) {
            const result1 = await log_location_query.insertData(insert1);     
            const result4 = await log_location_query.insertData(insert3);     
            alert('data successfully updated');
            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            alert('data is not updated');
        }
    } catch(error){
        console.log(error);
    }

}













export const delDataStock = async(id,pk) => {
    try {
        const code = splitCustomString("+", id);
        const idToDelete = code[1];
        const item = splitCustomString("--", idToDelete);
        const allData = document.querySelectorAll(`[id*="${idToDelete}"]`);
        let data = [];
        for (let i=0; i<allData.length; i++) {
            const rawId = allData[i].id;
            const id = splitCustomString("+", rawId);
            const key = id[0];
            const value = allData[i].value;
            if (!data[key]) {
                data[key] = [value];    
            } else {
                data[key].push(value);
            }
        }
        let insert1 = [];
        insert1['code'] = [idToDelete];
        insert1['item_jig'] = [item[0]];
        insert1['qty_per_unit'] = [data['cur_qty_per_unit'][0]];
        insert1['unit'] = [data['unit'][0]];
        insert1['lokasi'] = [data['lokasi'][0]];
        insert1['trans_date'] = [currentDate()];
        insert1['remark'] = ['delete'];
        insert1['qty_change'] = [data['qty'][0]];

        const result = await jig_location_query.deleteData(pk,idToDelete);

        if (!result.includes('fail')) {
            const result1 = await log_location_query.insertData(insert1);
            if (!result1.includes('fail')) {
                alert('data successfully deleted');
                location.reload();
            }
        } else {
            alert('data is not deleted');
            location.reload();
        }
    } catch(error) {
        console.log(error);
    }
}



export const updateInsertJig = async() => {
    try {
        const arrInput = document.querySelectorAll('[data-updJig]');
        let data = [];
        data['key']=[];
        for (let i=0; i<arrInput.length; i++) {
            const rawId = arrInput[i].id;
            const id = splitCustomString("+", rawId);
            const key = id[0];
            const value = arrInput[i].value;
            if (!data['key'].includes(`${key}`)) {
                const codeLength = data['key'].length;
                data['key'][codeLength] = key;
            }
            if (!data[key]) {
                data[key] = [value];    
            } else {
                data[key].push(value);
            }
        }
        
        const itemJig = document.getElementById('searchJig').value;  
        let update1 = [];
        update1['desc_jig'] = data['desc_jig'];
        update1['status_jig'] = data['status_jig'];
        update1['material'] = data['material'];
        update1['type'] = data['type'];
        update1['drawing'] = data['drawing'];
        let filter1 = []
        filter1['item_jig'] = [itemJig];
        
        let insert1 = [];
        insert1['item_jig'] = [itemJig];
        insert1['desc_jig'] = data['desc_jig'];
        insert1['status_jig'] = data['status_jig'];
        insert1['material'] = data['material'];
        insert1['type'] = data['type'];
        insert1['drawing'] = data['drawing'];
        insert1['trans_date'] = [currentDate()];
        insert1['remark'] = data['remark'];
        console.log({update1, filter1, insert1});

        const result3 = await jig_master_query.updateData(update1, filter1);     
        const result1 = await log_master_query.insertData(insert1);
        if (!result3.includes('fail')) {
            alert('data successfully updated');
            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            alert('data is not updated');
        }
    } catch(error){
        console.log(error);
    }

}


export const updateInsertType = async() => {
    try {
        // ambil data dari input / form
        const arrInput = document.querySelectorAll('[data-updtype]');
        const arrNew = document.querySelectorAll('[data-addType]');
        const item = document.getElementById('searchType').value;
        let data = [];
        let newData = [];
        data['key']=[];
        newData['key']=[];
        data['id'] = [];
        for (let i=0; i<arrInput.length; i++) {
            const rawId = arrInput[i].id;
            const id = splitCustomString("+", rawId);
            if (!data['id'].includes(id[1])) {
                data['id'].push(id[1]);
            }
            const key = id[0];
            const value = arrInput[i].value;
            if (!data['key'].includes(`${key}`)) {
                const codeLength = data['key'].length;
                data['key'][codeLength] = key;
            }
            if (!data[key]) {
                data[key] = [value];    
            } else {
                data[key].push(value);
            }
        }

        for (let i=0; i<arrNew.length; i++) {
            const rawId = arrNew[i].id;
            const id = splitCustomString("+", rawId);
            const key = id[0];
            const value = arrNew[i].value;
            if (!newData['key'].includes(`${key}`)) {
                const codeLength = newData['key'].length;
                newData['key'][codeLength] = key;
            }
            if (!newData[key]) {
                newData[key] = [value];    
            } else {
                newData[key].push(value);
            }
        }
        
        let update1 = [];
        update1['item_jig'] = [];
        update1['opt_on'] = [];
        update1['opt_off'] = [];
        update1['status'] = [];
        update1['item_type'] = [];
        let filter1 = []
        filter1['id'] = [];
        let insert1 = [];
        insert1['item_jig'] = [];
        insert1['item_type'] = [];
        insert1['opt_on'] = [];
        insert1['opt_off'] = [];
        insert1['status'] = [];
        insert1['remark'] = [];
        insert1['trans_date'] = [];
        let insert2 = [];
        insert2['item_jig'] = [];
        insert2['item_type'] = [];
        insert2['opt_on'] = [];
        insert2['opt_off'] = [];
        insert2['status'] = [];
        let insert3 = [];
        insert3['item_jig'] = [];
        insert3['item_type'] = [];
        insert3['opt_on'] = [];
        insert3['opt_off'] = [];
        insert3['status'] = [];
        insert3['remark'] = [];
        insert3['trans_date'] = [];

        for (let i=0; i<data['mark'].length; i++) {
            // item_jig item_type opt on opt off status
            const cekChange = `${data['item_jig'][i]}+${item}+${data['opt_on'][i]}+${data['opt_off'][i]}+${data['status'][i]}`;
            if (cekChange !== data['mark'][i]) {
                update1['item_jig'].push(data['item_jig'][i]);
                update1['opt_on'].push(data['opt_on'][i]);
                update1['opt_off'].push(data['opt_off'][i]);
                update1['status'].push(data['status'][i]);
                update1['item_type'].push(item);
                filter1['id'].push(data['id'][i]);

                insert1['item_jig'].push(data['item_jig'][i]);
                insert1['item_type'].push(item);
                insert1['opt_on'].push(data['opt_on'][i]);
                insert1['opt_off'].push(data['opt_off'][i]);
                insert1['status'].push(data['status'][i]);
                insert1['remark'].push(data['remark'][i]);
                insert1['trans_date'].push(currentDate());
            }
        }

        for (let i=0; i<newData['item_jig'].length; i++) {
            insert2['item_jig'].push(newData['item_jig'][i]);
            insert2['item_type'].push(item);
            insert2['opt_on'].push(newData['opt_on'][i]);
            insert2['opt_off'].push(newData['opt_off'][i]);
            insert2['status'].push(newData['status'][i]);

            insert3['item_jig'].push(newData['item_jig'][i]);
            insert3['item_type'].push(item);
            insert3['opt_on'].push(newData['opt_on'][i]);
            insert3['opt_off'].push(newData['opt_off'][i]);
            insert3['status'].push(newData['status'][i]);
            insert3['remark'].push(newData['remark'][i]);
            insert3['trans_date'].push(currentDate());
        }

        console.log({update1, filter1, insert1, insert2, insert3});
        let result = true;
        if (update1['item_jig'].length > 0) {
            const result3 = await jig_function_query.updateData(update1, filter1);     
            const result1 = await log_function_query.insertData(insert1);
            if (result3.includes('fail')) {
                result = false;
            }
        }
        if (insert2['item_jig'].length > 0) {
            const result2 = await jig_function_query.insertData(insert2);   
            const result4 = await log_function_query.insertData(insert3);
            if (result2.includes('fail')) {
                result = false;
            }
        }

        if (result) {
                alert('data successfully updated');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } else {
                alert('data is not updated');
            }
    } catch(error){
        console.log(error);
    }

}



export const delDataType = async(id,pk) => {
    try {
        const code = splitCustomString("+", id);
        const idToDelete = code[1];
        const itemType = document.getElementById('searchType').value;
        const allData = document.querySelectorAll(`[id*="${idToDelete}"]`);
        let data = [];
        for (let i=0; i<allData.length; i++) {
            const rawId = allData[i].id;
            const id = splitCustomString("+", rawId);
            const key = id[0];
            const value = allData[i].value;
            if (!data[key]) {
                data[key] = [value];    
            } else {
                data[key].push(value);
            }
        }

        console.log(data);

        let insert1 = [];
        insert1['id'] = [idToDelete];
        insert1['item_jig'] = [data['item_jig'][0]];
        insert1['item_type'] = [itemType];
        insert1['opt_on'] = [data['opt_on'][0]];
        insert1['opt_off'] = [data['opt_off'][0]];
        insert1['status'] = 
        insert1['remark'] = ['delete'];
        insert1['trans_date'] = [currentDate()];
        
        console.log(insert1);

        const result = await jig_function_query.deleteData(pk,idToDelete);
        const result1 = await log_function_query.insertData(insert1);  

        if (!result.includes('fail')) {
            alert('data successfully deleted');
            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            alert('data is not deleted');
        }
    } catch(error) {
        console.log(error);
    }
}