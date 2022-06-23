<?php

namespace App\Services\List;

interface ListServiceInterface
{
    public function list();
    public function income($request);
    public function wish($request);
}
