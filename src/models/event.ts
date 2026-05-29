export type EventVisibility = "public" | "private" | "news";

export type LocalEvent = {
  category: string;
  city: string;
  ctaLabel: string;
  dateLabel: string;
  description: string;
  host: string;
  id: string;
  location: string;
  slug: string;
  status: string;
  summary: string;
  tags: string[];
  timeLabel: string;
  title: string;
  visibility: EventVisibility;
};
