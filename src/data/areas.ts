/**
 * Areas Served (round two — Maria / Pete).
 *
 * "Even though our offices are only in the western suburbs… show all of the
 * towns, villages, cities that are served in the Chicagoland metro area."
 * A list rather than a map for now: it is indexable by search engines and AI
 * crawlers, which was the stated reason for the page. Every name below is a
 * DRAFT for the client to trim or extend — nothing here is confirmed yet.
 * Grouped by county so the list reads as coverage, not a ranking.
 */

export interface AreaGroup {
  county: string;
  note?: string;
  communities: string[];
}

export const AREA_GROUPS: AreaGroup[] = [
  {
    county: "DuPage County",
    note: "Home to KW Experience and KW Premiere Properties",
    communities: [
      "Addison", "Bensenville", "Bloomingdale", "Carol Stream", "Clarendon Hills",
      "Darien", "Downers Grove", "Elmhurst", "Glen Ellyn", "Glendale Heights",
      "Hinsdale", "Itasca", "Lisle", "Lombard", "Naperville", "Oak Brook",
      "Oakbrook Terrace", "Roselle", "Villa Park", "Warrenville", "West Chicago",
      "Westmont", "Wheaton", "Willowbrook", "Winfield", "Wood Dale", "Woodridge",
    ],
  },
  {
    county: "Kane County",
    note: "Home to KW Innovate",
    communities: [
      "Aurora", "Batavia", "Campton Hills", "Carpentersville", "Elburn", "Elgin",
      "Geneva", "Gilberts", "Hampshire", "Maple Park", "Montgomery",
      "North Aurora", "Pingree Grove", "South Elgin", "St. Charles", "Sugar Grove",
    ],
  },
  {
    county: "Will County",
    note: "Home to KW Infinity",
    communities: [
      "Bolingbrook", "Channahon", "Crest Hill", "Frankfort", "Homer Glen", "Joliet",
      "Lockport", "Manhattan", "Minooka", "Mokena", "New Lenox", "Plainfield",
      "Romeoville", "Shorewood", "Tinley Park", "Wilmington",
    ],
  },
  {
    county: "Kendall County",
    communities: [
      "Boulder Hill", "Bristol", "Newark", "Oswego", "Plano", "Sandwich", "Yorkville",
    ],
  },
  {
    county: "Grundy County",
    communities: ["Coal City", "Diamond", "Morris"],
  },
  {
    county: "Cook County — West & Southwest",
    communities: [
      "Berwyn", "Brookfield", "Burr Ridge", "Cicero", "Countryside", "Elmwood Park",
      "Forest Park", "Franklin Park", "Hodgkins", "Indian Head Park", "La Grange",
      "La Grange Park", "Lyons", "Melrose Park", "North Riverside", "Northlake",
      "Oak Park", "Orland Park", "Palos Heights", "Palos Park", "River Forest",
      "Riverside", "Schaumburg", "Western Springs", "Westchester",
    ],
  },
  {
    county: "Cook County — Chicago",
    communities: ["Chicago"],
  },
  {
    county: "Lake County",
    communities: [
      "Buffalo Grove", "Deerfield", "Grayslake", "Gurnee", "Highland Park",
      "Lake Forest", "Lake Zurich", "Libertyville", "Lincolnshire", "Mundelein",
      "Vernon Hills", "Waukegan",
    ],
  },
  {
    county: "McHenry County",
    communities: [
      "Algonquin", "Cary", "Crystal Lake", "Huntley", "Lake in the Hills",
      "McHenry", "Woodstock",
    ],
  },
];

export const AREA_COUNT = AREA_GROUPS.reduce(
  (n, g) => n + g.communities.length,
  0
);
