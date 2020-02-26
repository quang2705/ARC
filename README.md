# ARC Project
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)
[![django](https://img.shields.io/badge/-Django-brightgreen)](https://www.djangoproject.com)
[![reactjs](https://img.shields.io/badge/-Reactjs-blue)](https://github.com/facebook/react/blob/master/README.md)

This is a student project at Denison University that aims to digitalize the tutoring session verification process.

## Getting Started
Follow the instructions to download and install the necessary tools to run the app. If at some point, you already have an application installed, you can skip it.
### Prerequisites
#### Node.js
Download Node.js [here](https://nodejs.org/en/). Since this is a small project, what version you choose should not matter. At the time of writing this, I am using version `13.9.0`. The default options during installation should be good.
After installation, you can check if Node.js is properly installed using command `node -v` and the output should be the version you just installed. 
#### Anaconda
This is for installing Python and `pip`, a pack-management system for packages written in Python.
Download Anaconda for Python 3 [here](https://www.anaconda.com/distribution/). During installation, make sure to choose the option <i>Add Anaconda to my PATH environment variable</i>.
#### Git
Download `git` for Windows [here](https://gitforwindows.org/) if needed. Unix and MacOS users should already have `git` installed.
### Setting up the app
#### Clone the repository
Go to the directory you want to clone the project into and type `git clone https://github.com/quang2705/ARC.git` in the command-line. Then `cd ARC` and switch to `develop` branch using `git checkout develop`.
#### Setting up virtual environment for python packages
This is optional. If you skip this section, please use `pip install` to install a python package for this project.

<b>For Windows.</b> Create an environment called `ARC` for our project using `conda create -n ARC`. Then activate it with `conda activate ARC`. From now on, whenever we install a package from `pip`, it will install it for the `ARC` environment only instead of global by default. This way we can avoid conflicts between packages.

<b>For MacOS and Unix.</b> Do `pip install virtualenv` and `pip install virtualenvwrapper` to install `vitualenv` and `virtualenvwrapper` packages. Then `python3 -m venv ARC` to create environment named `ARC`. Activate it using `source ARC/bin/activate`.
#### Setting up Django
In the command-line, type `conda install --name ARC django`. Then `conda install --name ARC djangorestframework`. The commands will install those packages in the `ARC` environment and can only be used if the `ARC` environment is activated.

<i>Note.</i> If the virtual environment does not work for some reason, use `pip install _package_name_` to install the package in the global environment. However, this may create conflicts with packages not used by this project.
#### Installing npm packages and Reactjs
`cd arc_projects/frontend` then `npm install`.
#### Getting the database for development
Download the file [`db.sqlite3`](https://drive.google.com/file/d/1mAsVOUegNK4_nzBS0Xwy2xu6wSt66m3N/view?usp=sharing) and put it in `arc_projects` folder. This is the pseudo-database we currently work with for testing purposes.

<i>Optional.</i> To generate a database, delete `migrations` folder in `arc_app` and delete `db.sqlite3` file in `arc_projects`. In `arc_projects` folder, run `python manage.py makemigrations arc_app` and `python manage.py migrate`. And finally run `python populate_users.py`. 
#### Running the app
Go to `arc_projects/frontend`, run `npm run dev`. Use `npm run dev -- --watch` if you want `webpack` to monitor file changes without having to re-run the command.

At `arc_projects` folder while in command-line, use `python manage.py runserver` to run the server. The address should be listed after "Starting development server at". The default address is `http://127.0.0.1:8000`.
#### Debugging
If encounter issues with `django` or `djangorestframework` package not found, use `pip install django` and `pip install djangorestframework` instead.
## Authors
Meg Jaffy - jaffy_m1@denison.edu

Khue Le - le_k1@denison.edu

Quang Nguyen - nguyen_q1@denison.edu

Hiep Phan - phan_h1@denison.edu

Khanh Tran - tran_k1@denison.edu
