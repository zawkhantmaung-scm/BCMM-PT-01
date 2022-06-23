<?php

namespace App\Repositories\List;

interface ListRepositoryInterface
{
    public function getIncome($userId);
    public function getWish($userId);
    public function getTotalExtraMoney($userId);
    public function postIncome($data);
    public function postWish($data);
}
