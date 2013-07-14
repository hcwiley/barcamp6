
## Setup

This project uses:

* the latest [node](http://nodejs.org/) 0.10.13.
* [Express](http://expressjs.com/) as the MVC micro web framework
* [Sass](http://sass-lang.com/) for stylesheets.
* [EJS](http://embeddedjs.com/) for html templating
* [socket.io](http://socket.io/) for long polling
* [mongodb](http://www.mongodb.org/) for persistence
* [mongoose](http://mongoosejs.com/) as an ODM layer for mongodb


### OS X

We recommend you use this exact version. If you don't have node already all you have to do is run:

```bash
brew install node
```

If you are not sure what homebrew is. [See more information here](http://mxcl.github.io/homebrew/).

If you already have a node version installed, we recommend you uninstall it and install the latest or you can use something like [nvm](https://github.com/creationix/nvm) to manage multiple node versions.

If you choose to use nvm, just install node with:

```bash
nvm install 0.10.13
```

We'd also recommend you make the new node your default just in case it slips back but this step is optional if you know what you are doing:

```bash
nvm alias deafult 0.10.13
```

To install mongodb we also recommend homebrew:

```bash
brew install mongodb
```

You can follow the post-install instructions to set mongodb up as a service or you can run it in the foreground with:

```bash
mongodb
```

## Running the application

First clone this repo. We'd prefer you clone and use a fork if you know how to do that.

```bash
git clone git@github.com:bhelx/barcamp6.git
```

cd in and run npm install

```bash
cd barcamp6 && npm install
```

Copy over the env example file to .env. Then edit it with the real credentials

```bash
cp env.example .env
```

To run:

```bash
npm start
```

Command click on the url or point your browser to http://127.0.0.1:3000/

## License

This application is provided under the [MIT](http://opensource.org/licenses/MIT) license.
