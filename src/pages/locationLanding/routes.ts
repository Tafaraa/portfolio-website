// Route paths only, deliberately free of any page copy.
//
// App.tsx is part of the eagerly-loaded entry chunk, so anything it imports
// ships to every visitor. Importing the route list from pageData.ts pulled
// all 54 pages of landing text into that chunk; this module keeps the paths
// separate so the copy stays in the lazy locationLanding chunk.
// Every landing route the app serves. The router and the build-time prerender
// step both read this list, so a route can never exist in one and not the other.
export const LANDING_ROUTES = [
  '/best-software-developer-midrand',
  '/best-software-developer-johannesburg',
  '/best-software-developer-zimbabwe',
  '/software-developer-gauteng',
  '/software-developer-pretoria',
  '/software-developer-cape-town',
  '/software-developer-durban',
  '/software-developer-usa',
  '/software-developer-europe',
  '/software-developer-uae',
  '/software-developer-saudi-arabia',
  '/software-developer-qatar',
  '/software-developer-mauritius',
  '/software-developer-botswana',
  '/software-developer-namibia',
  '/remote-software-developer',
  '/hire-remote-fullstack-developer',
  '/remote-react-developer-usa',
  '/remote-developer-south-africa',
  '/remote-data-scientist-south-africa',
  '/react-developer-south-africa',
  '/fullstack-developer-south-africa',
  '/data-scientist-south-africa',
  '/ai-engineer',
  '/data-engineer',
  '/website-creation-services',
  '/freelance-developer',
  '/hire-ai-engineer',
  '/hire-data-engineer',
  '/react-developer',
  '/python-developer',
  '/machine-learning-engineer',
  '/software-engineer',
  '/data-scientist',
  '/ai-consultant',
  '/ai-workflow-automation',
  '/ai-automation-for-business',
  '/ai-chatbot-developer',
  '/llm-engineer',
  '/get-your-business-online',
  '/ecommerce-website-developer',
  '/small-business-website',
  // Plain-English IT help. These target how non-technical people actually
  // search ("my email is not working", "best IT specialist", "fix my
  // spreadsheet") rather than job titles.
  '/it-support-for-small-business',
  '/best-it-specialist',
  '/it-specialist-johannesburg',
  '/it-support-midrand',
  '/computer-help-for-small-business',
  '/fix-email-problems',
  '/business-email-setup',
  '/emails-going-to-spam',
  '/excel-spreadsheet-help',
  '/google-sheets-automation',
  '/move-from-spreadsheets-to-a-system',
  '/replace-spreadsheets-with-software'
] as const;
