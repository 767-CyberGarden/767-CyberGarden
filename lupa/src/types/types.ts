export interface AxiosData<T> {
  data: T;
}

export type EventId = string;
export type EventCode = string;
export type QuizId = string;
export type QuestionId = string;

export interface CustomEvent {
  id: string;
  title: string;
  code: EventCode;
  ownerId: string;
  active: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  eventId: string;
}

export interface Question {
  id: string;
  text: string;
  quizId: QuizId;
}

export interface Answer {
  id: string;
  text: string;
  questionId: QuestionId;
  isRight: boolean;
}
