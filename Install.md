
# Как поднять сайт локально

## 0. Операционная система

Сайт работает под MacOS, Unix (протестировано на Ubuntu, Debian), но не Windows. Сам код сайта более-менее универсален, но под Windows криво работают некоторые сторонние модули.

## 1. Директория

Чтобы было проще – создайте в корне директорию `/js`, и в ней работайте. 
Если философия не позволяет – можно другую директорию, тогда в командах ниже поправьте пути соответственно.

## 2. Поставьте и запустите Node.JS и MongoDB

Node.JS – последняя версия с [https://nodejs.org](https://nodejs.org).

Mongo – можно 2.6+. Линукс-пакет или, если у вас Mac, то проще всего сделать это через [MacPorts](http://www.macports.org/install.php) или [Homebrew](http://brew.sh), чтобы было проще ставить дополнительные пакеты.

Если через MacPorts, то:
```
sudo port install mongodb
sudo port load mondogb
```

## 3. Клонируйте репозитарий 

Предположу, что Git у вас уже стоит и вы умеете им пользоваться. 

Клонируйте только ветку `master` движка:
```
cd /js
git clone -b master --single-branch https://github.com/iliakan/javascript-nodejs 
```


## 4. Глобальные модули

Поставьте глобальные модули:

```
npm install -g mocha bunyan gulp nodemon   
```

## 5. Системные пакеты

Для работы также нужны Nginx, GraphicsMagick и ImageMagick (обычно используется GM, он лучше, но иногда IM).

Под Macports команды такие:

```
sudo port install ImageMagick GraphicsMagick 
sudo port install nginx +debug+gzip_static+realip+geoip

sudo port load nginx
```

## 6. Конфигурация Nginx с нуля

Если в системе ранее не стоял nginx, то поставьте его.

Логи nginx пишет в директорию `/var/log/nginx`.

Если её нет, то нужно создать и поставить пермишны/владельца. Например, если компьютер – ваш личный, то запустить от рута:
```
mkdir /var/log/nginx
chmod 777 /var/log/nginx
```

Cтавим настройки для сайта запуском:
```
gulp config:nginx --prefix /opt/local/etc/nginx --root /js/javascript-nodejs --env development --clear 
```

Здесь `--prefix` -- место для конфигов nginx, обычно `/etc/nginx`, в случае MacPorts это `/opt/local/etc/nginx`.
В параметр `--root` запишите место установки сайта.

В `--root` находится путь к движку: если вы использовали другой путь для сайта, вместо `/js/javascript-nodejs`, то измените его. 

Опция `--clear` полностью удалит старые конфиги nginx.

Также рекомендуется в `/etc/hosts` добавить строку:
```
127.0.0.1 javascript.in
```

Такое имя хоста стоит в конфигурации Nginx.
 
## 6.1. Если Nginx у вас уже стоит

Если уже есть nginx, то сделайте резервную копию всех его конфигов.
 
После этого выполните предыдущую секцию без `--clear` в команде: 

```
gulp config:nginx --prefix /opt/local/etc/nginx --root /js/javascript-nodejs --env development  
```

Такая команда скопирует файлы из директории `/js/javascript-nodejs/nginx` в указанную директорию `--prefix`, но без перезаписывания.
 При копировании используется небольшая шаблонизация конфигов, т.е. это не просто `cp`, но структура файлов остаётся такой же.

Основные конфиги будут перезаписаны, но в `sites-enabled` останутся и будут подключены и другие сайты. 
 
Перезапустите Nginx. Проверьте, что ваши предыдущие проекты работают.
 
## 7. `npm install`

В директории, в которую клонировали, запустите:

```
npm install
```

## 8. База

Инициализуйте базу сайта командой:
 
```
gulp db:load --from fixture/init 
```


Клонируйте ветку учебника, например `ru`:
```
cd /js
git clone -b ru --single-branch https://github.com/iliakan/javascript-tutorial
```

После клонирования импортируйте учебник в базу командой:
```
PLUNK_REMOTE_OFF=1 gulp tutorial:import --root /js/javascript-tutorial
```

Здесь `/js/javascript-tutorial` -- директория с репозитарием учебника.

`PLUNK_REMOTE_OFF=1` отключает автоматическую загрузку примеров из учебников на сервис plnkr.co. 
Она требует настройки сессии на plnkr.co и нужна при публикации учебника. 
Для запуска проекта она не нужна, особенно если вас интересуют другие модули. 

## 9. Запуск сайта

Запуск сайта в режиме разработки:
```
./ru
```

Это поднимет сразу и сайт и механизмы автосборки стилей-скриптов и livereload.

Обратите внимание: ходить на сайт нужно через Nginx (обычно порт 80), не напрямую в Node.JS (не будет статики).

Если в `/etc/hosts` есть строка `127.0.0.1 javascript.in`, то адрес будет `http://javascript.in/`.

# TroubleShooting

Если что-то не работает -- [пишите issue](https://github.com/iliakan/javascript-nodejs/issues/new).


