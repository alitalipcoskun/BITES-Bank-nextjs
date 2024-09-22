# BITES Bank Project

## Yapılabilecek eklemeler
Hataları backendden dönüp, frontendde sadece hata yakalayıp onu yazdırmalıyım. Bence bu durum çok daha mantıklı.
Database'i dockerda ayağa kaldırabilirsin.
Java Spring Boot application'unu dockerla ayağa kaldırabilirsin.
DataTable componenti responsive değil.
Login screende şifreyi yanlış girince girdi alanları kırmızı olmuyor.
Anasayfadaki para ekleme kısmında dropdown menünün hatayı yakalama durumundaki reaksiyonu kontrol edilecek.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Java Spring Boot, PostgreSQL
- **Authentication**: JWT stored in HTTP-only cookies
- **Password Recovery**: Redis holds temporary key-value pairs.

## React Hook Form
It is for building complicated and well performed forms in React. It is for avoiding the unnecesarry code implementation in React. It allows developer to handle user experience, and it also allows getting appropriate data from the user with less code considering with actual React library.

The forms are necesarry to communicate properly. They improve our communication quality with sending the request to the right endpoint.

You can see the documentation from here to understand properly: https://react-hook-form.com/docs

## Yup Form Validation
Yup is a Javascript library that is used for building schemas to provide appropriate data to services. In addition, it is commonly used for form validation to give instant feedback to the user in order to provide the correct data with any pattern to the correct field. It also helps asynchronous validation.

Docs to yup: https://www.npmjs.com/package/yup/v/1.0.0-alpha.3


## Prime React
It is a comprehensive collection of UI components for React. It provides a wide of range of components that is designed to be modified and easy to use. It has a rich capacity for frontend development. Moreover, it also provides theming and helps to build responsive applications. Its community is also very active.

Docs to PrimeReact: https://primereact.org/

## Shadcn-ui
It is also a collection of UI components for React. However, I needed to use a mixed type of PrimeReact and shadcn-ui. It uses radix-ui to build custom components. It is helpful to build responsive applications with customizable UI components. 
The designs of the components are better than Prime React for me, but I would not be able to use them in my project. The documentation of the library should be improved with more complex use cases.
Another drawback of the library is requirement of installation process for every component that you want to use in your project. It is not a big deal; however, when it is considered with its rivals, I would say it is a drawback.

Docs to shadcn-ui: https://ui.shadcn.com/docs

## Getting Started

First, run the development server.
Navigate to the project directory.
Then, run:
```bash
npm install
```
to run the project on your local machine.

If you do not have Docker Desktop application or docker environment on your development environment.

```bash
npm run dev
```


If you have docker, you may want to run this command:
```bash
docker build -t 'app-name' .
```

```bash
docker compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Errors that I faced on Docker
The project had run on npm run dev on my local machine. However, it was unable to run on my docker
container. 
I solved it with this approach on my docker container command line:

```bash
npm ls yup
```

nothing showed. Then I run

```bash
npm i yup
```
on docker container terminal. It is solved. I need to search this issue whether it can be solved
differently or not.

Sometimes, the container does not install the required packages. If you face these kind of issues, you may install the package manually via connecting to the cli of the container.

## User Authentication and Authorization in React

<img src="readme_images/react_auth_diagram.png" width="50%" height="auto" alt="Screenshot">

The diagram simply explains what happened and what to expect from a backend service and a React application. It may also be said as traditional life cycle of a product.

Authentication is important to build a secured application. The security vulnerabilities are the last thing that any developer intents to make hence attackers may reach to data of your user. 

### Server
The server must know who are the users are hence it returns responses to these users' requests. It wants to send the data to authenticated or authorized user hence every data from the database of the server should not send to every user for security purposes.
The server has to authenticate every single request who wants to user, identify user and return the response if it has permission as success otherwise no permission.+
### Users
The users should not communicate `directly` with the server.

### React App
It must send requests with respect to the `users' interaction`. It acts like a middle man between users and server.

## Tokens
We've two tokens: access token and refresh token. These tokens can be used either in React application or backend service to give authentication and authorization to the user for sending requests and to identify user.

### Refresh Token
The token is created in authentication process. It should not be shared with anybody and stored in cookies which is HTTP only. This means, this cookie cannot be accessed through `Javascript`. This means, only the server will be able to read and set this cookie. React application or any attacker will not be able to see this cookie. **NEVER GOES TO CLIENT**.

### Access Token
It is generated by refresh token. Then, this token is send to `the React application` as response. After that, the React application is responsible for storing and using this token. The access token will give permission to the user to see the services and send request to the server. Moreover, `it must be passed in every request` hence it identifies the who the user is. As long as we have a valid access token, the user can make specified interactions with the React application, and these interactions creates requests, then the server validates the requests hence it is the token of the user. The expiration dates are implemented to the accesss tokens. The cookies or local storage are not secure. The safest place to put this token to a safe place is memory, that means a state. The handling of expired time of the token is a responsibility of `the React application`. However, I was new for authentication at the beginning of my internship, so I decided to use cookies instead of states. I wanted to learn previous technologies and check if I have enough time, I will try to improve security issues.
The useful video to understand this tokens: https://youtu.be/AcYF18oGn6Y

