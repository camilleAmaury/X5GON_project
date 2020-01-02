## Run backend

### Initialize project

#### Create Virtual Machine

If the virtual machine of this project is not created.  
Be sure to use Python 3.x.  
In the `BackEnd` directory, run :

```
$ python -m venv venv
```

### Befor work on project

#### Activate the virtual machine

In the `BackEnd` directory :

```
$ venv/Scripts/activate
```

#### Install packages

Required packages :

```
$ pip install -r requirements.txt
```

If new packages are installed :

```
$ pip freeze > requirements.txt
```

### Run app

```
$ python app.py
```
