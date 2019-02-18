import {base, getAllProfiles} from '../src/airtable';

describe('airtable', () => {
  it('fetch all profiles from airtable', async done => {
    const profiles = await getAllProfiles();
    done();
  });
});
