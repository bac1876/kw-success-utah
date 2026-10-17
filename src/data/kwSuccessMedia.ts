export interface OfficePhotoItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  caption: string;
}

export interface CultureStoryItem {
  id: string;
  category:
    | "Awards Breakfast"
    | "Team Meetings"
    | "Cookies with Santa"
    | "Trunk or Treat"
    | "Office Parties";
  title: string;
  subtitle: string;
  image: string;
  year: string;
}

export interface SupportStaffMember {
  name: string;
  title: string;
  email: string;
  phone: string;
}

export const OFFICE_TOUR_PHOTOS: OfficePhotoItem[] = [
  {
    id: "reception",
    title: "Market Center Reception & Welcome Desk",
    tag: "Lobby · Suite 505",
    image: "/kw-success/office/office-reception.jpg",
    caption:
      "Our Layton Market Center front desk where clients, partners, and agents are welcomed every day.",
  },
  {
    id: "boardroom",
    title: "Executive Closing & Strategy Boardroom",
    tag: "One Table Suite",
    image: "/kw-success/office/office-boardroom.jpg",
    caption:
      "Where buyers, sellers, advisors, Unity Home Loans, and Amicus Title come together around one table.",
  },
  {
    id: "training",
    title: "Training Center & KW Success Cappers Wall",
    tag: "Education Hub",
    image: "/kw-success/office/office-training.jpg",
    caption:
      "Home to weekly team meetings, contract masterminds, tech labs, and our wall of KW Success Cappers.",
  },
  {
    id: "onward",
    title: "ONWARD Collaborative Agent Studio",
    tag: "Agent Workspace",
    image: "/kw-success/office/office-onward.jpg",
    caption:
      "Dedicated drop-in workstations and collaborative desks built for high-producing Northern Utah agents.",
  },
  {
    id: "conference",
    title: "Client Consultation & Coaching Suite",
    tag: "Private Consultation",
    image: "/kw-success/office/office-conference.jpg",
    caption:
      "Private consultation room featuring years of KW Success regional and national production awards.",
  },
  {
    id: "lounge",
    title: "Agent Welcome Lounge & KW NOW Hub",
    tag: "Community Lounge",
    image: "/kw-success/office/office-lounge.jpg",
    caption:
      "Our agent lounge celebrating new roster additions, BOLD graduations, and upcoming Market Center events.",
  },
];

export const CULTURE_STORIES: CultureStoryItem[] = [
  {
    id: "awards-platinum",
    category: "Awards Breakfast",
    title: "Platinum Medallion & Luxury Top Performer",
    subtitle: "Celebrating excellence on the KW Success red carpet",
    image: "/kw-success/stories/awards-platinum.jpg",
    year: "Awards Breakfast",
  },
  {
    id: "meeting-cultural-icon",
    category: "Team Meetings",
    title: "KW Success Cultural Icon Recognition",
    subtitle:
      "Shawn Janke & Russie Edwards honoring leadership and heart in our Market Center",
    image: "/kw-success/stories/meeting-cultural-icon.jpg",
    year: "Team Meeting",
  },
  {
    id: "santa-family",
    category: "Cookies with Santa",
    title: "Cookies with Santa at the Market Center",
    subtitle:
      "Welcoming clients, kids, and grandchildren for holiday photos and treats",
    image: "/kw-success/stories/santa-family.jpg",
    year: "2025 Holiday Event",
  },
  {
    id: "trunk-coco",
    category: "Trunk or Treat",
    title: "Annual Trunk or Treat Community Festival",
    subtitle:
      "Creative themed trunks, costumes, and family fun in our Layton parking lot",
    image: "/kw-success/stories/trunk-coco.jpg",
    year: "Fall 2025",
  },
  {
    id: "awards-gold",
    category: "Awards Breakfast",
    title: "Gold Medallion Production Honoree",
    subtitle:
      "Recognizing consistency, client care, and top Wasatch Front production",
    image: "/kw-success/stories/awards-gold.jpg",
    year: "Awards Breakfast",
  },
  {
    id: "meeting-training",
    category: "Team Meetings",
    title: "Where Entrepreneurs Thrive — Weekly Mastermind",
    subtitle:
      "Agents collaborating on Northern Utah market trends and business growth",
    image: "/kw-success/stories/meeting-training.jpg",
    year: "Layton Market Center",
  },
  {
    id: "party-christmas",
    category: "Office Parties",
    title: "Annual Holiday Celebration & Team Trivia",
    subtitle:
      "Festive sweaters, laughter, and celebrating a landmark year together",
    image: "/kw-success/stories/party-christmas.jpg",
    year: "Office Celebration",
  },
  {
    id: "meeting-gary-keller",
    category: "Team Meetings",
    title: "Gary Keller Production Award Presentation",
    subtitle:
      "Honoring rapid business growth, MORE Club qualification, and servant leadership",
    image: "/kw-success/stories/meeting-gary-keller.jpg",
    year: "Team Meeting",
  },
  {
    id: "awards-team",
    category: "Awards Breakfast",
    title: "Top Producing Team & Luxury Recognition",
    subtitle: "Celebrating high-performing teams across Weber, Davis & Morgan",
    image: "/kw-success/stories/awards-team.jpg",
    year: "Awards Breakfast",
  },
  {
    id: "santa-grinch-lounge",
    category: "Cookies with Santa",
    title: "Holiday Smiles With the Grinch",
    subtitle: "Agents and families making memories in the KW Success lounge",
    image: "/kw-success/stories/santa-grinch-lounge.jpg",
    year: "2025 Holiday Event",
  },
  {
    id: "trunk-open-house",
    category: "Trunk or Treat",
    title: "Neighborhood Outreach & Fall Treats",
    subtitle:
      "Connecting with hundreds of Davis and Weber County families every October",
    image: "/kw-success/stories/trunk-open-house.jpg",
    year: "Fall 2025",
  },
  {
    id: "meeting-panel",
    category: "Team Meetings",
    title: "KW Utah Regional Roadshow Leadership Panel",
    subtitle:
      "Team Leader Russie Edwards sharing growth strategies across the Utah Region",
    image: "/kw-success/stories/meeting-panel.jpg",
    year: "Regional Roadshow",
  },
  {
    id: "awards-bronze",
    category: "Awards Breakfast",
    title: "Bronze Medallion Award Winner",
    subtitle: "Honoring milestone production at the annual Awards Breakfast",
    image: "/kw-success/stories/awards-bronze.jpg",
    year: "Awards Breakfast",
  },
  {
    id: "party-halloween",
    category: "Office Parties",
    title: "Market Center Halloween Costume Contest",
    subtitle:
      "High-energy culture where we work hard and celebrate every season together",
    image: "/kw-success/stories/party-halloween.jpg",
    year: "Office Celebration",
  },
];

export const SUPPORT_STAFF: SupportStaffMember[] = [
  {
    name: "Gladys Agtuca",
    title: "Executive Assistant to Marcus Green",
    email: "gladysa@unitedagentservices.biz",
    phone: "203.504.9321",
  },
  {
    name: "Maureen Co",
    title: "Compliance Coordinator",
    email: "success@execassist.me",
    phone: "801.475.9900",
  },
  {
    name: "Ely Cabatin",
    title: "Virtual Assistant for Agent Services",
    email: "vaas@unitedagentservices.biz",
    phone: "801.475.9900",
  },
  {
    name: "Carlo Serote",
    title: "Receptionist",
    email: "reception@unitedagentservices.biz",
    phone: "801.475.9900",
  },
];
