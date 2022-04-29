<?php

namespace App\Http\Services\Genre;

use App\Models\Genre;
use PDO;

class GenreService
{

    public function get()
    {
        return Genre::all();
    }

    public function find($id)
    {
        return Genre::find($id);
    }


    public function insert($request)
    {

        $values = $request->post();
        Genre::create([
            'title' => $values['title'],
            'category_id' => $values['category_id'],
            'status' => $values['status'],
        ]);
        return true;
    }

    public function update($request, $id)
    {
        $values = $request->post();
        $genre = Genre::find($id);
        if ($genre) {
            $genre->update([
                'title' => $values['title'],
                'status' => $values['status'],
            ]);
            return true;
        }
        return false;
    }

    public function status($id)
    {
        $genre = Genre::find($id);
        if ($genre) {
            $genre->update([
                'status' => !$genre->status
            ]);
            return true;
        }
        return false;
    }
    public function destroy($id)
    {
        $genre = Genre::find($id);
        if ($genre) {
            $genre->delete();
            return true;
        }
        return false;
    }
}
