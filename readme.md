# Reactjs Scaffold
### Front-End Boilerplate
Reactjs Scaffold is built with React + Babel + Webpack. It's a solution for start your projects.<br />

***
**Author**: *Hein Hoang*<br />
**Website**: <https://github.com/heinhoang>
***

#### Installation
```
$ git clone git@github.com:heinhoang/reactjs-scaffold.git
$ cd your folder
$ npm install
```
#### Scripts
`npm start` : Launch `webpack-dev-server` with Hot Module Replacement - http://localhost:8080<br />
`npm run build` : Compile **/src** folder and create **/dist** folder<br />

#### Testing
For windows user ([more here](https://github.com/TylerBrock/mongo-hacker/issues/138))
1) Download [Make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm)
2) Add the make.exe directory to your PATH variable

#### Structure
```
/Root
    |- e2e
    |- node_modules
    |- src
        |-assets
        |- js
            |- i18n
            |- actions
            |- constants
            |- reducers
            |- saga
            |- utils
            |- components
            |- containers
            |- routes
    |- index.html
    |- index.js
```
#### Features
- Basic scaffold (Transpile ES6/ES7 to ES5, SCSS to CSS)
- Compile third party scss to css
- Settup **Automation Testing** feature (follow this [tutorial](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Your_own_automation_environment))