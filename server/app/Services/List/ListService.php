<?php

namespace App\Services\List;

use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Repositories\List\ListRepositoryInterface;

class ListService implements ListServiceInterface
{
    public $successStatus = 200;

    protected $listRepo;

    public function __construct(ListRepositoryInterface $listRepo)
    {
        $this->listRepo = $listRepo;
    }
    public function getSettigs()
    {
        $userId = Auth::user()->id;
        $settings = $this->listRepo->getSettigs($userId);
        return response()->json([
            'message' => 'Successfully fetched datas!',
            'settings' => $settings,
        ], 200);
    }

    public function getTodolists()
    {
        $userId = Auth::user()->id;
        $todolists = $this->listRepo->getTodolists($userId);
        return response()->json([
            'message' => 'Successfully fetched datas!',
            'todolists' => $todolists,
        ], 200);
    }

    public function getBusSchedules()
    {
        $userId = Auth::user()->id;
        $bus_schedules = $this->listRepo->getBusSchedules($userId);
        return response()->json([
            'message' => 'Successfully fetched datas!',
            'bus_schedules' => $bus_schedules,
        ], 200);
    }

    public function postSetting($request)
    {
        $data = [
            'user_id' => Auth::user()->id,
            'walking_time' => $request->walking_time,
            'time_taken_to_cinema' => $request->time_taken_to_cinema,
            'movie_time' => $request->movie_time,
        ];

        $resp = $this->listRepo->postSetting($data);

        if(!$resp) {
            return response()->json([
                'errors' => 'Something went wrong! Please try again.',
            ], 400);
        }

        return response()->json([
            'message' => 'Successfully inserted!',
        ], 200);
    }

    public function postTodolist($request)
    {
        $userId = Auth::user()->id;
        $data = [
            'alarm' => $request->alarm,
            'time_to_teeth' => $request->time_to_teeth,
            'breakfast_time' => $request->breakfast_time,
        ];
        $resp = $this->listRepo->postTodolist($userId, $data);

        if(!$resp) {
            return response()->json([
                'errors' => 'Something went wrong! Please try again.',
            ], 400);
        }

        return response()->json([
            'message' => 'Successfully inserted or updated!',
        ], 200);
    }

    public function postBusSchedule($request)
    {
        $data = [
            'user_id' => Auth::user()->id,
            'bus_time' => $request->bus_time,
        ];

        $resp = $this->listRepo->postBusSchedule($data);

        if(!$resp) {
            return response()->json([
                'errors' => 'Something went wrong! Please try again.',
            ], 400);
        }

        return response()->json([
            'message' => 'Successfully inserted!',
        ], 200);
    }

    public function getMovieTimeDatas()
    {
        $userId = Auth::user()->id;
        $settings = $this->listRepo->getSettigs($userId);
        $todolists = $this->listRepo->getTodolists($userId);
        $bus_schedules = $this->listRepo->getBusSchedules($userId);
        if (count($todolists) > 0 && count($bus_schedules) > 0 && count($settings) > 0) {
            return response()->json([
                'message' => 'Successfully fetched datas!',
                'settings' => $settings,
                'todolists' => $todolists,
                'bus_schedules' => $bus_schedules,
                'disabled' => false,
            ], 200);
        }
        return response()->json([
            'message' => 'There\'s no datas!',
            'settings' => $settings,
            'todolists' => $todolists,
            'bus_schedules' => $bus_schedules,
            'disabled' => true,
        ], 200);
    }

}
