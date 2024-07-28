export class tableDOM {
    static async table_parse_data (key, data, page) {
        try {
            const table = document.querySelector(key);
            const tr = table.querySelectorAll('tr');
            let count = 0;
            if(page >1) {
                count = tr.length * (page-1);
            }
            tr.forEach(dt=>{
                if(dt.getAttribute('data-id') !== 'header' && !dt.classList.contains('hidden')) {
                    dt.classList.toggle('hidden');
                }
                if(dt.getAttribute('data-id') !== 'header' && data[count]) {
                    const fld = dt.querySelectorAll("[name]");
                    if(dt.classList.contains('hidden')) {
                        dt.classList.toggle('hidden');
                    }
                    dt.setAttribute('data-value', count);
                    fld.forEach(d2=>{
                        const key_fld = d2.getAttribute('name');
                        const currVal = data[count][`${key_fld}`] ? data[count][`${key_fld}`] : '';
                        if(d2.tagName === 'INPUT')
                            if(d2.getAttribute('type')==='text' || d2.getAttribute('type')==='date') {
                                d2.setAttribute('value', currVal);
                                const lbl = table.querySelector(`[for="${d2.id}"]`);
                                lbl.textContent= currVal;
                            }   
                            if(d2.getAttribute('type')==='hidden') {
                                d2.value = currVal;
                            }
                        if(d2.tagName === 'SELECT') {
                            const opt = d2.querySelectorAll('option');
                            opt.forEach(dt=>{
                                if(dt.value === currVal){
                                    dt.selected = true;
                                }
                            })
                        }
                        if(d2.tagName === 'TD') {
                            d2.textContent = currVal;
                        }
                    })
                    count++;
                }
            })
            return;
        } catch(error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    }

    static async table_clear(key) {
        try {
            const table = document.querySelector(key);
            const tr = table.querySelectorAll('tr');
            tr.forEach(dt=>{
                if(dt.getAttribute('data-id') !== 'header') {
                    const td = dt.querySelectorAll("[name]");
                    dt.removeAttribute('data-value');
                    if(!dt.classList.contains('hidden')) {
                        dt.classList.toggle('hidden');
                    }
                    td.forEach(d2=>{
                        if(d2.tagName === 'INPUT' && d2.getAttribute('type')==='text') {
                            d2.setAttribute('value', '');
                            const lbl = document.querySelector(`[for="${d2.id}"]`);
                            lbl.textContent = '';
                        }
                        if(d2.tagName === 'INPUT' && d2.getAttribute('type')==='hidden') {
                            d2.value = '';
                        }
                        if(d2.tagName === 'SELECT') {
                            const opt = d2.querySelectorAll('option');
                            opt.forEach(dt=>{
                                if(dt.hasAttribute('selected')){
                                    dt.removeAttribute('selected');
                                }
                            })
                        }
                        if(d2.tagName === 'TD') {
                            d2.textContent = '';
                        }
                    })
                }
            })
            return;
        } catch(error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    }

    static table_insert_row(template_tbl, tbl,counter) {
        const target = document.querySelector(tbl);
        const tbody = target.querySelector('tbody')
        const table = document.querySelector(template_tbl);
        const row_dt = table.querySelector('[data-id="0"]');
        const new_row = row_dt.cloneNode(true);
        new_row.setAttribute('data-id', `new__${counter}`);
        const td = new_row.querySelectorAll('td');
        td.forEach(dt=>{
            if(dt.hasAttribute('data-field')) {
                if(dt.querySelectorAll('INPUT').length>0) {
                    const input = dt.querySelectorAll("INPUT");
                    for(let i=0; i<input.length; i++) {
                        input[i].id = input[i].id+"__new";
                    }
                }
                if(dt.querySelectorAll('LABEL').length>0) {
                    const label = dt.querySelectorAll("LABEL");
                    for(let i=0; i<label.length; i++) {
                        let old = label[i].getAttribute('for');
                        label[i].setAttribute('for',old+"__new");
                    }
                }
                if(dt.querySelectorAll('BUTTON').length>0) {
                    const button = dt.querySelectorAll("BUTTON");
                    for(let i=0; i<button.length; i++) {
                        button[i].id = button[i].getAttribute('data-method')+"__"+counter+"__new";
                    }
                }
            }
        })
        tbody.insertBefore(new_row,tbody.rows[0]);
        return true;
    }

}