<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInfoBorrowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lib_info_borrows', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_code');
            $table->integer('quantity');
            $table->bigInteger('product_id');
            $table->bigInteger('staff_id');
            $table->enum('status', ['dang_muon', 'da_tra', 'huy_bo'])->default('dang_muon');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lib_info_borrows');
    }
}
