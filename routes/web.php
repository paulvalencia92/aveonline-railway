<?php

use App\Models\Pet;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;

Route::get('/tests', function (){
    $pizza  = "1,2";
    $porciones = explode(",", $pizza);
    return $porciones;

});


Route::get('/{any}', function () {
    return view('layouts.app');
})->where('any', '.*');
