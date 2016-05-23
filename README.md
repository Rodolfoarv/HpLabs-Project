# HpLabs-Project

Application developed by **Rodolfo Andrés Ramírez Valenzuela**.

The directory structure for the application is as follows:

**HpLabs-Project/**
- **images/**            Folder for the documentation's image files.
- **src/**               Folder for the application's source code.
  - **cpp/**           Folder that contains the cpp files used by the server.
  - **node_modules/**    Folder that contains the modules used by the application
  - **public/**          Folder for the server's public documents.
    - **css/**           Folder for the application's CSS files.
    - **fonts/**         Folder for the application's font files.
    - **img/**           Folder for the application's asset image files.
    - **js/**            Folder for the application's client-JS files.
    - **sass/**          Folder for the application's sass files.
  - **routes/**          Folder that contains the routes the server will dispatch.
  - **views/**           Folder that contains the html files of the project.
  - **app.js**           File generated by Node, contains the dependencies.

# Installing and Running the application

    #Setup the project
    Clone the repository and execute the following commands:

    git clone https://github.com/Rodolfoarv/HpLabs-Project.git
    cd HpLabs-Project/src

    npm install

    #Run application
    npm start

Once the app is running you can access it from: <http://localhost:3000/>

## Important Notes:

**node-gyp** was used to generate the addon which connects the cpp files with the node.js server
at any time you can execute the following command to create the build folder.

    cd /src/cpp
    node-gyp configure build

## Diagrams

### Logical View - Activity Diagram
![](https://github.com/Rodolfoarv/HpLabs-Project/blob/master/images/hplabs_activityDiagram.png)

### Development View - Package Diagram
![](https://github.com/Rodolfoarv/HpLabs-Project/blob/master/images/hplabs_packageDiagram.png)
