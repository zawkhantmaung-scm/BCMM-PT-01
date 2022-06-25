<?php

namespace App\Repositories;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('App\Repositories\Auth\AuthRepositoryInterface', 'App\Repositories\Auth\AuthRepository');
        $this->app->bind('App\Repositories\List\ListRepositoryInterface', 'App\Repositories\List\ListRepository');
    }
}
