# Create Landing Page
[![Build Status](https://travis-ci.org/kevindantas/create-landing-page.svg?branch=master)](https://travis-ci.org/kevindantas/create-landing-page)

Skip all setup to create a static landing page.

## Usage

```
npm install -g create-landing-page

create-landing-page awesome-landing
# Follow the steps and choose technologies

cd awesome-landing
npm start
```

## Avaliable scripts


### start
```
$ landing-scripts start

  --https       Enable HTTP on the development server
```



### build
Generate build files
```
$ landing-scripts build
```


### serve
Serve on production mode the project.
```
$ landing-scripts serve
```


### audit
Generate a Lighthouse report inside the `audits` folder.
```
$ landing-scripts audit

  --disable-device-emulation
```

