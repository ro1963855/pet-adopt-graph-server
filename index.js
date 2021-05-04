const { ApolloServer, gql } = require('apollo-server')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Pet" type defines the queryable fields for every book in our data source.
  type Pet {
    id: ID!
    animalId: String!
    breed: Breed!
    coat: Coat!
    createTime: Float!
    acceptTime: Float!
    reason: String!
    adoption: Adoption!
    note: String!
    shelter: Shelter!
    type: Type!
    sex: Sex!
    picture: String!
  }

  type Shelter {
    id: ID!
    name: String!
    remark: String!
    address: String!
    link: String!
    phone: String!
  }

  type Type {
    id: ID!
    name: String!
  }

  type Breed {
    id: ID!
    name: String!
    remark: String!
  }

  type Coat {
    id: ID!
    name: String!
  }

  type Adoption {
    id: ID!
    name: String!
  }

  type Sex {
    id: ID!
    name: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "Pet" query returns an array of zero or more Books (defined above).
  type Query {
    pets: [Pet]
    pet(id: String!): Pet
  }
`

const pets = [
  {
    id: "205062",
    animalId: "AAAAG1100504001",
    breed: 219,
    coat: 188,
    createTime: 1620096901000,
    acceptTime: 1620057600000,
    adoption: 3,
    reason: "收容所轉入",
    note: "已絕育 肝臟問題持續投藥",
    shelter: "AAAAG",
    type: 1,
    sex: 1,
    picture: "https://asms.coa.gov.tw/AmlApp/Upload/pic/066e1639-e68d-4cd8-878b-1e957b74a06e_org.jpg",
  },
]

const shelters = [
  {
    id: "AAAAG",
    name: "新北市政府動物保護防疫處",
    remark: "星期一~星期五：08:00~12:00、13:30~17:30",
    link: "http://www.ahiqo.ntpc.gov.tw/",
    phone: "02-29596353",
    address: "新北市板橋區四川路一段157巷2號",
  },
]

const types = [
  {
    id: 1,
    name: "犬",
  },
]

const breeds = [
  {
    id: 219,
    name: "吉娃娃",
    remark: "醜美",
  },
]

const coats = [
  {
    id: 188,
    name: "黑白",
  },
]

const sexes = [
  {
    id: 1,
    name: "公",
  },
  {
    id: 2,
    name: "母",
  },
]

const adoptions = [
  {
    id: 3,
    name: "待認領",
  },
]

const resolvers = {
  Query: {
    pets: () => pets,
    pet(parent, args, context, info) {
      return pets.find(pet => pet.id === args.id)
    },
  },
  Pet: {
    breed: (parent) => {
      return breeds.find(breed => {
        return breed.id === parent.breed
      })
    },
    coat: (parent) => {
      return coats.find(coat => {
        return coat.id === parent.coat
      })
    },
    adoption: (parent) => {
      return adoptions.find(adoption => {
        return adoption.id === parent.adoption
      })
    },
    type: (parent) => {
      return types.find(type => {
        return type.id === parent.type
      })
    },
    sex: (parent) => {
      return sexes.find(sex => {
        return sex.id === parent.sex
      })
    },
    shelter: (parent) => {
      return shelters.find(shelter => {
        return shelter.id === parent.shelter
      })
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})