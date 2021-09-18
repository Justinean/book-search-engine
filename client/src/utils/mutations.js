import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
            _id
            username
            email
            bookCount
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
            _id
            username
            email
            bookCount
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($authors:[String], $bookId:ID, $title:String, $description:String, $image:String, $link:String) {
        saveBook(authors:$authors, bookId:$bookId, title:$title, description:$description, image:$image, link:$link) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                image
                description
                title
                link
            }
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId:ID) {
        removeBook(bookId:$bookId) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                image
                description
                title
                link
            }
        }
    }
`