<?php 
require_once '../../index.php';
require_once 'utils/nav.php';
require_once 'utils/form.php';
require_once 'utils/table.php';

/* ===============================================================================
tool HTML
=============================================================================== */
$nav_array['title'] = 'Detail Tool';
$tool = Comp::dtlist(['id'=>'reff_list'])
    .Comp::dtlist(['id'=>'loc_list'])
    .$load2."
    ".Comp::nav([
        'class'=>'fixed flex flex-row top-0 bg-slate-950 w-screen h-[5vh]',
        'body'=>nav($nav_array)
    ])."
    ".Comp::header([
        'class'=>'fixed px-2 top-[5vh] bg-slate-700 w-screen h-[5vh] flex flex-row',
        'body'=>[
            Comp::input([
                'id'=>'input__tool_search',
                'placeholder'=>'input alat disini',
                'class'=>'rounded px-2 text-sm h-[1.6rem] focus:ring focus:ring-blue-400 focus:ring-width-4 focus:outline focus:outline-blue-400 z-30 shadow-md w-[40vw] my-3'
            ]),
            Comp::button([
                'id'=>'search_btn',
                'body'=>'search',
                'class'=>'rounded bg-gray-300 text-sm my-3 mx-2 px-4 border-2 border-slate-400 shadow-md hover:font-semibold duration-300'
            ]),
            Comp::button([
                'id'=>'submit_form_btn',
                'disable'=>'',
                'data_attr'=>['role::admin'],
                'body'=>'submit',
                'class'=>'rounded bg-gray-300 text-sm my-3 mx-2 px-4 border-2 border-slate-400 shadow-md text-slate-200 hover:font-semibold  duration-300'
            ]),
            Comp::button([
                'id'=>'new__data',
                'data_attr'=>['role::admin'],
                'body'=>'add new',
                'class'=>'rounded bg-gray-300 text-sm my-3 mx-2 px-4 border-2 border-slate-400 shadow-md hover:font-semibold duration-300'
            ]),
            Comp::button([
                'id'=>'del_data',
                'data_attr'=>['role::admin'],
                'body'=>'delete',
                'class'=>'rounded bg-gray-300 text-sm my-3 mx-2 px-4 border-2 border-slate-400 shadow-md hover:font-semibold duration-300'
            ])
        ]
    ])."
    ".Comp::main([
        'class'=>'fixed flex flex-col top-[10vh] bg-slate-300 w-screen h-[85vh] scrollable-y',
        'body'=>[
            table_create($tool_table),
            table_create($tool_new)
        ]
    ])."
    ".Comp::footer([
        'class'=>'fixed flex flex-row bottom-0 bg-slate-700 w-screen h-[5vh]',
        'body'=>pagination_create('tool_page', '')
    ])."
    <script type='module' src='./client_process/tool.js';></script>
    ";

createHTML([
    'body'=>$tool, 
    'name'=>'tool', 
    'title'=>"Detail Tool List",
    'path'=>'vjs_alat_ukur'
]);