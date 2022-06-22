## API Documents

### Get [GET /user/{id}]

#### Table
* user

+ Parameters
    + id: 1 (number, required) - user ID

+ Request (application/json)

    + Headers

            Accept: application/json

+ Response 200 (application/json)

    + Attributes
        + datas (array, fixed-type)
            + (object)
                + id: 1 (number) - user.id
                + name: name (string) - user.name
                + email: email@email.com (string) - user.email

+ Response 404 (application/json)

    + Attributes
        + message: User Not Found (string) - Message when the user ID does not have
