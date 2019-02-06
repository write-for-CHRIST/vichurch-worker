import hukk from 'hukk';
import {base, getAllProfiles} from './airtable';
import {prisma} from './prisma';

// Register new hook object
hukk.register({
  endpoint: '/webhook',
  handle: async data => {
    const {action} = data.body;
		console.log(`Receive action: ${action}`);
    switch (action) {
      case 'sync-profiles':
        console.log('Fetching profiles from AirTable...');
        const profiles = await getAllProfiles();
        console.log(`Resolved action: ${action}`);
        return profiles;
      default:
        return {message: 'not an action'};
    }
  },
});

const port = +process.env.PORT! || 5000;
hukk.listen(port, () => {
  console.log(`Hook server listening on port ${port}`);
});
