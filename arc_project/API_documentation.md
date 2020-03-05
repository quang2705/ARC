# Rest API documentation
This is a documentation for the Rest API of the tutor verification system project 

## Getting started
Refer to the [README](https://github.com/quang2705/ARC/blob/develop/README.md) file in order to set up and run the project

- Remove the db.sqlite3 file: `rm db.sqlite3` 
- Remove the migration folder: `rm -r arc_app/migrations`
- Run migrations for your project: `python manage.py makemigrations arc_app`
- Run migrate: `python manage.py migrate` 
- Generate the fake database: `python populate_users.py`
- Create a superuser: `python manage.py createsuperuser`
- Run server: `python manage.py runserver`

### Login 
- You can log in and authenticate to the API by going into `http://localhost:/api-auth/login/` using the superuser account that you just created or using one of the account of the fake users
- the fake user will have a username of `<first_name><last_name>` and the password of `<last_name>@123`
- After login, go to `http://localhost:/api/`. This is the root of our API.
- The API will specify what kind of response will be returned and the allowed request for each url
### UserProfile
- UserProfile can be access through `http://localhost:/api/userprofiles/`
- `http://localhost:/api/usprofiles/`: will show the profile of a current user that log in
- UserProfile contains details about the user with specific information that is only exist in our tutor verification system (eg:Dnumber, phone,...)
### User
- User can be access through `http://localhost:/api/users/`
- `http://localhost:/api/users/?param=<param>`: query the users based on the parameters that we provide:
  - username, first_name, last_name
  - eg: `http://localhost:/api/users/?first_name=Quang&last_name=Nguyen`
- User contains the username used to login in to our website, it also have a one to one relationship with userprofile
### Contract 
- GET request:
  -  `http://localhost:/api/contracts`: returns a list of contracts of the current user. Righ now, we decide that we only return contracts where the user is the tutor.
  - `http://localhost:/api/contracts/?param=<param>`: support query the contracts based on the parameters that we provide
    - class_name, subject, professor_name, tutee_email
    - example: `http://localhost:/api/contracts/?class_name=CS349&professor_name=Dr.Bressoud&tutee_email=nguyen_q1@denison.edu`
  - `http://localhost:/api/contracts/<pk>/`: gets the contract with id `pk`
  - `http://localhost:/api/contracts/<pk>/get_sessions/`: query all the sessions of this contract
  - `http://localhost:/api/contracts/<pk>/get_contractmeetings/`: query all the contract meetings of this contract
- POST request: 
  - url: `http://localhost:/api/contracts`
  - body: {tutor_email: , tutee_first_name: , tutee_last_name: , tutee_phone: , tutee_dnumber: , class_name: , professor_name: , subject: }
  - header: basic authentical with login
  
### Session 
- GET request
  - `http://localhost:/api/sessions`: returns a list of sessions of the current user
  - `http://localhost:/api/sessions/?param=<param>`: query the sessions base on the param, right now we do not have any params that support yet
  - `http://localhost:/api/sessions/<pk>`: get the session with id `pk`
- POST request: 
  - url: `http://localhost:/api/sessions`
  - body: {contract_id: ,date: ,start: ,end: ,summary:}
  - header: basic authentical with login
### ContractMeeting
- GET request:
  - `http://localhost:/api/contractmeetings/`: return a list of contractmeeting of the current user 
  - `http://localhost:/api/contractmeetings/?param=<param>`: query contractmeeting based on params, we support 
    - location
  - `http://localhost:/api/contractmeetings/<pk>`: get contract meeting with a id `pk`
- POST request: 
  - url: `http://localhost:/api/contractmeetings`
  - body: {contract_id: ,week_day: ,start: ,end: ,location:}
  - header: basic authentical with login
