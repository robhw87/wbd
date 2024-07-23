export const inputEmptyRow = async(target, counter, data_array) =>{
    const data_tr = document.createElement('tr');
    data_tr.classList.add('w-full');
    for (let i=0; i<data_array.length; i++) {
        const td = document.createElement('td');
        if (data_array[i].pk !== undefined) {
            data_tr.setAttribute('data-tr', `new__${counter}`);
        }
        if(data_array[i].pk === undefined || data_array[i].pk === 'show') {
            if(i === 0) {
                td.setAttribute('class','bg-slate-400 border-2 text-center text-sm font-semibold border-black p-2 sticky left-0 z-10')
            } else {
                td.setAttribute('class','bg-slate-300 border-2 text-sm border-black p-2')
            }
            if(data_array[i].type === 'text') {
                td.setAttribute('name', data_array[i].field);
                td.textContent = data_array[i].def_value;
            }
            if(data_array[i].type === 'input') {
                td.appendChild(await td_input(data_array[i]));
            }
            if(data_array[i].type === 'date') {
                td.appendChild(await td_date(data_array[i]));
            }
            if(data_array[i].type === 'btnSet') {
                td.classList.add('flex');
                td.classList.add('flex-row');
                const sets =  data_array[i].set.split(" ");
                sets.forEach(dt=>{
                    td.appendChild(td_button(dt, data_array[i]));
                })
            }
        data_tr.appendChild(td);
        } 
    }
    data_tr.setAttribute(`data-id`, `new__${counter}`);
    if(target !== '') {
        const trgt = document.querySelector(target);
        trgt.appendChild(data_tr);
        return;
    }
    return data_tr;
}



const td_input = async(data_array) =>{
    /* data_array setup : 
        {
            target: '',
            field: '',
            dtlist:'',
            text: '',
            disable:'',
            style: ''
        },
    */
    const td_input = document.createElement('input');
    td_input.type = 'text';
    td_input.autocomplete = 'off';
    td_input.placeholder = data_array.placeholder ? data_array.placeholder : 'input text here';
    td_input.value = data_array.def_value ? data_array.def_value : '';
    td_input.setAttribute('name', data_array.field);
    if(data_array.dtlist !== undefined && data_array.dtlist !=='') {td_input.setAttribute('list', data_array.dtlist)}
    if(data_array.disable !==undefined) {td_input.disabled = true}
    if(data_array.style !== undefined && data_array.style !=='') {
        td_input.setAttribute('class', data_array.style);
    } else {
        td_input.setAttribute('class', 'w-full h-full focus:ring focus:ring-blue-600 focus:ring-width-1 focus:outline focus:bg-slate-200 focus:outline-blue-600 bg-transparent');
    }
    return td_input;
}

const td_date = async(data_array) =>{
    /* data_array setup : 
        {
            target: '',
            field: '',
            dtlist:'',
            text: '',
            disable:'',
            style: ''
        },
    */
    const td_date = document.createElement('input');
    td_date.type = 'date';
    td_date.setAttribute('name', data_array.field);
    if(data_array.disable !==undefined) {td_date.disabled = true}
    let style = 'w-full rounded flex justify-center items-center h-full focus:ring focus:ring-blue-600 focus:ring-width-1 focus:outline focus:bg-slate-200 focus:outline-blue-600 bg-transparent';
    if(data_array.style !== undefined && data_array.style !=='') {
        style = data_array.style;
    }
    td_date.setAttribute('class', style);
    return td_date;
}

const td_button = (dt, data_array) =>{
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.name = data_array.field;
    const ls = dt.split(':');
    btn.setAttribute('class', data_array.btn_style+" "+ls[1]);
    if(ls.length>2 && ls[2]=== 'disable') {
        btn.disabled= true;
        btn.classList.add('opacity-25');
    }
    btn.setAttribute('data-method', ls[0]);
    btn.setAttribute('data-button', data_array.def_value);

    return btn;
}


export class tableDOM {
    constructor(key) {
        this.id = key;
    }

    async table_parse_data (data, page) {
        try {
            const table = document.querySelector(this.id);
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
                        if(d2.tagName === 'INPUT' && d2.getAttribute('type')==='text') {
                            d2.setAttribute('value', currVal);
                            const lbl = document.querySelector(`[for="${d2.id}"]`);
                            lbl.textContent= currVal;
                        }
                        if(d2.tagName === 'INPUT' && d2.getAttribute('type')==='hidden') {
                            d2.value = currVal;
                        }
                        if(d2.tagName === 'SELECT') {
                            d2.value = currVal;
                        }
                        if(d2.tagName === 'TD') {
                            d2.textContent = currVal;
                        }
                    })
                    count++;
                }
            })
        } catch(error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    }

    async table_clear() {
        try {
            const table = document.querySelector(this.id);
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
                            d2.value = '';
                        }
                        if(d2.tagName === 'TD') {
                            d2.textContent = '';
                        }
                    })
                }
            })
        } catch(error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    }

}