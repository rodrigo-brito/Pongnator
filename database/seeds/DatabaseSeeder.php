<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        // $this->call(UsersTableSeeder::class);

        DB::table("partida")->delete();
        DB::table("jogador")->delete();

        Partida::create(["id" => 1]);
        Partida::create(["id" => 2]);
        Partida::create(["id" => 3]);
        Partida::create(["id" => 4]);
        Partida::create(["id" => 5]);
        Partida::create(["id" => 6]);
        Partida::create(["id" => 7]);
        Partida::create(["id" => 8]);
        Partida::create(["id" => 9]);
        Partida::create(["id" => 10]);
        Partida::create(["id" => 11]);
        Partida::create(["id" => 12]);
        Partida::create(["id" => 13]);
        Partida::create(["id" => 14]);
        Partida::create(["id" => 15]);
    }

}
