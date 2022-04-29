<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Genre\StoreRequest;
use App\Http\Requests\Genre\UpdateRequest;
use App\Http\Resources\Genre\GenreCollection;
use App\Http\Resources\Genre\GenreResource;
use App\Http\Services\Genre\GenreService;
use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    protected $genreService;
    public function __construct(GenreService $genre)
    {
        $this->genreService = $genre;
    }

    public function index()
    {
        // $genres = $this->genreService->get();
        return response()->json(new GenreCollection(GenreResource::collection(Genre::all())));
    }
    public function get($categoryId)
    {
        $genres = Genre::where('category_id', $categoryId)->get();
        return response()->json(new GenreCollection(GenreResource::collection($genres)));
    }

    public function store(StoreRequest $request)
    {
        $valid = false;
        $message = '';
        $genre = $this->genreService->insert($request);
        if ($genre) {
            $valid = true;
            $message = 'Thêm thể loại thành công';
        }
        return response()->json([
            'VALID' => $valid,
            'TN' => $message
        ]);
    }

    public function edit($id)
    {
        $genre = $this->genreService->find($id);

        if ($genre) {
            return response()->json([
                'genre' => new GenreResource($genre),
                'status' => 200
            ]);
        }
        return response()->json([
            'status' => 404
        ]);
    }

    public function update(UpdateRequest $request, $id)
    {
        $message = 'Đã có lỗi xảy ra!';
        $validGenre = $this->genreService->update($request, $id);
        if ($validGenre) {
            $message = 'Update thành công!';
        }
        return response()->json([
            'VALID' => $validGenre,
            $message => $message,
        ]);
    }

    public function status($id)
    {
        $validStatus = $this->genreService->status($id);
        return response()->json([
            'VALID' => $validStatus
        ]);
    }

    public function destroy($id)
    {
        $validDestroy = $this->genreService->destroy($id);
        return response()->json([
            'VALID' => $validDestroy
        ]);
    }
}
