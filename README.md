
Laravel Back: Jwt(autentification), SpatieRoles(Autorization), MercadoPago(Payment Gateway)
            Models: JWT, Roles, User, Category, Product, Preference, Transactions
            RelationShips: User<->Roles, Product<-Category.
                          Roles:Admin,User.
              Aquí tienes un diagrama de las rutas API que has proporcionado:

              /auth
              │
              ├── register [POST] -> AuthController@register
              ├── login [POST] -> AuthController@login
              ├── show [GET] -> AuthController@getaccount
              ├── refresh [GET] -> AuthController@refresh
              └── logout [GET] -> AuthController@logout
              
              /user
              │
              ├── index [GET] -> UserController@index
              ├── store [POST] -> UserController@store
              ├── update/{id} [POST] -> UserController@update
              └── delete/{id} [DELETE] -> UserController@destroy
              
              /product
              │
              ├── index [POST] -> ProductController@index
              ├── getInfo/{id} [GET] -> ProductController@getInfo
              ├── show/{id} [GET] -> ProductController@show
              ├── store [POST] -> ProductController@store
              ├── update/{id} [PUT] -> ProductController@update
              └── delete/{id} [DELETE] -> ProductController@destroy
              
              /role
              │
              └── index [GET] -> RoleController@index
              
              /category
              │
              └── index [GET] -> CategoryController@index
              
              /checkout
              │
              ├── pse [POST] -> MPcontroller@PSE
              ├── card [POST] -> MPcontroller@card
              ├── preference [POST] -> MPcontroller@preference
              ├── findPayment/{id} [GET] -> MPcontroller@findPayment
              ├── findPreference/{id} [GET] -> MPcontroller@findPreference
              └── catchHooks [POST] -> MPcontroller@catchHooks
      
Frontend: Ecommerce2: Taildwind, StatusBrinks.
                      Modules:Auth, Shared, Home, Payment.
                              Auth: Login, Register.
                              Shared: Header, Footer, Cart.
                              Home: Product
                              Payment: Checkout, Status.
                      Contection: ApiService.
                      Autentification: AuthService.
                      Autorization: AuthGuard.
                      CartStorage: CartService(local storage Percistence).


          Admin: AdminLte3, Boostrap5.
                  Components: Login, home, Products, User.
                  Components_popups: Add_user, Add_product.
                  Contection: ApiService.
                  Autentification: AuthService.
                  Autorization: AuthGuard.
