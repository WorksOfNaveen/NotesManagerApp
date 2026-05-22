export interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
}

export type RootStackParamList = {
  Home: undefined;
  Editor: { noteId?: string } | undefined;
  Delete: undefined;
};
