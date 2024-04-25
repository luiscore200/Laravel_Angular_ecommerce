
Laravel Backend
Features
JWT Authentication: Handles user authentication using JSON Web Tokens.
Spatie Roles Authorization: Implements role-based authorization using Spatie.
MercadoPago Integration: Integrates MercadoPago as the payment gateway.
Models
JWT
Roles
User
Category
Product
Preference
Transactions
Relationships
User <-> Roles
Product <- Category
API Routes
scss
Copy code
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
Frontend: Ecommerce2
Technologies
Framework: Tailwind CSS
StatusBrinks: Utilized for status display.
Modules
Auth: Handles authentication functionalities like login and register.
Shared: Shared components such as header, footer, and cart.
Home: Displays products on the home page.
Payment: Manages checkout and status of payments.
Connections
ApiService: Communicates with the backend API.
AuthService: Handles authentication-related tasks.
AuthGuard: Implements authorization mechanisms.
CartService: Manages cart data using local storage persistence.
Admin
Frameworks and Libraries
AdminLTE3
Bootstrap5
Components
Login: Component for administrator login.
Home: Dashboard for administrative tasks.
Products: Management of products.
User: Management of users.
Pop-up Components
Add_user: Pop-up for adding a new user.
Add_product: Pop-up for adding a new product.
Connections
ApiService: Communicates with the backend API.
AuthService: Handles authentication-related tasks.
AuthGuard: Implements authorization mechanisms.
                  
