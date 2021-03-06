import { Poetry } from 'src/state/poetry/types';
import { StateType } from 'typesafe-actions';
import { reciteCollectionsReducer } from './reducer';
import { RecitesActions } from './actions';

export type Collection = {
  id: number;
  name: string;
  poetries: Poetry[];
  isFinished: boolean;
};

export type ReciteCollectionsReducer = {
  collections: Collection[];
  loading: boolean;
  error: boolean;
  openAddCollectionDialog: boolean;
  openFinishReciteDialog: boolean;
  selectedReciteCollection?: Collection;
  isCollectionEdit: boolean;
};
export type ReciteCollectionRootAction = RecitesActions;

export type ReciteCollectionRootState = StateType<typeof reciteCollectionsReducer>;
