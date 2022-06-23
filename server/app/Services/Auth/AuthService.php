<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use App\Repositories\Auth\AuthRepositoryInterface;

class AuthService implements AuthServiceInterface
{
    public $successStatus = 200;

    protected $authRepo;

    public function __construct(AuthRepositoryInterface $authRepo)
    {
        $this->authRepo = $authRepo;
    }

    public function login($user)
    {
        $isVerified = $this->authRepo->isVerified($user);

        if ($isVerified) {
            return response()->json([
                'errors' => 'You must be verify your email.',
                'is_verified' => false,
            ], 400);
        }
    
        $response = $this->authRepo->getUser($user);
    
        if (!$response || !Hash::check($user['password'], $response->password)) {
            return response()->json([
                'errors' => 'Email and password are incorrect.'
            ], 400);
        }
    
        $token = $response->createToken($response->email)->plainTextToken;
    
        return [
            'token' => $token,
            'user' => $response->only('id', 'name', 'email'),
        ];
    }

    public function logout($request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out.']);
    }

    public function register($user)
    {
        $user['password'] = Hash::make($user['password']);
        $this->authRepo->register($user);

        $email = $user['email'];
        $token = hash("sha256", rand());
        $data = [
            'email' => $email,
            'token' => $token,
            'created_at' => now(),
        ];
        $this->authRepo->emailVerification($data);

        $this->sendMailing($email, $token);

        return response()->json(['message' => 'We have sent verification code to your email.'], 200);
    }

    public function sendMailing($email, $token)
    {
        $data = array(
            'email' => 'admin@bcmm.com',
            'name' => 'BCMM Admin',
            'subject' => 'Sending Verification Mail',
            'domain' => getenv('DOMAIN'),
            'recipientEmail' => $email,
            'signature' => 'BCMM',
            'token' => $token,
        );

        \Mail::send('email.send-verification-token', $data, function ($message) use ($data) {
            $message->to($data['recipientEmail'])->subject($data['subject']); //Auth::user()->email
            $message->from($data['email'], $data['name']);
        });
    }

    public function verification($token)
    {
        $isExist = $this->authRepo->verification($token);
        if (!!$isExist && $isExist->email) {
            $this->authRepo->verifyEmail($isExist->email);
            return response()->json([
                'message' => 'Email verification success.',
                'email' => $isExist->email,
            ]);
        }

        return response()->json(['errors' => 'Invalid code. Please Try again.'], 404);
    }
}
