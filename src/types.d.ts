export type Job = {
  title: string;
  company: string;
  companyImg?: string;
  location: string;
  postedDate: string;
  jobUrl: string;
  salary?: string;
  companyProfileUrl?: string;
};

export enum CommandType {
  START = '/start',
  HELP = '/help',
  CHANNEL = '/channel',
  INFO = '/info',
}