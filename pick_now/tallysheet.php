<?php
require_once "D:/xampp/htdocs/CONNECTION/config.php";
session_start();
if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
  $currentURL = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
  $url = explode("/",$currentURL);
  header(`location: http://$url[2]/sbe/index.php?cek=no`);
  exit(0);
}

/*
$user_log = strtoupper($_SESSION["username"]);
$prog = 'pick_now';
$role = cekUser('dbvjs',$user_log, $prog);
*/
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css_fix/animation.css">
    <link rel="stylesheet" href="../assets/css_fix/color.css">
    <link rel="stylesheet" href="../assets/css_fix/custom.css">
    <link rel="stylesheet" href="../assets/css_fix/font.css">
    <link rel="stylesheet" href="../assets/css_fix/layout.css">
    <link rel="stylesheet" href="../assets/css_fix/symbol.css">
    <title>parent code</title>
</head>
<body>
<div id='root' class='container'>
    <div class='loading'></div>
</div>
<script type='module'>
    const initPage = performance.now();
    import {
        loading, 
        create,
        mainNav,
        sideNav, 
        tablePickNow
    } from './component/index.js';
    import {
        jsonToCsv, currentDate, numberToStr, activeLink,// proses
        pickNow// class
    } from './utility/index.js';
    
    await mainNav();
    activeLink('navID', ['f-or7']);

    defShow.classList.add('sl8', 'fw-blk');
    const root = document.getElementById('root');
    const start = performance.now();
    root.removeChild(document.querySelector('.loading'));
    const end = performance.now();
    const total = (end - start) / 1000;
    console.log(total);




</script>
</body>
</html>