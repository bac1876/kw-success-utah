KW Success Website — Build Spec for Brian
From: Marcus Green, Operating Principal, KW Success Keller Williams Realty

Version: 1.0 FINAL · October 16, 2026 (updated per Marcus's review notes)

For: Brian (builder of the Monogram Network site), and the AI coding tools he uses

Old website: https://kwsuccessutah.kw.com/


0. How to use this document
This is the complete instruction set for building the new KW Success public website. It is written so it can be handed straight to an AI coding assistant (Claude Code, Cursor, etc.) together with the Monogram codebase.

Build method: reuse the Monogram Network site's structure, components and page patterns. Change the brand, palette, copy and content as described here.
Copy: use the copy in this document word for word. Anything marked [PLACEHOLDER] ships as a clearly labeled placeholder, or stays hidden behind a config flag where noted. Never invent testimonials, stats, names or awards.
Assets: everything referenced is in the shared Google Drive folder "KW Success Website – Assets." Marcus will share it with you.
Questions: send them to Marcus in one batch. Don't block on them; build with the placeholder and keep going.
[SHAWN REVIEW]: marks legal and compliance wording. Build it with the draft wording shown. Shawn will review it on the staging site, and final text will be supplied before launch.


1. Ownership and repository requirements (do these first)
Marcus must own all code, data and accounts for both Monogram and KW Success. Before any KW Success work starts:

GitHub: transfer the Monogram repo into a GitHub organization owned by Marcus (Marcus will create it and invite you). Keep the full commit history. You get maintainer/admin access as a collaborator.
KW Success code: lives in that same org. The preferred setup is the same repo with a second brokerage configuration (see §2).
Vercel: both sites deploy from a Vercel team owned by Marcus, with you as a member. Production domains are connected under Marcus's accounts.
Data and keys: any form inbox, database (Supabase is the AMPLIFai default), analytics or API key lives in an account Marcus owns.
List every environment variable name in README.md / .env.example, never the values.
Never commit secrets to the repo.
In writing: a short confirmation that the Monogram and KW Success code is work-for-hire owned by Marcus / AMPLIFai.
Documentation: README.md covers how to run locally, deploy, add a new brokerage config, and swap content.


2. Architecture: build it as a template
This site is the second instance of a product AMPLIFai will sell to other brokerages. Monogram is the first. Build it so brokerage #3 is a configuration job, not a rebuild.

One codebase, a config per brokerage: brokerages/monogram/… and brokerages/kw-success/… (or an equivalent pattern).
What lives in config or content files, not in components:
name, legal name, logos, colors, fonts, hero image, nav
copy blocks
stats
leadership people (name, title, email, phone, photo, bio)
"One Table" seats (service categories, each with optional providers flagged affiliated or not)
areas served
social links
disclosures
external links (home search, find an agent, KW account login)
feature flags (showTestimonials, showInsurancePartner, showClientLogin, etc.)
Content files: keep copy in Markdown/MDX or JSON so non-developers (or Claude) can edit it without touching components.
Feature flags: any section without real content yet is hidden by a flag rather than shipped with fake content.


3. Brand and design direction
3.1 The one-line difference from Monogram
Same layout and rhythm as Monogram, but light and inviting instead of dark, moody and luxury. Monogram is a dark living room with copper accents. KW Success is morning light on snow-capped Wasatch peaks.
3.2 Hero image
A wide, high-resolution photo of the snow-capped Wasatch mountains in Weber/Davis County, ideally overlooking Ogden Valley (Pineview area / Huntsville / Eden). It must not be Salt Lake City.

Treatment: bright, clear sky. Use only a light gradient overlay at the bottom so the white or charcoal text stays readable.
Sourcing: use a properly licensed stock image for now ([PLACEHOLDER]). Marcus may replace it with a commissioned photo. Keep the image path in config.
3.3 Brand rules (non-negotiable)
KW Success runs on the Keller Williams (KWRI) franchise brand guidelines:

Use the KW Success logo files exactly as provided. Never recolor, stretch, redraw or crowd them, and respect clear space.
Public name: "KW Success Keller Williams Realty." Never use "KWSCS" or the legal entity name in marketing copy (the legal name may appear in the footer only).
Mark approvals: Shawn Janke (Designated Broker) approves use of the KW marks and any exceptions.
Do not borrow from Monogram: its name, mark, three-peak logo, copper palette, dark/luxe treatment, or its stats and claims.
3.4 Palette
Sampled from the official KW Success logo files:

Token
Hex
Use
kw-red
#B40101
Accent only: primary buttons, small rules and eyebrows, active states. Use it sparingly, never as a large background.
charcoal
#4D4D4D
Body text, headings on light backgrounds
gray
#828282
Secondary text, captions
ink
#1F2326 (proposed)
The deepest text and footer background, if one dark band is wanted
snow
#FAFAF8 (proposed)
Page background
mist
#EEF2F5 (proposed)
Alternating section background, drawn from the sky tones
white
#FFFFFF
Cards


The proposed tokens are for Shawn to confirm against the KW brand standards.

Contrast: text must meet WCAG AA. Red text is only allowed at large sizes.
3.5 Typography
Use the KWRI-approved typefaces from the KW brand portal / KW Utah brand standards (ask Vincie Edwards, ASC, for the brand kit). If they can't be web-licensed in time, use a clean geometric sans for headings and a highly readable sans for body as a temporary fallback, marked for Shawn's approval.

Keep Monogram's typographic rhythm:

uppercase spaced eyebrows
large uppercase section headlines
generous whitespace

Drop Monogram's italic serif accents in favor of the KW-standard type.
3.6 Logo files (in Drive → Priority 2)
Variant
Files
Use
KW Success, full color
KW Success RGB/KellerWilliams_Realty_Success_Logo_RGB.png / .eps
Light backgrounds
KW Success, reversed
…RGB-rev.png / …rev-W.png
Dark bands, footer, over the hero photo
KW Success, grayscale
KW Success B&W/…GRY*.png / .eps
Single-color use
Unity Home Loans
Unity_Logo_Full_Color_Large.png, UHL Logo Square - Colored.png, UHL Logo Square - B&W.png
Partner sections
Amicus Title
Amicus Logo.png
Partner sections


Convert the EPS files to SVG for the web if possible. Otherwise use the high-res PNGs.


4. Site map
Route
Page
Monogram equivalent
Notes
/
Home
/
Section-by-section spec in §5
/agents
For Agents (Join KW Success)
/join + /careers
Primary audience. §6
/clients
Buy & Sell with KW Success
(new)
Secondary audience. §7
/about
Our Story & Leadership
/about
§8
/areas-served
Areas Served
/areas-served
Weber, Davis, Morgan. §9
/services/mortgage
Unity Home Loans
/services/mortgage
§10
/services/title
Amicus Title
/services/title
§10
/services/insurance
Insurance
/services/insurance
Hidden by flag showInsurancePartner=false; partner coming
/contact
Contact
/contact
§11
/login/agent
Agent Login
/login/agent
Placeholder for now. §12
(external)
Search Homes
search box
Links out to the current kw.com search (§5.7)


Drop from Monogram: /offices and /offices/* (KW Success is one office), /login/client and /home-services. Keep the routes in the template behind flags so other brokerages can use them.
Navigation
Utility bar: Join Our Team · Unity Home Loans · Amicus Title · Search Homes · Agent Login
Main nav: For Agents · Buy & Sell · About · Areas Served · Contact Us (button)
Keller Williams link: "Keller Williams Realty ▸" opens a small dropdown with links to kw.com and KW Utah (light link-through only)


5. Home page (section by section)
Follow the Monogram home page's order and layout, with the content below.
5.1 Hero
Background: the Ogden Valley mountain image (§3.2).
Logo: KW Success logo centered (reversed version if over a darker area of the photo).
Headline: You define Success. The relationship is how we get there.
Subhead: Since 1997, KW Success has helped agents build businesses and lives by design, and helped families across northern Utah find the home base for theirs.
Buttons (two doors):
I'm an Agent → /agents
I'm Buying or Selling → /clients
Corner caption: Serving Weber, Davis & Morgan Counties
5.2 "Everyone at One Table" (replaces Monogram's "Four Partners, One Table")
The idea: this section is about the relationship between the Trusted Advisor and the client, not about specific partner companies.

The advisor is the client's first point of contact for anything their home needs, for as long as they own it. They bring the right people to the table: lenders, title, insurance, inspectors, contractors, movers and every other vendor.
The companies at the table will change over time. There may be several lenders, and Unity or Amicus may be swapped out. No company names are hard-coded in this section.

Copy:

Eyebrow: CONNECTED HOMEOWNERSHIP
Headline: ONE TRUSTED ADVISOR. EVERYTHING YOUR HOME NEEDS.
Body: Before, during, and long after the closing, your KW Success Trusted Advisor is your first call for anything your home needs. Need a lender, an inspector, an insurance quote, a contractor or a great painter? Your advisor brings the right people to the table and stays at it with you for as long as you own your home.
Subhead: Everyone at one table.

Diagram: same visual pattern as Monogram, with more seats.

Center card: "Your KW Success Trusted Advisor & you." Caption: Your first call for anything your home needs.
Seat cards around the table show service categories, not companies:
Lending
Title & Escrow
Insurance
Inspections
Contractors & Repairs
Moving
Home Maintenance
Design & Remodel
Layout: desktop shows the seats around the center card. Mobile stacks them as a two-column grid under the center card.
Journey line under the diagram, as a simple horizontal timeline: Buying · Moving · Living · Maintaining · Growing · Selling · Beginning Again. Caption: Your advisor is with you for every chapter.

Build requirements:

Seats come from config: e.g. tableSeats: [{ category, icon, providers: [{ name, logo, url, affiliated }] }].
A category can have zero, one or several providers.
The list can be reordered, added to or trimmed without code changes.
v1 shows categories only. No provider logos in this section. Named providers (Unity Home Loans, Amicus Title) appear on their own partner pages (§10), in the utility bar and in the footer. The full vendor directory will live in the agent portal later.
Disclosure [SHAWN REVIEW]: show it automatically wherever any provider with affiliated: true is displayed by name (partner pages, footer, and this section if logos are ever turned on). Draft wording:

KW Success Keller Williams Realty and certain of its agents have an ownership interest in Unity Home Loans and Amicus Title, part of the same family of companies. You are not required to use any of these providers. [View our Affiliated Business Disclosure.]

Link the bracketed text to the disclosure page or PDF. Shawn supplies the final wording and file.
Compliance note for Shawn: if vendors are ever named in this section, confirm there are no paid placements or referral fees (RESPA Section 8) and that the vendor list is presented as a resource, not a requirement.
5.3 The Success Idea (replaces "A Home Is More Than a Transaction")
Eyebrow: WHY SUCCESS?
Headline: SUCCESS IS MORE THAN A TRANSACTION.
Body: It's easy to hear "success" in real estate and think more transactions and more money. We believe success is personal. Every agent and every client defines it differently, and our job is to help each of them write their own success story.
Two-column split (new; replaces Monogram's infinity loop):
For our agents: Real estate is a way to build the life you want. Maybe success means picking your kids up from school. Owning your calendar. Your first investment property, or an investment club with friends. We help you build the business that funds your version of success.
For our clients: Everyone sleeps somewhere. But a home isn't a hotel. It's home base for living out your dreams: raising your family, being close to the right school, coming home at night and finally sitting down. Your journey to success includes a home, and we help you find the right one.
Visual: a simple line diagram of the chain:

KW Success invests in agents → Agents invest in clients → Everyone builds success by design.
5.4 The Three Pillars (replaces "The Meaning of the Mark")
Eyebrow: HOW WE HELP YOU GROW
Headline: THREE PILLARS. ONE LIFE BY DESIGN.
Layout: Monogram's I / II / III list style, with light mountain line-art accents (not Monogram's peak mark). Put a two-tab toggle above the list: For Agents | For Clients.
Default tab: For Agents.
Separate content: each tab shows its own three pillars; agent and client copy are never mixed.
Reuse: the /agents page shows only the agent pillars, and /clients shows only the client pillars.
Config: keep all copy in config.

For Agents

I. Grow Your Business.

We're committed, and built, to help you do more than grow your business. We help you leverage it. Coaching that meets you where you are, proven models that bring clarity, and AI tools that take work off your plate, all so your business creates more opportunity and more freedom for the life you want.

II. Grow the Person.

Behind every great agent is a great human being committed to growth. We invest in who you're becoming, not just what you produce: sharpening your skills, building your confidence, and helping you grow as a leader, a spouse, a parent and a professional.

III. Grow Long-Term Wealth.

Income is only the beginning. We help you increase your gross commission income, protect your net income, and then sit down with you to strategize how to grow your net worth, so the business you build today becomes wealth that lasts.

For Clients

I. Make Your House a Home.

Finding the right home takes more than a search. KW Success equips and coaches our agents to be trusted advisors, so you have a partner who understands what you're building and helps you find the home that fits it.

II. Build Stronger Communities.

We don't just sell homes here; we live here too. We actively serve and invest in the communities where you live, raise your family and go to work, because a great home deserves a great place around it.

III. Grow Long-Term Wealth.

Your home is one of your most important investments. We take an active approach to helping you protect and grow its value, and we're committed to helping Utah remain a great place to live for generations to come.
5.5 Our Promise
Eyebrow: OUR PROMISE
Headline: WE DON'T JUST HELP YOU CLOSE. WE HELP YOU BUILD.
Body: We help agents become trusted advisors, not just another agent. Those advisors walk with their clients long after the closing table. Your goals equal our goals.
Timeline line (same style as Monogram's "2010 —∞"):
Label: 1997 ———— today
Caption: Nearly three decades of success stories.
5.6 Stats band
Stat
Label
20,000+
Homes closed since 1997
$6 Billion+
In real estate
Since 1997
Serving Weber, Davis & Morgan


Best of State badge [SHAWN REVIEW], under the stats: "Keller Williams Utah · Utah Best of State, Real Estate Services · 8-time winner (2018–2026)."
This award belongs to the Keller Williams Realty – Utah Region. It must never read as KW Success's own award.
Do not use the word "consecutive."
Data note: stats live in config. They are draft figures pending Marcus's verification of 1997–2011 numbers.
5.7 Home search
Eyebrow: WHEN YOU'RE READY
Headline: FIND THE HOME BASE FOR YOUR NEXT CHAPTER.
Search box: same Buy/Sell/Rent tabs, location, price and beds fields as Monogram.
v1 behavior: "Begin Your Search" opens the current KW Success kw.com search in a new tab: https://kwsuccessutah.kw.com/search/sale.
Pass the location text as a query parameter if the kw.com URL supports it. Otherwise just link.
Sell tab: goes to /contact?topic=selling.
Later: Marcus is choosing a long-term IDX route. Build search as a swappable component so a real IDX/RESO feed can drop in later.
5.8 Testimonials (hidden until real)
Flag: showTestimonials=false until real quotes are collected with permission.
Do not ship sample or invented testimonials.
Layout: same as Monogram's carousel, with two sets: client quotes and agent quotes.
5.9 Closing CTA
Headline: YOUR SUCCESS STORY STARTS WITH ONE CONVERSATION.
Buttons: Talk to Our Team → /contact · Join KW Success → /agents


6. For Agents (/agents)
Primary audience. Model it on Monogram's /join and /careers.
6.1 Hero
Headline: BUILD A BUSINESS THAT FUNDS YOUR LIFE BY DESIGN.
Subhead: Where agents are loved, coached and AI-empowered to grow their business, their personal development and their wealth.
6.2 Why KW Success (four promises)
Show as four cards:

A culture that loves you as a person. "We Love Our Agents" isn't a slogan; it's an operating standard.
A clear growth path. Production, mindset and wealth, with coaching at every stage.
AI tools you can actually use. Done-for-you, not just talked about.
A tribe of like-minded agents. Hungry, humble and growth-minded people who want you to win.
6.3 What makes us different
Show as four comparison lines:

Selective, not a bulk recruiter. We'd rather grow the right people than collect licenses.
Community-first, not virtual. A real office, real people, real relationships in Layton.
We build and deploy AI, not just talk about it.
Agent care is a standard, not an afterthought.
6.4 Become a Trusted Advisor
Clients don't need another agent. They need someone they trust with one of the biggest decisions of their life. We help you become that advisor, and give you the tools, coaching and partners to stay with your clients for life.
6.5 What every agent gets
Agents choose KW Success for our leadership, our energy, our support, our office and our education. Show these as a grid of tiles, one line each:

Leadership that invests in you. Russie and our leadership team coach, lead and support every agent, at every stage.
A real home base. Office space in Layton, built for meetings, closings and collaboration.
Energy and community. A culture that celebrates wins, shows up for each other and loves its agents.
Ongoing education. Weekly training on production, mindset and the latest AI tools.
Suki. Your AI broker assistant, with answers on demand.
Your personal Brand DNA. Clarity on your own value proposition.
Agent Concierge. Marketing support when you need it.
Hands-on tech training. One-on-one help with every system.
The KW Success agent portal (coming soon). Every tool, link and resource in one spot.

For new agents: Launch productivity coaching. A structured program that takes you from your first day to your first closings and beyond.

Keep the copy factual and tool-forward. Show what each item does in one line, with no hype.
6.6 Find your path
Three columns:

New to real estate. Launch coaching from day one.
Growing producer. Coaching, systems and leverage to break through.
Top producer. Leadership, leverage and team-building support.
6.7 Agent stories
Hidden until real (showAgentStories=false).
6.8 CTA: Talk to Russie
Headline: HAVE A CONVERSATION ABOUT YOUR NEXT CHAPTER.
Body: Book a confidential conversation with Russie Edwards, our Team Leader.
Form fields: name, email, phone, current brokerage (optional), years licensed, message.
Routing: see §11.

No economics anywhere on the public site: no splits, caps or fees.


7. Buy & Sell (/clients)
Secondary audience. Start lighter; this will grow.

Hero:
Headline: YOUR JOURNEY TO SUCCESS INCLUDES A HOME.
Subhead: A KW Success trusted advisor helps you find the home base for the life you're building.
Three Pillars in client terms: reuse the §5.4 client lines.
Why a KW Success agent: better equipped, current on the market, coached, and local. Four short cards.
Everyone at One Table: the §5.2 Trusted Advisor diagram again (categories only, config-driven).
Buttons:
Search Homes → the kw.com search link
Find an Agent → the KW Success agent roster on kw.com (Marcus to confirm the URL)
Talk to Us → /contact

[SHAWN REVIEW] Fair housing: consumer copy must never describe neighborhoods, schools or people in ways that steer. Describe homes and services, not who lives somewhere.


8. About (/about)
Model it on Monogram's /about.
8.1 Hero
Headline: OUR STORY.
Subhead: Locally led since 1997. Backed by Keller Williams.
8.2 What we believe
Mission: To love, develop, and empower real estate agents to grow their business, elevate their personal development, and build long-term wealth within a community that truly cares about them.
Vision: To be the most supportive, innovative, and growth-centered real estate community in Utah, where caring culture meets cutting-edge tools to help agents build a business and a life by design.
Core values: Care & Connection · Growth Mindset · Innovation With Purpose · Community & Collaboration · Integrity & Responsibility
Values line (small, quiet): God. Family. Then Business.
8.3 Timeline
First entry: "1997 · KW Success opens in Layton."
Other milestones: [PLACEHOLDER]. Keep the timeline in config, like Monogram's.
8.4 Leadership team
Grid of cards with photo, name, title, a short bio (expandable), and email/phone.

Photos: use the "KW Background" headshot for everyone who has one, so the grid is consistent.
Order: follow the table below.

#
Name
Title
Email
Phone
Photo file (Priority 1/Headshots)
1
Marcus Green
Operating Principal
marcus@kwutah.com
801.643.3870
Marcus Green  Headshot KW Background.jpg
2
Russie Edwards
General Manager / Team Leader
russie@unitedagentservices.biz
801.710.5075
Russie 2026 KW Background.jpg
3
Shawn Janke
Designated Broker
shawnj@unitedagentservices.biz
801.540.3447
Shawn Janke 2026 KW Background.jpg
4
Chris Bradford
Market Center Administrator
chrisb@unitedagentservices.biz
801.647.2047
Chris Bradford Headshot KW Background 2026.jpg
5
Alyson Brown
Productivity Coach
[PLACEHOLDER]
[PLACEHOLDER]
Alyson Brown Headshot KW Background.jpg
6
Vincie Edwards
Agent Services Coordinator
ascsuccess@unitedagentservices.biz
801.866.1925
Vincie Edwards Headshot KW Background 2026.png
7
Kaileigh Hall
Director of Agent Commissions
commissions@unitedagentservices.biz
(480) 862-3189
Kaileigh Hall Headshot.png
8
Bradley Green
Market Center Tech Trainer
bradley@unitedagentservices.biz
385.405.4082
Bradley Green  Headshot KW Background.jpg
9
Xenia Alsup
Director of First Impressions
dfisuccess@unitedagentservices.biz
801.866.1905
Xenia Alsup Headshot.jpg


Photo notes:

Kaileigh's and Xenia's photos aren't on the KW background. Crop all photos to the same aspect ratio and framing so the grid still looks consistent.
Compress every headshot for the web (≤ 300 KB, WebP).

Bios: these are the supplied bios, lightly edited.

Marcus Green: Marcus Green is an entrepreneur, investor, leadership coach, and lifelong student of what it means to live an extraordinary life. A Utah native with more than 25 years in real estate, Marcus has been involved in thousands of transactions and has built, owned, and partnered in companies across real estate, investing, property management, lending, title, and coaching. He hosts The Whole Enchilada Podcast, exploring what it takes to succeed not just in business, but in life. Marcus will tell you his most important roles are husband and father to four daughters. He's an adventurer, world traveler, and outdoor enthusiast, passionate about helping people close the gap between who they are today and who they're capable of becoming.
Russie Edwards: With 19 years of real estate experience, including 10 in leadership, Russie Edwards brings knowledge, passion, and heart to her role as Team Leader at KW Success. She is dedicated to helping agents discover their potential, build confidence, overcome challenges, and grow successful businesses through coaching, collaboration, and a belief in what they can achieve. Known for her authentic leadership, positive energy, and genuine care for people, Russie finds her greatest fulfillment in helping others succeed personally and professionally. Outside of real estate, she enjoys time with her husband, their three children, and their dog.
Shawn Janke: Shawn Janke is an award-winning broker and licensed contractor serving Utah's Wasatch Front, with more than 30 years as a licensed real estate professional. A past Realtor of the Year and Lifetime Achievement Award recipient, Shawn combines real estate expertise with hands-on construction knowledge to help buyers, sellers, and investors reach their goals. He is a proud father of four, father-in-law to a wonderful son-in-law, and grandfather to an adorable grandson. Outside of work, he loves skiing, boating, riding motorcycles, and time with his family.
Chris Bradford: Chris brings over 30 years of financial and business experience and an MBA to his role as Market Center Administrator, including 25 years in corporate retail as a Financial Planning Director and Buyer and the past 7 years with Keller Williams. He takes pride in the numbers, but believes the people behind them are what truly matter. Born in Texas, Chris went to high school and college in Utah, built his career in Kansas and Ohio, and spent seven years in Latin America, experiences that shaped his appreciation for different people, cultures, and perspectives. His greatest joy is time with his three sons and their families, especially his grandchildren, and getting outdoors for life's adventures, big and small.
Alyson Brown: [PLACEHOLDER: bio coming]
Vincie Edwards: Vincie spent 19 years in retail management, including roles in Human Resources and as a Store Director, before making an exciting career change to real estate. As Agent Services Coordinator at KW Success, she loves learning the industry and being part of a great team. Outside of work, she enjoys family, friends, her chocolate lab Lucy, traveling (especially to the beach), reading, and her newest hobby: baking all things sourdough.
Kaileigh Hall: Kaileigh has been in the real estate industry since 2013 and brings that experience to her role as Director of Agent Commissions. She processes closing packets and makes sure commission payments land accurately in agents' accounts, and she takes pride in making the closing process as smooth and efficient as possible for every agent. Outside of work, she enjoys time with her family and expressing her creativity through crafting.
Bradley Green: [PLACEHOLDER: bio coming]
Xenia Alsup: With 8 years in real estate, Xenia is passionate about building meaningful connections, strengthening community, and creating an environment where people feel supported, inspired, and equipped to achieve more. She believes in lifelong growth, embracing every season of life as a chance to learn and become a better version of herself, and encouraging others to do the same. Beyond work, she loves the outdoors, adventure, great food, and making memories with her children, the greatest joys of her life.
8.5 Community
Headline: GIVING BACK WHERE WE LIVE.
Copy: KW Success Cares, KW Cares, RED Day and group service projects.
Photos: [PLACEHOLDER] (event photos coming).
8.6 Backed by Keller Williams
One short paragraph on KW's training, technology and network, with a link to kw.com. Keep it light; KW Success is the hero of the page.
8.7 CTA
Find Your Agent · Join KW Success


9. Areas Served (/areas-served)
Copy Monogram's page pattern: the interactive map with dots per town, hover by county, and a list by county.

Headline: ROOTED IN LAYTON. SERVING NORTHERN UTAH.
Office: 1572 N Woodland Park Dr., Suite 500, Layton, UT 84041
Counties and communities:
Davis County: Bountiful, Centerville, Clearfield, Clinton, Farmington, Fruit Heights, Kaysville, Layton, North Salt Lake, South Weber, Sunset, Syracuse, West Bountiful, West Point, Woods Cross
Weber County: Eden, Farr West, Harrisville, Hooper, Huntsville, Liberty, Marriott-Slaterville, North Ogden, Ogden, Plain City, Pleasant View, Riverdale, Roy, South Ogden, Uintah, Washington Terrace, West Haven
Morgan County: Morgan, Mountain Green, Croydon
Town dots: link each dot to the kw.com search for that town where possible.
Fair housing [SHAWN REVIEW]: list towns only. No descriptions of neighborhoods or demographics.


10. Partner pages (/services/mortgage, /services/title)
Use Monogram's service-page pattern with a logo, a short intro, "why it matters at the table," and a contact button.

Unity Home Loans (lending): logo plus 2–3 sentences. Marcus/Unity to supply final copy [PLACEHOLDER].
Amicus Title (title & escrow): logo plus 2–3 sentences. Marcus/Amicus to supply final copy [PLACEHOLDER].
Each page shows the Affiliated Business Disclosure in full [SHAWN REVIEW]:
It includes the required statement, in capitals: "YOU ARE NOT REQUIRED TO USE THE LISTED PROVIDER(S)…"
Shawn supplies the approved text.


11. Contact and forms
Contact page: office address, main office phone [PLACEHOLDER: Marcus to confirm], office hours [PLACEHOLDER], map embed, and a general form.
Form topics: I'm an agent · Buying · Selling · General.
Routing:
Agent inquiries → Russie
Buying/Selling → front desk (dfisuccess@)
General → front desk
Data ownership:
Store every submission in a database Marcus owns (Supabase), as well as sending the email.
Add spam protection.
No passwords or credentials are ever collected.


12. Agent Login (/login/agent)
A placeholder for now, like Monogram's. The full portal is being designed separately.

Headline: Agent Login.
Body: Your KW Success agent portal is on its way: every tool, link, AI assistant and resource you need to run your business, in one spot.
Interim quick links (configurable list):
KW Command
utahrealestate.com (MLS)
Suki
Canva
Thinkific
Note for the build: the portal will be a separate app behind authentication. Leave a clean route for it, and do not build auth now.


13. Footer
KW Success logo (reversed) with the line "You define Success. The relationship is how we get there."
Columns:
Explore: For Agents · Buy & Sell · About · Areas Served · Contact
Family of Companies: Unity Home Loans · Amicus Title
Connect: Facebook · Instagram · Google Reviews
Social links:
Facebook: https://www.facebook.com/profile.php?id=100093128351645
Instagram: https://www.instagram.com/kwsuccess_utah/
Google Reviews: https://share.google/AqzDgvHM8kC33DFGq
Legal line [SHAWN REVIEW]: © 2026 KW Success Keller Williams Realty · 1572 N Woodland Park Dr., Suite 500, Layton, UT 84041 · Each Keller Williams office is independently owned and operated · Equal Housing Opportunity · REALTOR®
Add any brokerage-license or advertising wording required by Utah rules (Shawn to confirm).
Privacy · Terms · Affiliated Business Disclosure · Accessibility


14. Technical and quality checklist (definition of done)
Mobile-first and fully responsive: test at 375px, 768px and 1440px.
Performance: Lighthouse ≥ 90 for Performance, Accessibility, Best Practices and SEO on mobile. Hero image served as responsive WebP/AVIF; headshots ≤ 300 KB.
Accessibility: WCAG 2.1 AA, alt text on every image, keyboard navigation, visible focus states.
SEO:
Unique titles and meta descriptions per page.
Open Graph images.
sitemap.xml and robots.txt.
LocalBusiness / RealEstateAgent structured data with the office address.
Analytics: GA4 or Plausible, in Marcus's account.
Links: no broken links. All external links open in a new tab.
Placeholders:
Every [PLACEHOLDER] is visibly labeled on the staging site.
Flagged sections (testimonials, agent stories, insurance) are hidden.
A CONTENT-TODO.md lists every open placeholder.
Staging first: deploy to a Vercel preview URL for Marcus's review before any domain change. The domain and kw.com redirect plan is Marcus's decision.


15. Open items (being gathered; build around them)
Hero photo (licensed stock for now)
Alyson Brown: bio, email, phone
Bradley Green: bio
Office and event/community photos
Agent stories and client testimonials (with permission)
History milestones for the timeline
Main office phone and hours
Unity and Amicus page copy, and the final Affiliated Business Disclosure (Shawn)
KWRI-approved web fonts and the brand kit (Vincie / Shawn)
Find-an-Agent roster URL on kw.com
Domain and kw.com redirect plan
Verified 1997–2011 production numbers (the stats are draft until then)


16. What we need back from you
Confirmation of the GitHub and Vercel ownership transfer (§1).
Your plan for the brokerage-config architecture (§2), before you build.
A rough timeline: staging home page first, then the remaining pages.
One batch of questions, if any.
