const typeDefs = `
type Book {
    authors: [String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String
},
type User {
username: String
email: String
savedBooks: [Book]
bookCount: Int
},
type Query {
    books: [Book]
    book(bookId: ID!): Book
    users: [User]
    user(username: String!): User
},
type Mutation {
    addUser(username: String!, email: String!): User
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }

  input BookInput {
    authors: [String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String
  }`

module.exports = typeDefs;