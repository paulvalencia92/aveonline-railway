<?php

use App\Http\Controllers\{ProductController};
use Illuminate\Support\Facades\Route;


Route::post('/products', [ProductController::class, 'store']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/findByStatus', [ProductController::class, 'findByStatus']);
Route::put('/products/{product}', [ProductController::class, 'update']);
Route::delete('/products/{product}', [ProductController::class, 'destroy']);


