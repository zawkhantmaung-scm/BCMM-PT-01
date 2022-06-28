<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\List\SettingRequest;
use App\Http\Requests\List\TodolistRequest;
use App\Services\List\ListServiceInterface;
use App\Http\Requests\List\BusScheduleRequest;

class ListController extends Controller
{
    protected $listService;

    public function __construct(ListServiceInterface $listService)
    {
        $this->listService = $listService;
    }

    public function getSettigs()
    {
        return $this->listService->getSettigs();
    }

    public function getTodolists()
    {
        return $this->listService->getTodolists();
    }

    public function getBusSchedules()
    {
        return $this->listService->getBusSchedules();
    }

    public function getMovieTimeDatas()
    {
        return $this->listService->getMovieTimeDatas();
    }

    public function postSetting(SettingRequest $request)
    {
        return $this->listService->postSetting($request);
    }

    public function postTodolist(TodolistRequest $request)
    {
        return $this->listService->postTodolist($request);
    }

    public function postBusSchedule(BusScheduleRequest $request)
    {
        return $this->listService->postBusSchedule($request);
    }
}
