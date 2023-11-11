import { tableHeader, tblUpdLoc, tblHistLoc } from './table.js';
import { btnUpdLoc, addNewStock } from './button.js';
import { jig_location_query, log_location_query } from '../../class.js';
import { loading } from './load.js';
import {updateInsertData} from './data.js';


document.addEventListener('click', async function(event) {
    if (event.target.getAttribute('id') === 'btnStock'){
        try {
            const filterId = document.getElementById('searchStock');
            const filter = filterId.value;
            if (filter === "") {
                filterId.placeholder = 'please choose item';
                return;                
            }
            const main = document.getElementById('main');
            const newContain = document.createElement('div');
            newContain.id= 'newContain';
            main.appendChild(newContain);
            newContain.appendChild(loading('loading1', 'loading'));

            const dataLoc = await jig_location_query.fetchDataFilter({item_jig: filter});

            // form utk input data dan show data saat ini
            const input = document.createElement('input');
            input.textContent = 'Tolerance';
            input.id ='tol';
            input.setAttribute('autocomplete', 'off');
            input.setAttribute('type', 'text');

            const arrayHeader = ['Location', 'Qty per unit', 'add/substract', 'Qty', 'Unit', 'Remark']
            await tableHeader('newContain', 'tableStock', arrayHeader);
            newContain.appendChild(await tblUpdLoc('tableStock',dataLoc));
            const table = document.getElementById('tableStock');

            const historyTitle = document.createElement('div');
            historyTitle.classList.add('fs-l', 'fc-w', 'cap', 'mt4', 'pl4', 'pv2','sl3');
            historyTitle.textContent = 'History Log';
            const dataHist = await log_location_query.fetchDataFilter({item_jig: filter});

            newContain.removeChild(document.getElementById('loading1'));
            newContain.appendChild(table);
            newContain.appendChild(await btnUpdLoc());
            const btnAddLoc = document.getElementById('addLoc');
            let counter = 0;
            btnAddLoc.addEventListener('click', async function() {
                table.appendChild(await addNewStock(counter));
                counter++;
            })
            const btnData = document.getElementById('updLoc');
            btnData.addEventListener('click', async function() {
                try {
                    await updateInsertData();
                }catch(error){
                    console.log(error);
                }
            })
            newContain.appendChild(historyTitle);
            newContain.appendChild(await tblHistLoc(dataHist));
        } catch (error) {
            console.log(error);
        }
    }
})


