import { faker } from '@faker-js/faker';
import factory from 'factory-girl';

factory.define(
  'User',
  {},
  {
    name: faker.person.findName,
    email: faker.internet.email,
    password: faker.internet.password,
  }
);

factory.define(
  'Subscription',
  {},
  {
    id: faker.string.uuid,
    title: faker.person.jobTitle,
    localization: faker.location.streetAddress,
    date: () => faker.date.future().toISOString(),
    banner: () => {
      return {
        url: faker.image.url(),
      };
    },
    organizer: () => {
      return {
        name: faker.person.fullName(),
      };
    },
  }
);

export { factory };
