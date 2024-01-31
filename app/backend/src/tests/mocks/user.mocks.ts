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

const invalidEmail = {
    email: 'using.user.paranaue',
    password: 'secret_admin'
}

const userValid = {
    id: 1,
    username: 'User',
    email: 'admin@admin.com',
    password: 'secret_admin'
}

const validBodyLogin = {
    email: 'admin@admin.com',
    password: 'secret_admin',
  }

export {
    noEmail,
    noPassword,
    invalidEmail,
    invalidpassword,
    userValid,
    validBodyLogin
}
