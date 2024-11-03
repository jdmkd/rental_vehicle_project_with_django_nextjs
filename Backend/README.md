Step 1: Activate Your Virtual Environment

venv\Scripts\activate


_________________________________Skip this step_________________________________
$$$ OPTIONAL $$$$$ Step: List Installed Packages
To generate the requirements.txt file, you can use the following command:

pip freeze > requirements.txt
_________________________________________________________________________________


Step 2: Install Dependencies from requirements.txt
If you (or someone else) need to set up the project later, you can install all dependencies from the requirements.txt file using:

pip install -r requirements.txt


Step 3: Apply Database Migrations
If your Django project uses a database, you will need to apply migrations to set up the database schema. Run the following command:

python manage.py migrate


Step 4: Create a Superuser (Optional)
If you want to access the Django admin panel, you'll need to create a superuser account. Use the following command and follow the prompts:

python manage.py createsuperuser


Step 5: Run the Development Server
To start the development server and see your project in action, use:

python manage.py runserver

After running this command, you should see output indicating that the server is running. 
By default, you can access your project in a web browser at -
http://127.0.0.1:8000/
