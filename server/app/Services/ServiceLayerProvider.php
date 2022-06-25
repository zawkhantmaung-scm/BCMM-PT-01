<?php

namespace App\Services;

use Illuminate\Support\ServiceProvider;

class ServiceLayerProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('App\Services\Auth\AuthServiceInterface', 'App\Services\Auth\AuthService');
        $this->app->bind('App\Services\List\ListServiceInterface', 'App\Services\List\ListService');
    }
}
