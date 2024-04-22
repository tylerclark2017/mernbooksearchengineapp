const typeDefs = `
  type Book {
      authors: [String]
      description: String
      bookId: ID
      image: String
      link: String
      title: String
  }

  type User {
    username: String
    email: String
    savedBooks: [Book]
    bookCount: Int
  }

  input BookInput {
    authors: [String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String
  }

  type Authorization {
    token: String
    user: User
  }
  
  type Query {
      books: [Book]
      book(bookId: ID!): Book
      users: [User]
      user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Authorization
    addUser(username: String!, email: String!): User
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }

`

module.exports = typeDefs;