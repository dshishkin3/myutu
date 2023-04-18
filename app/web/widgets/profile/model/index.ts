// hook form types
export type FeedbackFormValues = {
  time: string;
  description: string;
};

export type EditFormValues = {
  name: string;
  surname: string;
  patronymicName: string;
};

// different types
export type SettingsForm = {
  userId: string;
  login: string;
  phoneNumber: string;
};

export type FeedbackForm = {
  login: string;
  time: string;
  date: string;
  description: string;
  steps: {};
};

export type IEditOptions = {
  value: string;
  label: string;
};

export type EditForm = {
  name: string;
  surname: string;
  patronymicName: string;
  gender: string;
  dateOfBirth: string;
  userId: string;
};
