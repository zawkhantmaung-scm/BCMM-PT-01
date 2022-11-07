# BCMM-PT-01

## Manage Income Project

- To view manage income project, please checkout `manage-income` branch.

## Decide Movie Time Project

- To view decide movie time project, please checkout `decide-movie-time` branch.

## Setup

- Setup Commands

````
git clone https://github.com/zawkhantmaung-scm/BCMM-PT-01.git
docker-compose up --build -d
docker-compose exec php bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
exit
cd client
yarn install
yarn start
````

Now, you can login at `http://localhost:3000/login` and mailing server is at `http://localhost:1000/`.