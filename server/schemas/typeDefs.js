const typeDefs = `
  type Book {
      authors: [String]
      description: String
      bookId: ID!
      image: String
      link: String
      title: String
  }

  type User {
    _id: ID!
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
    token: ID!
    user: User
  }
  
  type Query {
      me: User
  }

  type Mutation {
    login(email: String!, password: String!): Authorization
    addUser(username: String!, email: String!, password: String!): Authorization
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }

`

module.exports = typeDefs;