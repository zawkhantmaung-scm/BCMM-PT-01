<?php

namespace App\Services\Auth;

interface AuthServiceInterface
{
    public function login($user);
    public function register($user);
    public function logout($request);
    public function verification($token);
}
