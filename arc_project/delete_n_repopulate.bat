rm db.sqlite3
rm -r arc_app/migrations
python manage.py makemigrations arc_app
python manage.py migrate
python populate_users.py
python manage.py createsuperuser
