<?php

namespace App\Services\List;

interface ListServiceInterface
{
    public function getSettigs();
    public function getTodolists();
    public function getBusSchedules();
    public function postSetting($request);
    public function postTodolist($request);
    public function postBusSchedule($request);
    public function getMovieTimeDatas();
}
