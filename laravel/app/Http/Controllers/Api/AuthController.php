<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Services\User\StudentService;
use App\Http\Services\User\UserService as UserUserService;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    protected $userService;
    protected $studentService;

    public function __construct(UserUserService $user, StudentService $student)
    {
        $this->userService = $user;
        $this->studentService = $student;
    }

    public function registerStudent(RegisterRequest $request)
    {
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $token = $user->createToken($user->email . '_Token')->plainTextToken;

        $student = $this->studentService->insert($user, $request);
        return response()->json([
            'status' => 200,
            'message' => 'Register Successfully',
            'token' => $token,
            'name' => $student->name
        ]);
    }

    public function login(LoginRequest $request)
    {
        $values = $request->post();

        if (Auth::attempt(['email' => $values['email'], 'password' => $values['password']])) {
            $user = Auth::user();
            $message = 'Login successfully';
            $status = 200;
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'message' => $message,
                'status' => $status,
                'token' => $token,
                'username' => $user->first_name . '' . $user->last_name,
            ]);
        } else {
            $message = 'Invalid Credentials';
            $status = 401;
        }
        return response()->json(['message' => $message, 'status' => $status]);
    }

    public function logout()
    {
        // $user = User::find(2);
        // $user->tokens()->delete();
        // auth()->user()->tokens()->delete();
        return response()->json([
            // 'data', $user,
            'status' => 200,
            'message' => 'Logout Successfully'
        ]);
    }
}
