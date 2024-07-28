export class InputDOM {
    static form_parse_data(key, data) {
        const target = document.querySelector(key);
        const inp_name = target.querySelectorAll('[name]');
        inp_name.forEach(dt=>{
            const field = dt.getAttribute('name');
            dt.value = data[`${field}`] ? data[`${field}`] :'';
        })
        return;
    }

    static label_parse_value(key, value) {
        const target = document.querySelector(key);
        target.textContent = value;
        return;
    }

    static select_first_opt(value_search, dtlist, trgt) {
        const target = document.querySelector(trgt);
        const datalist = document.querySelector(dtlist);
        const option = datalist.querySelectorAll('option');
        for (let i=0; i<option.length; i++) {
            if(option[i].value.toLowerCase().includes(value_search.toLowerCase())) {
              target.value = option[i].value;
              break;
            }
        }
        return;
    }

    static input_valid (key, value, input) {
        const dtlist = document.querySelector(key);
        const inpt = document.querySelector(input);
        const opt = dtlist.querySelectorAll('option');
        let valid = false;
        for( let i=0; i<opt.length; i++) {
            if(opt[i].value.includes(value)) {
                valid = true;
                return;
            }
        }
        if(!valid) {
            inpt.setCustomValidity("Data tidak termasuk dalam list");
            inpt.reportValidity();
        }
        return;
    }

    static default_event(key) {
        const inp = document.quer
    }
}