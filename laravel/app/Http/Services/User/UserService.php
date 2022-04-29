<?php

namespace App\Http\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function insert($request)
    {
        $values = $request->post();
        $user = User::create([
            'first_name' => $values['first_name'],
            'last_name' => $values['last_name'],
            'email' => $values['email'],
            'password' => Hash::make($values['password']),
        ]);
        $token = $user->createToken($user->email . '_Token')->plainTextToken;

        return $user;
    }
}
