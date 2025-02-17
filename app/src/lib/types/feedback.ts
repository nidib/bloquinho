export const feedbackTypes = ['bug', 'feature'] as const;

export type FeedbackType = (typeof feedbackTypes)[number];
