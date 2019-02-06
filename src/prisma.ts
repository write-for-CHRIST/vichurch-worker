import {prisma, ProfileCreateInput} from '@write-for-christ/vichurch-model';
import {Profile} from './model';

/**
 * Sync profile from source
 */
const syncProfile = async (record: Profile) => {
  try {
    const profile: ProfileCreateInput = {
      oldId: record.oldId,
      firstName: record.firstName,
      lastName: record.lastName,
      gender: record.gender,
    };
    const result = await prisma.upsertProfile({
      where: {oldId: record.oldId},
      create: profile,
      update: profile,
    });
    return result;
  } catch (err) {
    throw new Error(
      `Could not sync profile: ${record.lastName} ${record.firstName} ${
        err.code
      }: ${err.message}`,
    );
  }
};

export {prisma};
