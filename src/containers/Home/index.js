import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {ADD_BOOK, ALL_BOOKS} from './graphql'

const Home = () => {

    const {loading: allBooksLoading, error: allBooksError, data: allBooksData} = useQuery(ALL_BOOKS)
    if (allBooksError) {
        console.log(allBooksError)
        throw new Error('books query failed')
        
    }

    const [addBook, { loading: addBookLoading, error: addBookError }] = useMutation(ADD_BOOK, {
        update: (client, { allBooksData }) => {
            try {
                const temp = client.readQuery({ query: ALL_BOOKS })
                temp.allBooks = [...temp.allBooks, allBooksData.addBook]
                client.writeQuery({ query: ALL_BOOKS, temp})
            } catch(error) {
                throw new Error('failed to update') //in case adding fails (?)
            }
        },
        variables: {
            input: {
                title: "Cool Book",
                language: "all",
                numPages: "999",
                datePublished: "2050-1-1",
                bestseller: true,
                authorId: "b337bb8b-5fde-47cb-9b5f-d6c999ddbb24",
                publisherId: "79a65ee9-b043-4c35-baa5-c98a4964b95d"
            }
        }
    })
    if(addBookError) {
        console.log(addBookError)
        throw new Error('query failed')
    }
    console.log(allBooksData)

    return(
        <>
            <button onClick={addBook}>Add a cool book :)</button>
            {allBooksLoading || addBookLoading? 'Loading...': allBooksData.allBooks.map(book => (
                <p>{book.title}, {book.numPages}, {book.language}, {book.author.lastName}</p>
            ))}
            
        </>
    )

}



export default Home
