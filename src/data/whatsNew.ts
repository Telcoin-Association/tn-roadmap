import { getLatestDeveloperNotesDate } from './developerNotes';
import { getNewInUpdateItems, type CustomRoadToMainnetItem } from './milestones';

export type WhatsNew = {
  date: string;
  milestones: CustomRoadToMainnetItem[];
};

export const getWhatsNew = (): WhatsNew => {
  const date = getLatestDeveloperNotesDate();
  return {
    date,
    milestones: getNewInUpdateItems(date),
  };
};
