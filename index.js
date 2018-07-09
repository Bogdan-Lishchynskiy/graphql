const { ApolloServer, gql } = require('apollo-server');


const playlists = [
    {title:'Playlist 2016', genre:'pop' , id:'1'},
    {title:'Playlist 1991', genre:'rock', id:'2'},
    {title:'Playlist 2007', genre:'rap', id:'3'}

]

const tracks = [
    {name:'Dont cry', band:'Eminem', id:'1', playlist: '1'},
    {name:'Girls like you', band:'Maroon 5', id:'2',  playlist: '2'},
    {name:'Diamonds', band:'Rihanna', id:'3',  playlist: '3'},
    {name:'Last Resort', band:'Papa Roach', id:'4',  playlist: '1'},
    {name:'We Are the Champions', band:'Queen', id:'5' ,playlist: '1'}
    

]

const typeDefs = gql`
  type Playlist {
      title:String!,
      genre:String!,
      id:ID!,
      tracks: [Track!]!
  }

  type Track {
      name:String!,
      band:String!,
      id:ID!,
      playlist: Playlist!
  }
  type Query {
    playlists (id:ID!): Playlist,
    tracks (id:ID!): Track
  }
  type Mutation {
    createPlaylist(title:String!, genre:String!, id:ID!, tracks:[Track!]):Playlist!,
    createTrack(name:String!, band:String!, id:ID!, playlist: Playlist!):Track!,
  }

`;


const resolvers = {
  Query: {
    playlists(root, args) {
        return  playlists.find(play=>play.id === args.id);
    },
    tracks(root, args) {
        return  tracks.find(track=>track.id === args.id);
    }
  },


  Mutation: {
    createPlaylist: (root, args) => {
        const newPlaylist = { title: args.title, genre: args.genre, id: args.id };
        playlists.push(newPlaylist);
        return newPlaylist;
    },

    createTrack: (root, args) =>{
        const newTrack = { name: args.name, band:args.band, id: args.id };
        tracks.push(newTrack);
        return newTrack;
    }

    }
};


const server = new ApolloServer({ typeDefs, resolvers });


// Server ready at http://localhost:4000/
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});