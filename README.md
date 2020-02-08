<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![LinkedIn VK][linkedin-shield]][linkedin-url-1]
[![LinkedIn AB][linkedin-shield]][linkedin-url-2]
[![LinkedIn CAJ][linkedin-shield]][linkedin-url-3]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">X5GON Student Project</h3>

  <p align="center">
    Vincent Kowalsky - Aniss Bentebib - Camille-Amaury Juge
    <br />
    <a href="http://185.157.246.81:5000/"><strong>Explore the API »</strong></a>
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents <a name="head-page"></a>

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Install and run](#install-and-run")
  * [Package management](#package-management")
    * [Create Virtual Machine](#create-virtual-machine")
    * [Install packages](#install-packages")
  * [Run app with flask](#run-flask-app")
    * [Database](#database")
    * [Run Server](#run-server")
* [Usage](#usage)
* [License](#license)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

[![Knowledge Recipe][product-screenshot]]()

### Built With
This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [Bootstrap](https://getbootstrap.com)
* [Node.js](https://nodejs.org/en/)
* [React.js](https://fr.reactjs.org/)
* [Fuseki server](https://jena.apache.org/documentation/fuseki2/)
* [Flask](https://www.palletsprojects.com/p/flask/)

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

[Head of page](#head-page)

<!-- USAGE EXAMPLES -->
## Usage

### From Dataset to Knowledge Graph

[Link of colab Jupyter notebook](https://colab.research.google.com/drive/1a6JEIpiZZ_XFUKIr4osyUXfQEQS0pfMz#scrollTo=TDd4nvYaZEcb)_

... more content later on


<!-- LICENSE -->
## License

You can freely copy code or other content except all the images, gif and designs created for this project.
You should also mention our names.


<!-- CONTACT -->
## Contact

See the linkedIn shields in the top of the README.md


<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url-1]: https://www.linkedin.com/in/vincent-kowalski-b7868b166/
[linkedin-url-2]: https://www.linkedin.com/in/aniss-bentebib-a449a8155/
[linkedin-url-3]: https://www.linkedin.com/in/camille-amaury-juge/
[product-screenshot]: images/knowledgeRecipe.png
