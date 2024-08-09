import {api_access, DOM, GeneralDOM, TableDOM, DtlistDOM, NavDOM, ButtonDOM, InputDOM, currentDate} from '../../3.utility/index.js';
import {auth2} from '../../3.utility/auth.js';

/* ====================================================================
  Initialize page
==================================================================== */
await auth2();
await GeneralDOM.init('');
GeneralDOM.td_input_default();
NavDOM.active_link('nav','');
let user_dtl = JSON.parse(sessionStorage.getItem('userData'));
let role = user_dtl.role;

// get data and parse option datalist
// -------------------------------------------------------
const ls_loc = await api_access('get','list_loc','');
DtlistDOM.parse_opt("#loc_list","-",ls_loc,"name");

// get data from DB
// -------------------------------------------------------
const loc = await api_access('get','jig_loc','');
const trans = await api_access('fetch','jig_trans',{status:'open'});
const master = await api_access('get','jig_mstr','');
let loc_sum = [];
let detail_show = [];

// calculation for getting total qty per item jig
// -------------------------------------------------------
loc.forEach(dt=>{
    const keys = Object.keys(dt)
    let filter = '';
    keys.forEach(d2=>{
        filter += dt[d2] + '____';
    })
    dt['filter'] = filter;
    let qty_per_role = 0;
    if(role === 'user') {
      qty_per_role = Math.ceil(parseInt(dt.qty_per_unit) * (1- parseInt(dt.toleransi) / 100));
    } else {
      qty_per_role = parseInt(dt.qty_per_unit);
    }
    if(loc_sum[`${dt.item_jig}`]) {
      loc_sum[`${dt.item_jig}`]['qty_total'] += qty_per_role;
    } else {
      let data = {
        ...dt,
        qty_total: qty_per_role
      };
      loc_sum[`${dt.item_jig}`] = data; 
    }
})
console.log({loc_sum});

// instance data for main table
// -------------------------------------------------------
let header_master = [];
master.forEach(dt=>{
    const bor = trans.filter(obj=>obj.item_jig === dt.item_jig);
    let qty_bor = 0;
    bor.forEach(d2=>{
      if(d2.item_jig === dt.item_jig) {
        qty_bor += parseInt(d2.qty);
      }
    })
    const data = {
      item_jig: dt.item_jig,
      filter: dt.item_jig,
      qty_oh: loc_sum[`${dt.item_jig}`] ? loc_sum[`${dt.item_jig}`].qty_total :0,
      qty_curr: loc_sum[`${dt.item_jig}`] ? loc_sum[`${dt.item_jig}`]['qty_total'] - qty_bor :0,
      qty_br: qty_bor,
    }
    dt['qty_oh'] = loc_sum[`${dt.item_jig}`] ? loc_sum[`${dt.item_jig}`]['qty_total'] :0,
    dt['qty_curr'] = loc_sum[`${dt.item_jig}`] ? loc_sum[`${dt.item_jig}`]['qty_total'] - qty_bor : 0,
    dt['qty_br'] = qty_bor,
    header_master.push(data);
})
let header_show = header_master;
console.log({loc, master, header_master});

// parsing data to table
// -------------------------------------------------------
TableDOM.parse_data('#trans_header_table', header_show, 1);
NavDOM.pgList_init('#trans_page', header_show, '#trans_header_table');
const user_detail = JSON.parse(sessionStorage.getItem('userData'));
const user = user_detail['name'] + "--" + user_detail['jabatan']+'--'+ user_detail['grade']; // user_input atau approval_by
DOM.add_class('#load',"hidden");


