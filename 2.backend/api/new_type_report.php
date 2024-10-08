<?php
function new_type_handle($db_conn, $data, $action, $model, $table) {
    $mdl = $model[$table]->table;
    switch($action) {
        case "fetch_join_data":
            $query = 'SELECT * FROM '.$mdl.' mt JOIN db_wbd.ntr_hd hd on mt.item_number = hd.item_number';
            $types = '';
            $response  = $db_conn->customQuery('', $query, $types, $data);
            break;
        case "fetch_cek_ntr_mstr":
            $query = 'SELECT * FROM '.$mdl.' mt JOIN db_wbd.ntr_hd hd on mt.item_number = hd.item_number';
            $types = '';
            $response  = $db_conn->customQuery('', $query, $types, $data);
            break;
        case "fetch_to_del_data_hd_code":
            $query = 'DELETE FROM '.$mdl.' WHERE hd_code=?';
            $types = 's';
            $response  = $db_conn->customQuery('', $query, $types, $data);
            break;
        default:
            $response = "action not available";
    }
    return $response;
}

