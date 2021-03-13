<h1 align="center">
    Imovel Finder API
</h1>

<p align="center">
  <img alt="Imóvel Finder API" src="https://img.shields.io/static/v1?label=Languages&message=1&color=d92e2e&labelColor=4f4f4f">
  <img alt="Imóvel Finder API" src="https://img.shields.io/static/v1?label=Imóvel%20Finder%20API&message=V1&color=8257E5&labelColor=000000">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

<div align="center">
    <p align="center">
        <strong>Encontre seu imóvel sem sair de casa</strong>
        <br/>
        <label>Chega de correr dia após dia atras de seu imóvel, agora você pode comprar ou alugar seu imóvel pela palma da sua mão!</label>
    </p>
</div>

<p align="center">
  <a href="#bulb-sobre-o-projecto">Sobre o Projecto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer_and_wrench-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#link-endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#open_hands-como-contribuir">Como Contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-memo-License">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#busts_in_silhouette-colaboradores">Colaboradores</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#bust_in_silhouette-autores">Autores</a>
</p>

# :bulb: Sobre o projecto
 Este projeto foi criado pra colocar em pratica o conhecimento de Javascript com NodeJS. Os dados usados aqui não são reais (até o momento).

 # :hammer_and_wrench: Tecnologias

Este projecto foi construído usando as seguintes tecnologias:

- [Javascript](https://www.w3schools.com/js/)
- [NodeJS](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)


## :link: Endpoints
Abaixo segue a lista e descrição de endpoints implementados nesse projeto.
OBS: SSL está desabilitado nos endpoints.

# **Users**

----

### **Novo usuário**
  Retorna um JSON com os dados do usuário cadastrado..

* **URL**

  /api-imovel-finder/users/

* **Method:**

  `POST`

* **Body**
    `email=[string][required]`
    `password=[string][required]`
    `full_name=[string][required]`

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```json
    {
        "id": 2,
        "email": "teste@teste.com",
        "password": "123456",
        "full_name": "Teste",
        "updatedAt": "2021-03-13T04:36:42.830Z",
        "createdAt": "2021-03-13T04:36:42.830Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED
    **Content:**
    ```json
    { error : "You are unauthorized to make this request." }
    ```

### **Buscar um usuário pelo ID**
  Retorna um JSON com os dados do usuário encontrado.

* **URL**

  /api-imovel-finder/users/1

* **Method:**

  `GET`

* **URL Params**
    `id=[integer][required]`

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```json
    {
        "id": 1,
        "email": "teste@teste.com",
        "full_name": "Teste"
    }
    ```
 
* **Error Response:**
 
  * **Code:** 404 NOT FOUND
    **Content:**
    ```json
    { error : "User not found." }
    ```

  * **Code:** 401 UNAUTHORIZED
    **Content:**
    ```json
    { error : "You are unauthorized to make this request." }
    ```

### **Atualiza um usuário**
  Não retorna dados ao atualizar os dados do usuário.

* **URL**

  /api-imovel-finder/users/1

* **Method:**

  `PATCH`

* **Body**
    `email=[string]`
    `password=[string]`
    `full_name=[string]`

* **Success Response:**

  * **Code:** 200
    **Content:**
    No response data
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
    **Content:**
    ```json
    { error : "User not found." }
    ```

  * **Code:** 401 UNAUTHORIZED
    **Content:**
    ```json
    { error : "You are unauthorized to make this request." }

---