/* ====================================================================
  click event listener
==================================================================== */
document.addEventListener('click', async function(event) {
  // open detail div and parsing data
  // -------------------------------------------------------
  if(event.target.getAttribute('data-method') === 'detail') {
    DOM.rmv_class('#load',"hidden");
    const td = event.target.closest('td');
    const tr = td.closest('tr');
    const filter = tr.querySelector('[name="item_jig"]');
    const trgt = document.querySelector('[data-card="detail"]');
    DOM.rmv_class(trgt, 'hidden');
    detail_show = [];
    let filter_dt = loc.filter(obj=> obj.item_jig === filter.textContent);
    filter_dt.forEach(dt=>{
      let trans_dt = {};
      const cek = trans.find(obj=>obj.code === dt.code);
      trans_dt.code =  dt.code;
      trans_dt.item_jig =  dt.item_jig;
      trans_dt.lokasi = dt.lokasi;
      trans_dt.qty_per_unit =  dt.qty_per_unit;
      trans_dt.qty = dt.qty_per_unit;
      trans_dt.unit =  dt.unit;
      trans_dt.loc =  '';
      trans_dt.start_date =  currentDate('-');
      trans_dt.end_date =  '';
      trans_dt.status = 'open';
      if(cek !== undefined) {
        trans_dt.start_date =  cek.start_date;
        trans_dt.end_date =  currentDate("-");
        trans_dt.loc = cek.loc;
        trans_dt.id = cek.id;
        trans_dt.qty = cek.qty;
      }
      detail_show.push(trans_dt);
    })
    console.log(detail_show);
    TableDOM.parse_data('#trans_detail_table', detail_show, 1);
    NavDOM.pgList_init('#trans_detail_page', detail_show, '#trans_detail_table');
    const tbl = document.querySelector('#trans_detail_table');
    const tr_all = tbl.querySelectorAll('tr[data-value]');
    console.log(tr_all);
    tr_all.forEach(dt=>{
      if(dt.querySelector('[name="loc"]').value !== '' ){
        const inp = dt.querySelector('[name="loc"]');
        inp.disabled = true;
        const btn = dt.querySelector('[data-method="submit"]');
        btn.setAttribute('data-method', 'update');
        btn.classList.toggle('arrow_right');
        btn.classList.toggle('arrow_left');
      }
    })
    DOM.rmv_class('#load',"z-40");
    DOM.add_class('#loadscreen',"z-10");
    DOM.add_class('.loading2',"hidden");
    return;
  }

  // close detail div and clear table
  // -------------------------------------------------------
  if(event.target.id === 'close_detail') {
    DOM.add_class('#load',"z-40" , 'hidden');
    DOM.rmv_class('#loadscreen',"z-10");
    DOM.rmv_class('.loading2',"hidden");
    const trgt = document.querySelector('[data-card="detail"]');
    DOM.add_class(trgt, 'hidden');
    TableDOM.clear('#trans_detail_table');
    return;
  }

  // search and parsing pagination
  // -------------------------------------------------------
  if(event.target.id === 'search_jig') {
    header_show = GeneralDOM.filter_data_table(header_master, 'input__jig');
    TableDOM.parse_data('#trans_header_table', header_show, 1);
    NavDOM.pgList_init('#trans_page', header_show, '#trans_header_table');
    await TableDOM.parse_onclick('#trans_header_table', header_show, 'data-group', 'trans_page');
    return;
  }
})

NavDOM.pgList_active('trans_page');
ButtonDOM.enter_keydown('#search_jig', '#input__jig');


document.addEventListener('click', async function(event) {
  if(event.target.getAttribute('data-method') === 'submit') {
    event.target.disabled = true;
    console.log('submit');
    const td = event.target.closest('td');
    const tr = td.closest('tr');
    const check = tr.querySelector('[name="loc"]');
    if(check.value === '') {
      alert("Harap masukan peminjam");
      event.target.disabled = false;
      return;
    }
    const tr_field = tr.querySelectorAll('[name]');
    console.log(tr_field);
    let data = [];
    let dtl = {};
    tr_field.forEach(dt=>{
      const field = dt.getAttribute('name');
      if(dt.tagName === 'INPUT') {
        dtl[`${field}`] = dt.value;
      }
      if(dt.tagName === 'TD') {
        dtl[`${field}`] = dt.value;
      }
    })
    data.push(dtl);
    console.log(data);
    let msg ='';
    let result = await api_access('insert','jig_trans', data);
    if(result.includes('fail')) {
      msg += 'transaksi data gagal';
    } else {
      msg += 'transaksi berhasil';
    }
    alert (msg);
    console.log(result)
    event.target.disabled = false;
    return;
  }

  if(event.target.getAttribute('data-method') === 'update') {
    event.target.disabled = true;
    console.log('update');
    const td = event.target.closest('td');
    const tr = td.closest('tr');
    const tr_field = tr.querySelectorAll('[name]');
    console.log(tr_field);
    let data = [];
    let dtl = {};
    tr_field.forEach(dt=>{
      const field = dt.getAttribute('name');
      if(dt.tagName === 'INPUT') {
        dtl[`${field}`] = dt.value;
      }
      if(dt.tagName === 'TD') {
        dtl[`${field}`] = dt.value;
      }
    })
    data.push(dtl);
    console.log(data);
    let msg ='';
    let result = await api_access('update','jig_trans', data);
    if(result.includes('fail')) {
      msg += 'transaksi data gagal';
    } else {
      msg += 'transaksi berhasil';
    }
    alert (msg);
    console.log(result)
    event.target.disabled = false;
    return;
  }
})