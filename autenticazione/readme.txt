Da postman:

POST su localhost:3000/login o https://progettoing2.herokuapp.com/login
body json:
{
    "username":"pippo",
    "password":"pass"
}

Vai a copiarti il token, ad esempio:

eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwaXBwbyIsImlhdCI6MTY0MTY0NDQ3NSwiZXhwIjoxNjQxNjczMjc1fQ.H-7d3ZF9eXOcvP86a0_O2xBWRNL_92ejBqX7Dd7lnuBfIHEtHcUS_eDkvQ63i0BGLVRkBVQQ88RbIBIHTYMdjqUP_8Q52bCcgpOpmSB8NagbMDvaL66woH6QUh-IXy853HEN-Tjq5zoprMIdUcNvxV1_EKhc_0USA_1h23_tB7U

Da postman:

GET su localhost:3000/ o https://progettoing2.herokuapp.com/foto
Headers:
Name Authorization
Value Bearer + token


