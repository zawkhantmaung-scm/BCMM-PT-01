<?php

namespace App\Repositories\List;

use App\Models\Wish;
use App\Models\Income;
use App\Models\Setting;
use App\Models\Todolist;
use App\Models\BusSchedule;
use Illuminate\Support\Facades\Log;

class ListRepository implements ListRepositoryInterface
{
    public function getSettigs($userId)
    {
        return Setting::where('user_id', $userId)->get(); //TODO: Refactor
    }

    public function getTodolists($userId)
    {
        return Todolist::where('user_id', $userId)->get(); //TODO: Refactor
    }

    public function getBusSchedules($userId)
    {
        return BusSchedule::where('user_id', $userId)->get(); //TODO: Refactor
    }

    public function postSetting($data)
    {
        return Setting::create($data);
    }

    public function postTodolist($userId, $data)
    {
        return Todolist::updateOrCreate(
            ['user_id' => $userId],
            $data
        );
    }

    public function postBusSchedule($data)
    {
        return BusSchedule::create($data);
    }
}
