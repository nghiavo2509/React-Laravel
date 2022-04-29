<?php

namespace App\Http\Services\User;

use App\Models\Student;

class StudentService
{
    public function getAll()
    {
        return Student::all();
    }

    public function insert($user, $request = null)
    {
        return Student::create([
            'student_code' => $this->generateCode(),
            'user_id' => $user->id,
            'user_id' => $request->phone,
            'name' => $this->mergeName($user->first_name, $user->last_name),
        ]);
    }

    public function mergeName($firstName, $lastName)
    {
        return $firstName . $lastName;
    }
    public function generateCode()
    {
        $generateCode = rand(0000000000, 9999999999);

        $student = Student::where('student_code', $generateCode)->first();
        if ($student) {
            $generateCode = $this->generateCode();
        }
        return $generateCode;
    }
}
