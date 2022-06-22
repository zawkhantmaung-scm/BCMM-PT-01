<?php

namespace App\Repositories\Auth;

interface AuthRepositoryInterface
{
    public function isVerified($user);
    public function getUser($user);
    public function register($user);
    public function emailVerification($data);
    public function verifyEmail($email);
}
