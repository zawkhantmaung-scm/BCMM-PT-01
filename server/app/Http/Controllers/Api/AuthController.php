<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Services\Auth\AuthServiceInterface;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthServiceInterface $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        $user = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];
        return $this->authService->login($user);
    }

    public function logout(Request $request)
    {
        return $this->authService->logout($request);
    }

    public function register(RegisterRequest $request)
    {
        $user = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];
        return $this->authService->register($user);
    }

    public function verification(Request $request)
    {
        $request->validate([
            'token' => ['required'],
        ]);
        return $this->authService->verification($request->token);
    }
}
