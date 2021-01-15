import gql from 'graphql-tag'


const ALL_BOOKS = gql`
    query getAllBooks {
        allBooks {              # Cannot query field "allBooks" on type "Query" ???
            id
            title
            language
            numPages
            datePublished
            bestseller
            author {
                firstName
                lastName
            }
            publisher {
                company
            }
        }
    }
`

const ADD_BOOK = gql`
    mutation addBook($input: addBookInput!) {
        addBook (input: $input) {
            id
            title
            language
            numPages
            datePublished
            bestseller
            author{
                firstName
                lastName
                address {
                    state
                    city
                }
            }
            publisher {
                company
                address {
                    state
                    city
                }
            }
        }
    }
`
export {ALL_BOOKS, ADD_BOOK}