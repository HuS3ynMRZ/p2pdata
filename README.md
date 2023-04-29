# p2pdata

## Project description

Design a protocol that synchronizes data in local and remote databases of independent workstations​

- Workstations record data into a local database​
- Data in local databases must be shared with other workstations​
- No piece of data can be lost​
- Workstations can go on and off​
- Workstations can operate in offline mode​
- Workstations can either add or remove a piece of data, can remove pieces of data not added on it​

## Installation requirements

Firstly we need to install mongodb to be able to test and monitor our database easily during development phases :

- [MongoDB Community 6.0.5](https://www.mongodb.com/try/download/community)

Do not uncheck "install compass" during the installation

Then open the project and run :

```
npm install
```

NPM package manager is needed for this part, if you don't have it yet you can download Node Js. It will be required for the next part : 

- [Node JS](https://nodejs.org/en/download)

Then run and check if the test is successfull:

```
node test.js
```

To start docker containers locally on your machine, run 

```
docker-compose up --build
```

or just run ./rundocker.sh

If you want to test the code on your machine without docker, just run

```
npm run dev
```

If It's not working check the uri string used by your mongodb instance. He could be different from the default one.

Now, you can start working !


