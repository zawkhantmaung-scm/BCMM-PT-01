<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\List\ListServiceInterface;

class ListController extends Controller
{
    protected $listService;

    public function __construct(ListServiceInterface $listService)
    {
        $this->listService = $listService;
    }

    public function list()
    {
        return $this->listService->list();
    }

    public function income(Request $request)
    {
        return $this->listService->income($request);
    }

    public function wish(Request $request)
    {
        return $this->listService->wish($request);
    }
}
