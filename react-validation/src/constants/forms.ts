export interface Field {
    name: string,
    placeholder: string
}

interface UserInfo {
    firstName: Field,
    lastName: Field,
    address: Field,
    phone: Field,
    email: Field
    checkbox: Field,
    [key: string]: any
}

export const USER_INFO: UserInfo = {
    firstName: {name: 'firstName', placeholder: 'First name'},
    lastName: {name: 'lastName', placeholder: 'Last name'},
    address: {name: 'address', placeholder: 'Address'},
    phone: {name: 'phone', placeholder: 'Phone'},
    email: {name: 'email', placeholder: 'Email'},
    checkbox: {name: 'checkbox', placeholder: 'Checkbox'},
};
