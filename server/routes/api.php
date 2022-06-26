<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ListController;
use Illuminate\Validation\ValidationException;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('v1/friday', function () {
    return response()->json([
        'name' => 'APITELSA',
        'modal' => '2050',
        'price' => '$105000',
    ]);
})->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('register', [AuthController::class, 'register']);
Route::post('verification', [AuthController::class, 'verification']);

Route::get('settings', [ListController::class, 'getSettigs'])->middleware('auth:sanctum');
Route::get('todolists', [ListController::class, 'getTodolists'])->middleware('auth:sanctum');
Route::get('bus-schedules', [ListController::class, 'getBusSchedules'])->middleware('auth:sanctum');
Route::get('movie-time', [ListController::class, 'getMovieTimeDatas'])->middleware('auth:sanctum');
Route::post('setting', [ListController::class, 'postSetting'])->middleware('auth:sanctum');
Route::post('todolist', [ListController::class, 'postTodolist'])->middleware('auth:sanctum');
Route::post('bus-schedule', [ListController::class, 'postBusSchedule'])->middleware('auth:sanctum');