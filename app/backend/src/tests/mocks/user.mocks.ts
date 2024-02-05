const noEmail = {
    password: 'secret_admin'
}

const noPassword = {
    email: 'admin@admin.com'
}
const invalidpassword = {
    email: 'admin@admin.com',
    password: '9009',
}

const validToken = {
    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzA3MTQwMDUwLCJleHAiOjE3MDc3NDQ4NTB9.qOflIe7s1Nw-P9I5xRECCtXTNPoJ5xQh2aTXuO0or6A"
}

const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzA2ODEwOTExLCJleHAiOjE3MDc0MTU3MTF9.bsVn9Z46Jisyym3JKuclZe6a0iQHpMOD6Ywi1ss4hrU';

const invalidEmail = {
    email: 'using.user.paranaue',
    password: 'secret_admin'
}

const userValid = {
    email: 'admin@admin.com',
    password: 'secret_admin'
}

const userInvalid = {
    email: 'admin@admin.com',
    password: 'secret_'
}

const userReturnCall = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }

const validBodyLogin = {
    email: 'admin@admin.com',
    password: 'secret_admin',
  }

  const invalidEmailPasswordMess = {
    message: 'Invalid email or password'
  }

  const inválidfields = {
    message: 'All fields must be filled'
  }

export {
    noEmail,
    noPassword,
    invalidEmail,
    invalidpassword,
    userValid,
    validBodyLogin,
    validToken,
    userReturnCall,
    invalidEmailPasswordMess,
    userInvalid,
    inválidfields,
    token,
}
