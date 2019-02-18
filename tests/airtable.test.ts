import {base, getAllProfiles} from '../src/airtable';

describe('airtable', () => {
  it('fetch all profiles from airtable', async done => {
    try {
      const profiles = await getAllProfiles();
      console.log(profiles);
      done();
    } catch (err) {}
  });
});
