<?php

namespace App\Repositories\List;

interface ListRepositoryInterface
{
    public function getSettigs($userId);
    public function getTodolists($userId);
    public function getBusSchedules($userId);
    public function postSetting($data);
    public function postTodolist($userId, $data);
    public function postBusSchedule($data);
}
