const { ApolloServer, gql } = require('apollo-server');
const {
  exampleProducts,
  exampleCategories,
  exampleReviews,
} = require('./example-data');

// ID is type=String,
const typeDefs = gql`
  type Query {
    products: [Product!]!
    specificProduct(id: ID!): Product
    categories: [Category]!
    singleCategory(id: ID!): Category
  }
  type Product {
    id: ID!
    name: String
    description: String
    quantity: Int
    price: Float
    onSale: Boolean
    image: String
  }
  type Category {
    name: String!
    id: ID!
  }
`;

const resolvers = {
  Query: {
    products: () => exampleProducts.slice(0, 3),
    specificProduct: (parent, args, context) => {
      console.log(args);
      const { inputId } = args;
      const product = exampleProducts.find((item) => item.id === inputId);
      return product || null;
    },
    categories: (par, args, context) => exampleCategories,
    singleCategory: (par, args, context) => {
      const { inputId } = args;
      return exampleCategories.find((item) => item.id === inputId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server running on ${url}`));
