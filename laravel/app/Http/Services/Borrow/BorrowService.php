<?php

namespace App\Http\Services\Borrow;

use App\Models\Borrow;

class BorrowService
{

    public function getAll()
    {
        return Borrow::all();
    }

    public function find($id)
    {
        return Borrow::find($id);
    }
    public function insert($request)
    {

        Borrow::create([
            'user_code' => $request->user_code,
            'quantity' => $request->quantity,
            'product_id' => $request->product_id,
            // 'staff_id' => auth()->user()->id,
            'staff_id' => 1,

            'status' => 'dang_muon',
        ]);
        return true;
    }

    public function update($request, $id)
    {
        $values = $request->all();
        $borrow = Borrow::find($id);
        if ($borrow) {
            $borrow->update([
                'user_code' => $values['user_code'],
                'quantity' => $values['quantity'],
                'product_id' => $values['product_id'],
                'status' => $values['status'],
                'staff_id' => 1,
            ]);
            return true;
        }
        return false;
    }
}
