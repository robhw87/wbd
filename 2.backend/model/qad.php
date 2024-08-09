<?php
$model['qad_wo'] = new Model('dbqad_live.wo_mstr',
[
    'id::i',
    'log::s',
    'wo_nbr::s',
    'wo_lot::s',
    'wo_status::s',
    'wo_part::s',
    'wo_qty_ord::i',
    'wo__chr04::s',
    'wo_rel_date::s',
    'wo_due_date::s',
    'wo_so_job::s',
    'wo_rmks::s',
    'wo_stat_close_date::s',
    'wo_vend::s',
    'wo_qty_comp::i',
    'wo_close_date::s',
    'wo__chr02::s',
    'wo_acct_close::s',
    'wo_ord_date::s',
    'wo_rel_datex::s',
    'wo_due_datex::s',
    'wo_stat_close_datex::s',
    'wo_close_datex::s',
    'wo_ord_datex::s',
    'wo_routing::s',
],
'id::i');

$model['qad_item'] = new Model('dbqad_live.pt_mstr',
[
    'log::s',
    'pt_part::s',
    'pt_desc1::s',
    'pt_desc2::s',
    'pt_dsgn_grp::s',
    'pt_um::s',
    'pt_buyer::s',
    'pt_status::s',
    'pt_size::s',
    'pt_vend::s',
    'pt_pm_code::s',
    'pt_drwg_size::s',
    'pt__log02::s',
    'pt_sfty_stk::s',
    'pt_pur_lead::s',
    'pt_mfg_lead::s',
    'pt_insp_lead::s',
    'pt_prod_line::s',
    'pt_part_type::s',
    'pt_group::s',
    'pt_promo::s',
    'pt_cum_lead::s',
    'pt_draw::s',
    'pt_drwg_loc::s',
    'pt__log01::s',
    'pt__chr01::s',
    'pt__chr03::s',
    'pt_ord_min::s',
    'pt_iss_pol::s',
    'pt_loc::s',
    'pt_taxable::s',
    'pt_taxc::s',
    'pt_shelflife::s',
    'pt_yield_pct::s',
    'pt__chr05::s',
    'pt__chr06::s',
    'pt__chr07::s',
    'pt__chr08::s',
    'pt_added::s',
    'pt__chr09::s',
    'pt_rev::s',
    'pt_ms::s',
    'pt_abc::s',
    'pt_lot_ser::s',
    'pt_rctpo_status::s',
    'pt_rctpo_active::s',
    'pt_rctwo_status::s',
    'pt_rctwo_active::s',
    'pt_sfty_time::s',
],
'id::i');

$model['qad_rout'] = new Model('dbqad_live.ro_det',
[
    'log::s',
    'ro_routing::s',
    'ro_op::s',
    'ro_start::s',
    'ro_end::s',
    'ro_desc::s',
    'ro_wkctr::s',
    'ro_mch_op::s',
    'ro_wait::s',
    'ro_setup_men::s',
    'ro_men_mch::s',
    'ro_setup::s',
    'ro_vend::s',
    'ro__chr01::s',
    'ro_run::s',
],
'id::i');


