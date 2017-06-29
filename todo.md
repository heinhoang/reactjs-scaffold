#### What we use
 - Webpack/Babel/SCSS to scaffold/transpile our web app
 - ReactJS/Redux/Redux Saga to contruct our app architecture
 - [Redux Form](http://redux-form.com) for managing your form state
 - [material-ui]() for supporting building UI
 - [polyglot](https://github.com/airbnb/polyglot.js) for language translation/localization
 - selenium-webdriver/Jasmine,.. for testing

#### Folder Structure
Root
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

#### App Flow
* **App** using Admin component & pass props to Admin
  1. **Admin**: Control redux store & render children (render loginPage or Layout component)
  2. **TranslationProvider**: Support Localization (pass translate function to children)
  3. **Layout**: Control layout & render children based on AdminRoutes
  4. **AdminRoutes**: render customRoutes or CrudRoute ('Restful Routes') (based on props from Resource Component) or dashboard
  5. **CrudRoute**: deligate to Restricted for authentication & then render 'Restful Routes'

#### Redux Architect
  Reducers
    |- **admin**
      |- **resourceReducers**
      |- **loading**
      |- **notification**
      |- **references**
      |- **saving**
      |- **ui**
    |- **locale**: Language Localization
  Saga
    |- **crudSaga**
      |- **auth**: Authentication
      |- **crudFetch**
      |- **crudResponse**
      |- **referenceFetch**

#### Done
 - Basic scaffold (Transpile ES6/ES7 to ES5, SCSS to CSS)
 - Compile third party scss to css
 - Settup **Automation Testing** feature (follow this [tutorial](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Your_own_automation_environment))

#### Todos
 - Settup localization feature
 - **Admin Component** for Athentication/Authorization
 - **Resource Component** to deal with Resful API
 - **Layout Component** to control app layout
 - **Login/Logout** form
 - test Login.js https://github.com/airbnb/enzyme/issues/947, https://stackoverflow.com/questions/40932838/using-mjacksons-expect-spyon-on-function-from-react-components-props

#### Testing
For windows user ([more here](https://github.com/TylerBrock/mongo-hacker/issues/138))
1) Download [Make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm)
2) Add the make.exe directory to your PATH variable
