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

## User Authentication and Authorization in React

<img src="(readme_images/react_auth_diagram.png" width="50%" height="auto" alt="Screenshot">

The diagram simply explains what happened and what to expect from a backend service and a React application. It may also be said as traditional life cycle of a product.

Authentication is important to build a secured application. The security vulnerabilities are the last thing that any developer intents to make hence attackers may reach to data of your user. 

### Server
The server must know who are the users are hence it returns responses to these users' requests. It wants to send the data to authenticated or authorized user hence every data from the database of the server should not send to every user for security purposes.
The server has to authenticate every single request who wants to user, identify user and return the response if it has permission as success otherwise no permission.

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

## React Hook Form
It is for building complicated and well performed forms in React. It is for avoiding the unnecesarry code implementation in React. It allows developer to handle user experience, and it also allows getting appropriate data from the user with less code considering with actual React library.

The forms are necesarry to communicate properly. They improve our communication quality with sending the request to the right endpoint.

isSubmitting variable is for managing submission process when waiting for a response from backend service.


Daha iyi UX için telefon numarasındaki input değerinin 10 karakterden sonra input değerlerini yazdırmasını bıraktırabilirim.

SignUp bölümünde iki şifrenin eşit olup olmadığının validasyonu yapılmalı.

## Login Algoritması
Kullanıcının bilgilerini aldım.
Uygun formata getirip istek attım.
JWT token dönerse cookieyi oluşturmalıyım.
Dönmezse login screende kalmalıyım.
Ardından da cookie olarak setledim.
Sonra zaten cookie state'ini react uygulaması kontrol ediyordu. Gidip değişimi görüp ona göre yönlendirme yapacak.


AXIOS CONFIGURATION FOR BEARER TOKENS AND BODY

COOKIE'yi oluştururken attığım istek, esasında kontrol mekanizmamı tetiklemekte. Onu yaparken kontrol ettikten sonra, eğer profil bilgileri nullsa yönlendirebilirim. Ek olarak ayrı bir şekilde kontrol mekanizması yapabilirim. Yapmak da mantıklı duruyor.

## Yarın Yapacaklarım:
Transaction işlemini gerçekleştireceğim. Para yüklenen bir pop up modal yazacağım. Ardından da yapılan transfer işlemlerini görselleştirip göstereceğim.

Vaktim kaldığında da şifre yenilemeyle alakalı bir arayüz yazacağım. Eski şifre ve dbdeki şifre matchlenirse yeni şifreyi eski şifrenin üzerine yazacağım.

Sonraki güne sarkarsa ona göre hareket ederim. Mobil üzerinden doğrulama kodu göndertip onu da doğrulayan bir sistem yazabilirim hafta bitene kadar.

## Eklenebilecek özellik
Kullanıcı para gönderirken, sahip olduğu hesapları kaydırmalı olarak seçebilir. Göndereceği hesabın sahibinin isminin ve soy isminin ilk harflerini gözükür bir şekilde yazdırılır.