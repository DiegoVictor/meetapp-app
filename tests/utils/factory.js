import faker from 'faker';
import factory from 'factory-girl';

factory.define(
  'User',
  {},
  {
    name: faker.name.findName,
    email: faker.internet.email,
    password: faker.internet.password,
  }
);

factory.define(
  'Subscription',
  {},
  {
    id: faker.random.number,
    title: faker.name.title,
    localization: faker.address.streetAddress,
    date: () => faker.date.future().toISOString(),
    banner: {
      url: faker.image.imageUrl,
    },
    organizer: {
      name: faker.name.findName,
    },
  }
);

export default factory;
