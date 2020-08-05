# NASA-APP :rocket:

Development of application use vue, based on the API of photos and information from NASA https://api.nasa.gov/. The user will find two sections, the first is apod, which shows the image of the day and access to previous days, in the second section called rover are the photos taken on Mars, you can enter the sun number ( Mars mission day ) or Earth Day to display these photographs taken on the selected day. The project also contains login with authentication and implementation of vue router



## Technologies :hammer_and_wrench:

- Html5

- Css3 

- Sass

- Vue

- Vuex

- Vue Router

- Vuetify

- Firebase

  

**Visual Studio Code** ( Recommended editor ) 

> https://code.visualstudio.com/



## Documentation 📖

The next queries are used:

#### APOD

Example of query to show the photo of the day APOD

- https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY

#### Mars Rover Photos

- Sample query to show Mars Rover photos

  https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY

- Shows the last photos taken by the Rover

  https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?&api_key=DEMO_KEY

For more information, see the documentation at https://api.nasa.gov/



## Project View :tada:

#### Access

To enter the site correctly enter the next data

> **Mail** :  userexample@user.com
>
> **Pass** : 123456



#### [See the project](https://nasa-8835a.web.app/) 💻

![nasa](https://user-images.githubusercontent.com/47857535/89352196-92c91b80-d681-11ea-9cd5-2cd7c8ba7efe.png)



> *Apod section where the image of the day is shown*

![apod](https://user-images.githubusercontent.com/47857535/89353054-9a89bf80-d683-11ea-94a9-bd24410f07cb.png)

> *Rover section where you can select the sun or earth day to see all the photos taken on Mars on the selected day*

![rover](https://user-images.githubusercontent.com/47857535/89353192-eccae080-d683-11ea-89ee-e15b7e516594.png)



## Requirements ✔️

Before starting this project you must have the following installed

**Node.js**

> [https://nodejs.org/](https://nodejs.org/)

**Vue CLI**

> [https://cli.vuejs.org/](https://cli.vuejs.org/)

```
$ npm install -g @vue/cli
```

#or

```
$ yarn global add @vue/cli
```

**Firebase**

> https://firebase.google.com/
>

```
$ npm install -g firebase-tools
```

#or

```
$ yarn add -g firebase firebase-tools
```



## Clone project

```
$ git clone https://github.com/mauriciodesign/nasa.git
```



## Installation​ :open_file_folder:

Once the project is cloned, all that remains is to install the dependencies, in the root folder, write the next command

```
$ npm install
```

#or

```
$ yarn install
```



Once the process is finished, the project can be executed locally with the next command

```
$ npm run serve
```

#or

```
$ yarn start
```



To initialize Firebase in your project

```
$ firebase init
```



## Deployment :rocket:

With the following command it is compiled and minified for production

```
$ npm run build
```

#or

```
$ yarn build
```



To implement the hosting in Firebase and see the project in production

```
$ firebase deploy --only hosting
```



#### Autor :sunglasses:

------

Application developed by [**MauricioDesign**](https://github.com/mauriciodesign) 🤘​