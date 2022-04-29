<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BorrowController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


/**
 *  Student
 */
Route::get('/student', [StudentController::class, 'index']);
Route::get('/student/{student}', [StudentController::class, 'edit']);
Route::post('/student/add-student', [StudentController::class, 'store']);
Route::put('/student/{student}', [StudentController::class, 'update']);
Route::delete('/student/{student}/destroy', [StudentController::class, 'destroy']);

/**
 *  Category
 */
Route::get('/category', [CategoryController::class, 'index']);
Route::post('/category', [CategoryController::class, 'store']);
Route::get('/category/{id}', [CategoryController::class, 'edit']);
Route::post('/category/{id}', [CategoryController::class, 'update']);
Route::post('/category/{id}/object', [CategoryController::class, 'getObject']);

Route::post('/category/data/get', [CategoryController::class, 'get']);

Route::post('/category/{id}/status', [CategoryController::class, 'status']);
Route::post('/category/{id}/destroy', [CategoryController::class, 'destroy']);


/**
 * Genre
 */
Route::get('/genre', [GenreController::class, 'index']);
Route::get('/genre/{id}', [GenreController::class, 'edit']);
Route::get('/genre/{id}/get', [GenreController::class, 'get']);

Route::post('/genre/{id}/status', [GenreController::class, 'status']);
Route::post('/genre/{id}', [GenreController::class, 'update']);
Route::post('/genre', [GenreController::class, 'store']);
Route::post('/genre/{id}/destroy', [GenreController::class, 'destroy']);


/**
 * Product
 */
Route::get('/product', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'edit']);

Route::post('/product/data/get', [ProductController::class, 'get']);
Route::post('/product/{id}/status', [ProductController::class, 'status']);

Route::post('/product/{id}', [ProductController::class, 'update']);
Route::post('/product', [ProductController::class, 'store']);
Route::post('/product/{id}/destroy', [ProductController::class, 'destroy']);

/**
 * Borrow
 */
Route::get('/borrow', [BorrowController::class, 'index']);
Route::get('/borrow/{id}', [BorrowController::class, 'edit']);

Route::post('/borrow/{id}', [BorrowController::class, 'update']);
Route::post('/borrow', [BorrowController::class, 'store']);




Route::post('/user/register', [AuthController::class, 'registerStudent']);
Route::post('/user/login', [AuthController::class, 'login']);
Route::post('/user/logout', [AuthController::class, 'logout']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
