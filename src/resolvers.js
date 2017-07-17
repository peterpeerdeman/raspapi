const lights = [{
  id: 1,
  name: 'soccer',
  status: true,
}, {
  id: 2,
  name: 'baseball',
  status: false,
}];
export const resolvers = {
  Query: {
    lights: () => {
      return lights;
    },
  },
};
