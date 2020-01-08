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

## Install and run <a name="install-and-run"></a>

### Package management <a name="package-management"></a>

#### Create Virtual Machine <a name="create-virtual-machine"></a>

If the virtual machine of this project is not created.  
Be sure to use Python 3.x.x

```
$ python -m venv venv
```

###### Activate virtual machine

```
$ venv/Scripts/activate
```

###### Leave virtual machine

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

###### Initialize

```
$ flask create-tables
```

###### Clean up

```
$ flask delete-table
```

[Head of page](#head-page)

#### Run Server <a name="run-server"></a>

To run server use :

```
$ flask run
```

###### Local version

If you need to switch from online version to local version, run this command before to run server.

```
$ set FLASK_APP=wsgi.py
```

Warning : This file is the default run file, no need to use this command if you don't already have switch on online version

###### Online version

If you need to switch from local version to online version, run this command before to run server.

```
$ set FLASK_APP=run.py
```

Warning : The local version is the default one. If you don't use this command you will not be able to use online version.

[Head of page](#head-page)
