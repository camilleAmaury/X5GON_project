# Backend

All command line will be run in the `BackEnd` directory.

## Index <a name="head-page"></a>

* #### [Install and run](#install-and-run")
  * ##### [Package management](#package-management")
    * ###### [Create Virtual Machine](#create-virtual-machine")
    * ###### [Install packages](#install-packages")
  * ##### [Run app with flask](#run-flask-app")
    * ###### [Database](#database")
    * ###### [Run Server](#run-server")
* #### [Communicate with API](#communicate-api)
  * ##### [Authorized token](#authorized-token)
  * ##### [Main API endpoints](#main-api-endpoints)
    * ###### [Users](#users-endpoints)
    * ###### [Authentication](#authentication-endpoints)


## Install and run <a name="install-and-run"></a>

### Package management <a name="package-management"></a>

#### Create Virtual Machine <a name="create-virtual-machine"></a>

If the virtual machine of this project is not created.  
Be sure to use Python 3.x.x

```
$ python -m venv venv
```

##### Activate virtual machine

```
$ venv/Scripts/activate
```

##### Leave virtual machine

```
$ venv/Scripts/deactivate
```

[Head of page](#head-page)

#### Install packages <a name="install-packages"></a>

Required packages :

```
$ pip install -r requirements.txt
```

If new packages are installed :

```
$ pip freeze > requirements.txt
```

[Head of page](#head-page)

### Run app with flask <a name="run-flask-app"></a>

If you want to know all possible commands, you can run :

```
$ flask
```

But you will have to run server at least one time to update informations on possible commands.

#### Database <a name="database"></a>

##### Initialize

```
$ flask create-tables
```

##### Clean up

```
$ flask delete-table
```

[Head of page](#head-page)

#### Run Server <a name="run-server"></a>

To run server use :

```
$ flask run
```

##### Local version

If you need to switch from online version to local version, run this command before to run server.

```
$ set FLASK_APP=wsgi.py
```

Warning : This file is the default run file, no need to use this command if you don't already have switch on online version

##### Online version

If you need to switch from local version to online version, run this command before to run server.

```
$ set FLASK_APP=run.py
```

Warning : The local version is the default one. If you don't use this command you will not be able to use online version.

[Head of page](#head-page)

## Communicate with API <a name="communicate-api"></a>

### Authorized token <a name="authorized-token"></a>

After login on the api, the user will get a `token` and is `user_id`.
For all endpoints who need an authorization you will have to send to server this two value in the header :

```js
{
  'X-API-KEY' : token,
  'user_id' : user_id
}
```

[Head of page](#head-page)

### Main API endpoints <a name="main-api-endpoints"></a>

#### Users <a name="users-endpoints"></a>

A general model will be use for all users messages :

```js
{
  'user_id' : Number,
  'username': String,
  'password': String
}
```

But even if this model is return every time, not all attributs will be set, depend of the situation.

##### Retrieve all users

Endpoint : `GET /users`

___Response :___

Code : `200`

Return users list

```js
[
  {
    'user_id' : Number,
    'username': String
  },
  ...
]
```

##### Retrieve user

Endpoint : `GET /users/{user_id}`

___Address parameters :___

`user_id` : ID of the user to retrieve

___Response :___

Code : `200`

Return the specific user

```js
{
  'user_id' : Number,
  'username': String
}
```

##### Create user

Endpoint : `POST /users`

___Body :___

```js
{
  'username': String,
  'password': String
}
```

___Responses :___

Code : `201`  
Return the created user id

```js
{
  'user_id' : Number
}
```
------

Code : `409`  
Conflict, user already exists

------

Code : `422`  	
Validation Error


##### Modify user

Endpoint : `PUT /users/{user_id}`

___Address parameters :___

`user_id` : ID of the user to modify

___Body :___

```js
{
  'username': String,
  'password': String
}
```

___Response :___

Code : `201`  
User successfully updated

------

Code : `409`  
User not found

------

Code : `422`  
Validation Error

##### Delete user

Endpoint : `DELETE /users/{user_id}`

___Address parameters :___

`user_id` : ID of the user to delete

___Response :___

Code : `201`  
User successfully deleted

------

Code : `409`  
User not found

[Head of page](#head-page)

#### Authentication <a name="authentication-endpoints"></a>

##### Login

Endpoint : `POST /authentication/login`

___Body :___

```js
{
  'username': String,
  'password': String
}
```

___Response :___

Code : `201`  
User successfully created

```js
{
  'token' : String,
  'user_id': Number
}
```

------

Code : `403`  
Invalide password

------

Code : `409`  
User not found

------

Code : `422`  
Validation Error

[Head of page](#head-page)
