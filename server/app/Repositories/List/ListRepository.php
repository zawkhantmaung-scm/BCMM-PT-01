<?php

namespace App\Repositories\List;

use App\Models\Wish;
use App\Models\Income;

class ListRepository implements ListRepositoryInterface
{
    public function getIncome($userId)
    {
        return Income::where('user_id', $userId)->get(); //TODO: Refactor
    }

    public function getWish($userId)
    {
        return Wish::where('user_id', $userId)->get(); //TODO: Refactor
    }

    public function getTotalExtraMoney($userId)
    {
        $resp = Income::where('user_id', $userId)->latest('created_at')->first();
        return !is_null($resp) ? $resp->total_extra_money : 0; //TODO: Refactor
    }

    public function postIncome($data)
    {
        return Income::create($data);
    }

    public function postWish($data)
    {
        return Wish::create($data);
    }
}
