
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';


export function partyFactory(rest = {}) {
  return {
                            nameparty: faker.datatype.string(255),
                    partylocation: faker.datatype.string(255),
              numberofpeople: faker.datatype.number({"min":-2147483647,"max":2147483646}),
              isstatus: sample(["Public","Draft","Close","Private"]),
              admin_id: faker.datatype.number({}),
              describe: faker.datatype.string(255),
              requiredage: faker.datatype.number({"min":-2147483647,"max":2147483646}),
                ...rest,
  };
}
export function partybookingFactory(rest = {}) {
  return {
                            user_id: faker.datatype.number({}),
              party_id: faker.datatype.number({}),
              status: sample(["Approve","Reject","Unvalue"]),
          ...rest,
  };
}
export function userFactory(rest = {}) {
  return {
                            isactive: sample([true, false]),
              username: faker.datatype.string(255),
                                email: faker.internet.email(),
                                                                                                          ...rest,
  };
}
export function adminFactory(rest = {}) {
  return {
                            name: faker.datatype.string(255),
                    email: faker.internet.email(),
                                                                                                                ...rest,
  };
}
