<?php

namespace App\Repositories\Auth;

use App\Models\User;
use App\Models\EmailVerification;
use Illuminate\Support\Facades\Auth;

class AuthRepository implements AuthRepositoryInterface
{
    public function isVerified($user)
    {
        return User::where(['email' => $user['email']])->whereNull('email_verified_at')->exists();
    }

    public function getUser($user)
    {
        return User::where(['email' => $user['email']])->whereNotNull('email_verified_at')->first();
    }

    public function register($user)
    {
        
        return User::create($user);
    }

    public function emailVerification($data)
    {
        return EmailVerification::create($data);
    }

    public function verification($token)
    {
        return EmailVerification::where('token', $token)->first();
    }

    public function verifyEmail($email)
    {
        EmailVerification::where('email', $email)->delete();
        return User::where('email', $email)->update(['email_verified_at' => now()]);
    }
}
