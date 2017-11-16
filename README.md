# Sim-GraphQL

This is the codebase for the backend server of our Microeconomics market simulation. This server
implements a GraphQL layer on top of MongoDB to handle data processing and storage for these minimarket
simulations. This server is designed to be platform independent. Any client side framework should be able
to query and use data served by this application.

This project is very closely tied to this front-end client built in React. [Sim-React](https://github.com/mkdorff/Sim-React)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need an installation of:
 * MongoDB
 * Node v8.x or later 
(you can get by with Node v6.x, but 8 is preferred). 
 * yarn or npm
 * Express server (can be installed to the project locally)
 * nodemon (can be installed to the project locally)

### Installing

Clone the repository  

```
git clone https://github.com/Mando75/sim-graphql.git
```

Run 

```
yarn install
```
or
```
npm install
```

## Running the tests

Currently there are no tests available. 


## Deployment

I am still in the early development stage. There are no deployment settings as of yet.

## Built With

* [Express](https://expressjs.com/) - The web server framework used
* [GraphQL](http://graphql.org/) - API query language
* [Apollo Server](https://www.apollographql.com/) - GraphQL Client
* [MongoDB](https://www.mongodb.com/) - Database layer
* [Mongoose](http://mongoosejs.com/) - Database modeling
* [Passport](http://www.passportjs.org/) - Authentication management

## Contributing

Please fork the repository and open a pull request with your changes. Attach it to a project
if appropriate. 

## Authors

* **Bryan Muller** - *Backend Lead* - [Mando75](https://github.com/Mando75)
* **Mohonri Dorff** - *Frontend Lead* - [mkdorff](https://github.com/mkdorff)

See also the list of [contributors](https://github.com/mando75/sim-graphql/contributors) who participated in this project.

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* A big thanks to all of the open source projects who's 
packages we've used. We couldn't do it without you <3

