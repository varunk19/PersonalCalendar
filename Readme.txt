Required Softwares for easier setup:
1. IntelliJ IDEA
2. Visual Studio Code

Steps to run the application:
1. Download and install PostgreSQL from https://www.enterprisedb.com/downloads/postgres-postgresql-downloads. 
   Ensure that you don't change any default values like port number and make sure to set the superuser password as root.
2. Go to start and open SQL shell(psql) command prompt(can be found by typing in the search bar).
3. Press enter 4 times and enter root password which is "root".
4. Type the statement "CREATE DATABASE calendar;" and press enter.
5. Close the command prompt.
6. Ensure that Java 1.8 is installed by typing "java -version" in a normal windows command prompt. If not then it must be installed to proceed further.
7. Open "MyCalendarBackend" folder in IntelliJ and go to "Run" tab and click on "Run CalendarCrudApplication". Wait for it to finish building and the for the server to start running.
   You will see a line like this in the run window if the server is up and running: "Tomcat started on port(s): 8080 (http) with context path ''"
8. Ensure that node and angular are installed by typing "node -version" and then "ng --version" in a normal windows command prompt. If not then they must be installed to proceed further.
9. Open "MyCalendar" folder in Visual Studio Code and click on "New Terminal" in the "Terminal tab". Alternatively you can open a nodeJS command prompt in the folder.
10. Type "npm install" to install all the required dependancies.
11. Type "ng serve -o" to run the Angular frontend application.

Screenshots of the project are present in the "Screenshots" folder.

When the application loads, please register yourself first to be able to use the application.
