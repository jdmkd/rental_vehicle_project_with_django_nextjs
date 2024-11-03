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