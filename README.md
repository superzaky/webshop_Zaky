## Tools that I have used when building this project:
- Operating system: Windows 11 Home 
- Medusa.js: v2
- Node.js version: 22.5.1
- NPM version: 10.8.2
- PostgreSQL version: 16
- pgAdmin 4 version: 8.10
- Visual Studio Code version: 1.91.1

## INSTRUCTIONS TO USE THIS PROJECT
Download or clone this project, for example, via SSH by executing the following command in your terminal:

`git clone git@github.com:superzaky/webshop_Zaky.git`

In your terminal go to the webshop_sample directory and type in the following command to install the required dependencies:

`npm install`

As for Windows, add a user variable `DATABASE_URL` to your environment variables with the following value:

`postgres://<YOUR_USERNAME_HERE>:<YOUR_PASSWORD_HERE>@localhost:<YOUR_DATABASE_PORTNUMBER_HERE>/<YOUR_DATABASE_NAME_HERE>`

Note, usually when you install a PostgreSQL server on your computer the username of your DB server is called `postgres` 

After that, go to the webshop_sample directory and type the following command in your command line so that tables will be generated into your database:

`npx medusa migrations run`

NOTE: The above mentioned command only works in the command line and does NOT work in Powershell nor in the terminal in Windows for some reason.

Finally, in order to run the webshop_sample, go to the webshop_sample directory and type the following command in your terminal:

`npm run dev`
