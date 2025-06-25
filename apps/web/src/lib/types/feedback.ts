export const feedbackTypes = ['bug', 'feature', 'feedback'] as const;

export type FeedbackType = (typeof feedbackTypes)[number];
