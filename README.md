**Swenson He**

code challenge
___
**Time used for the impelementation: roughly 10 hours, intense work**
___

Of course, the person who reads this documentation is a technical person. So I feel free to describe many things. :)

I have used some concepts and I have solid reasons for each of them that we can talk about. :)
* First, I usually prevent using ORM, ODM. And this project was not an exception. I could simply use mongoose, or sequelize or typeORM or... But, we have lots to talk about why I prefer not to include them.

* project had no constraint to force using special kind of database, any kind of database could satisfy the most basic need.

* I've used [Clean Architecture of Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), why? because I think it's awesome. it might not shine in a tiny project like this, but of course, in an enterprise project, it will rescue!

* first I wanted to use typescript, however, I preferred not to, because in my current job I highly deal with legacy js code and I needed some refreshment before being able to use it and my ideas of how to use it in this time-limited project. But for sure for an enterprise project, my Idea is using TS and Inversify as the IoC. Again, lot's to talk here. :)

* it was a tiny project, so there was no much space available for creativity. However; I tried to include many concepts but not overindulge.

* I enjoy any automatic generation that is not directly related to the business and functionality. I usually prefer jsDOC to generate automatic swagger generation; however, after all this is just a test project and I wanted to test a new library just for giving it a chance.

* in the project description there was no mention of Authentication/Authorization or even CRUD operations, thus, I did not implement them.

* This project is not uploaded to any repository


* I did not understand the **cross-selling** that was mentioned in the documentation, and because I had no access to any person who can act as a business expert or product owner, I implemented it like the most basic recommendation, I might be wrong about the cross-selling concept.


## Project Structure
    .
    ├── ...
    ├── src                     # project codes
    │   ├── container           # container of IoC
    │   ├── data-access         # data access layers
    │   ├── driver              # only one driver, webserver using express
    │   ├── misc                # miscellaneous, mocha tear down, database seed script
    │   ├── models              # Domain Entities
    │   ├── use-cases           # Domain Use-Cases
    │   └── utils               # utilities like validatorCreator, databaase, ...
    └── ...
## Usage

First, provide required envs in **./config** folder and fill these files:
* development.env
* test.env
* production.env

**test.env** is for test purposes, **development.env** is for development purposes and **production.env** is for production as their names suggest.


First of all:
```bash
npm i
```

you can seed database based on the documentation SKU
```bash
npm run seed-database
```

after that:
```bash
#options
npm run start-dev
npm run debug
npm run start-prod
```

tests
```bash
# because of the supertest don't run above scripts and tests simultaneously
npm run test
```

## Default URLs
```bash
Server running at http://localhost:3000

# generated
Swagegr Documentation running at http://localhost:3000/api-docs

# not available with the test environmet
API Telemetry and APM running at http://localhost:3000/swagger-stats
```

