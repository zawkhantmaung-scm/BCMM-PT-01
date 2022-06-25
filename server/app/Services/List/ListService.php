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


    public function list()
    {
        $userId = Auth::user()->id;
        $income = $this->listRepo->getIncome($userId);
        $wish = $this->listRepo->getWish($userId);
        if (count($income) > 0 && count($wish) > 0) {
            return response()->json([
                'message' => 'Successfully fetched datas!',
                'income' => $income,
                'wish' => $wish,
                'disabled' => false,
            ], 200);
        }
        return response()->json([
            'message' => 'There\'s no datas!',
            'income' => $income,
            'wish' => $wish,
            'disabled' => true,
        ], 200);
    }
    
    public function income($request)
    {
        $income = $request->income;
        $userId = Auth::user()->id;
        $total = $this->listRepo->getTotalExtraMoney($userId);
        $date = Carbon::now();
        $monthName = $date->format('F');
        $data = [
            'user_id' => Auth::user()->id,
            'income' => $income,
            'total_extra_money' => $total + ($income * 0.2),
            'month' => $monthName,
        ];

        $resp = $this->listRepo->postIncome($data);

        if(!$resp) {
            return response()->json([
                'errors' => 'Something went wrong! Please try again.',
            ], 400);
        }

        return response()->json([
            'message' => 'Successfully inserted!',
        ], 200);
    }

    public function wish($request)
    {
        $data = [
            'user_id' => Auth::user()->id,
            'item' => $request->item,
            'price' => $request->price,
        ];

        $resp = $this->listRepo->postWish($data);

        if(!$resp) {
            return response()->json([
                'errors' => 'Something went wrong! Please try again.',
            ], 400);
        }

        return response()->json([
            'message' => 'Successfully inserted!',
        ], 200);
    }
}
