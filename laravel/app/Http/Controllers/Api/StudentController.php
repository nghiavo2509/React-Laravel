<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\Student\StudentCollection;
use App\Http\Resources\User\Student\StudentResource;
use App\Http\Services\User\StudentService;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{

    protected $studentService;
    public function __construct(StudentService $student)
    {
        $this->studentService = $student;
    }
    public function index()
    {
        $students = $this->studentService->getAll();
        $items = new StudentCollection(StudentResource::collection($students));
        return response()->json($items);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'phone' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ]);
            return redirect('post/create')
                ->withErrors($validator)
                ->withInput();
        }
        Student::create([
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
        ]);
        return response()->json([
            'status' => 200,
            'message' => 'Student Added Successfully'
        ]);
    }
    public function edit($id)
    {
        $student = Student::find($id);
        if (!$student) {
            $data = [
                'student' => 'No Student ID Found',
                'status' => 404,
            ];
        } else {
            $data = [
                'student' => $student,
                'status' => 200,
            ];
        }
        return response()->json($data);
    }

    public function update(Request $request, Student $student)
    {
        $values = $request->post();
        $valid = false;
        $message = '';
        if ($student) {
            $student->update([
                'name' => $values['name'],
                'phone' => $values['phone'],
            ]);
            $valid = true;
            $message = 'Cập nhật thành công';
        }
        return response()->json([
            'valid' => $valid,
            'message' => $message
        ]);
    }

    public function destroy(Student $student)
    {
        if ($student) {
            $student->delete();
        }
        return response()->json(['status' => 200, 'message' => 'Student Deleted Successfully    ']);
    }
}
