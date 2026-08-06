// Real, publicly documented facts about each Canadian municipality the site serves.
// Population figures reflect the 2021 Statistics Canada census and are presented as
// approximations. The "setting" and "climate" notes are written to add genuine local
// texture to each city page instead of interchangeable boilerplate, and they lean on
// details that actually matter to commercial property response work (retail districts,
// freeze-thaw, wind and storm exposure, tagging hotspots).
export type CityFact = {
  population: string;
  neighbourhood: string;
  landmark: string;
  climate: string;
  region: string;
};

export const CITY_FACTS: Record<string, CityFact> = {
  // Ontario
  Toronto: {
    population: "approximately 2.79 million residents",
    neighbourhood: "the downtown core and the Yonge–Bloor retail spine",
    landmark: "the CN Tower and Lake Ontario",
    climate: "a humid continental climate where freeze-thaw swings and winter storms test doors, glass and storefront seals",
    region: "the City of Toronto",
  },
  Ottawa: {
    population: "approximately 1.02 million residents",
    neighbourhood: "the ByWard Market and the downtown commercial core",
    landmark: "Parliament Hill and the Rideau Canal",
    climate: "a cold continental climate with deep frost and heavy snow that strain automatic doors and storefront glass",
    region: "the National Capital Region",
  },
  Mississauga: {
    population: "approximately 718,000 residents",
    neighbourhood: "Square One and Port Credit",
    landmark: "the Absolute World towers",
    climate: "a lake-moderated climate with lake-effect snow squalls that test door and glass installations",
    region: "the Regional Municipality of Peel",
  },
  Brampton: {
    population: "approximately 656,000 residents",
    neighbourhood: "the downtown core and the Queen Street retail corridor",
    landmark: "the Rose Theatre and Gage Park",
    climate: "a humid continental climate with heavy lake-effect snow that keeps door and glass crews busy",
    region: "the Regional Municipality of Peel",
  },
  Hamilton: {
    population: "approximately 569,000 residents",
    neighbourhood: "the downtown core and the industrial bayfront",
    landmark: "the Niagara Escarpment and Dundurn Castle",
    climate: "an escarpment climate with strong winds off the harbour that batter storefront glass",
    region: "the Hamilton area",
  },
  London: {
    population: "approximately 422,000 residents",
    neighbourhood: "downtown Richmond Row and the Wellington corridor",
    landmark: "Victoria Park and the forks of the Thames",
    climate: "a humid continental climate where severe thunderstorms and winter ice test commercial doors and glass",
    region: "southwestern Ontario",
  },
  Markham: {
    population: "approximately 338,000 residents",
    neighbourhood: "Unionville and the Markham Town Centre",
    landmark: "the historic Main Street Unionville",
    climate: "a lake-affected climate with winter snow and ice that keeps commercial door repairs steady",
    region: "York Region",
  },
  Vaughan: {
    population: "approximately 323,000 residents",
    neighbourhood: "the Vaughan Mills retail district and Woodbridge",
    landmark: "Vaughan Mills and Canada's Wonderland",
    climate: "a snow-belt climate north of Toronto where heavy lake-effect snow burdens doors and glass",
    region: "York Region",
  },
  Kitchener: {
    population: "approximately 257,000 residents",
    neighbourhood: "downtown Kitchener and the Belmont Village",
    landmark: "the Kitchener City Hall and Victoria Park",
    climate: "a continental climate with freeze-thaw cycles that seize automatic doors",
    region: "the Region of Waterloo",
  },
  Windsor: {
    population: "approximately 229,000 residents",
    neighbourhood: "downtown Ouellette Avenue and Walkerville",
    landmark: "the Ambassador Bridge and the Detroit River",
    climate: "a mild, humid climate where summer storms and lake winds challenge storefront glass",
    region: "southwestern Ontario",
  },
  Burlington: {
    population: "approximately 186,000 residents",
    neighbourhood: "the downtown lakeshore and the Plains Road corridor",
    landmark: "the Burlington waterfront and the Royal Botanical Gardens",
    climate: "a lake-moderated climate with strong shore winds that strain awnings, doors and glass",
    region: "Halton Region",
  },
  Oshawa: {
    population: "approximately 172,000 residents",
    neighbourhood: "downtown King Street and the north end",
    landmark: "the Oshawa waterfront and Parkwood Estate",
    climate: "a lake-moderated climate with winter lake-effect snow that keeps door and glass crews booked",
    region: "the Regional Municipality of Durham",
  },
  Barrie: {
    population: "approximately 147,000 residents",
    neighbourhood: "the downtown waterfront and the Mapleview corridor",
    landmark: "the Kempenfelt Bay waterfront",
    climate: "a snow-belt climate on Lake Simcoe where heavy lake-effect snow and ice stress doors and glass",
    region: "Simcoe County",
  },
  // Alberta
  Calgary: {
    population: "approximately 1.31 million residents",
    neighbourhood: "the Beltline and the 17th Avenue retail strip",
    landmark: "the Calgary Tower and the Bow River",
    climate: "a dry prairie climate with chinook swings and hail storms that shatter storefront glass",
    region: "the Calgary Metropolitan Region",
  },
  Edmonton: {
    population: "approximately 1.01 million residents",
    neighbourhood: "Whyte Avenue and the downtown core",
    landmark: "the North Saskatchewan River valley",
    climate: "a cold continental climate with long winters and deep frost that strain doors and glass seals",
    region: "the Edmonton Metropolitan Region",
  },
  "Red Deer": {
    population: "approximately 100,000 residents",
    neighbourhood: "the downtown core and the south end",
    landmark: "the Red Deer River and Bower Ponds",
    climate: "a prairie climate with harsh winters and chinook temperature swings that affect door hardware",
    region: "central Alberta",
  },
  Lethbridge: {
    population: "approximately 98,000 residents",
    neighbourhood: "the downtown core and the west side",
    landmark: "the High Level Bridge over the Oldman River",
    climate: "a dry, windy prairie climate where high winds and hail test storefront glass",
    region: "southern Alberta",
  },
  // British Columbia
  Vancouver: {
    population: "approximately 662,000 residents",
    neighbourhood: "Gastown, Yaletown and the downtown retail core",
    landmark: "Stanley Park and the harbour",
    climate: "a temperate coastal climate where heavy winter rain and windstorms stress glass and doors",
    region: "Metro Vancouver",
  },
  Surrey: {
    population: "approximately 568,000 residents",
    neighbourhood: "Guildford and Whalley's commercial core",
    landmark: "the Historic Stewart Farm and Green Timbers",
    climate: "a mild coastal climate with winter windstorms that keep emergency glass crews busy",
    region: "Metro Vancouver",
  },
  Burnaby: {
    population: "approximately 249,000 residents",
    neighbourhood: "Metrotown and Brentwood",
    landmark: "Burnaby Mountain and Deer Lake",
    climate: "a mild coastal climate with dense retail corridors that keep door and glass maintenance steady",
    region: "Metro Vancouver",
  },
  Richmond: {
    population: "approximately 210,000 residents",
    neighbourhood: "the Lansdowne and Aberdeen retail districts",
    landmark: "the Richmond Night Market and the Steveston waterfront",
    climate: "a coastal climate on the Fraser delta where winter winds and rain test storefront glass",
    region: "Metro Vancouver",
  },
  Abbotsford: {
    population: "approximately 153,000 residents",
    neighbourhood: "the downtown core and Clearbrook",
    landmark: "Sumas Mountain and the surrounding farmland",
    climate: "a wet Fraser Valley climate with windstorms and heavy rain that challenge doors and glass",
    region: "the Fraser Valley Regional District",
  },
  Coquitlam: {
    population: "approximately 148,000 residents",
    neighbourhood: "Coquitlam Centre and Maillardville",
    landmark: "the Coquitlam River and Mundy Park",
    climate: "a rainy coastal climate on sloping ground where winter storms batter exposed storefronts",
    region: "Metro Vancouver",
  },
  Kelowna: {
    population: "approximately 144,000 residents",
    neighbourhood: "downtown Kelowna and the Rutland commercial strip",
    landmark: "Okanagan Lake and the wine country hills",
    climate: "a dry interior climate with hot summers and freeze-thaw winters that stress door and glass seals",
    region: "the Central Okanagan",
  },
  Victoria: {
    population: "approximately 92,000 residents",
    neighbourhood: "the Inner Harbour and downtown Government Street",
    landmark: "the BC Legislature and Beacon Hill Park",
    climate: "a mild coastal climate with strong winter storms off the Strait that test storefront glass",
    region: "the Capital Regional District",
  },
  // Manitoba
  Winnipeg: {
    population: "approximately 749,000 residents",
    neighbourhood: "downtown Portage Avenue and Osborne Village",
    landmark: "the Forks and the Esplanade Riel",
    climate: "a cold prairie climate with extreme winter frost and heavy snow that strain commercial doors and glass",
    region: "the Winnipeg Metropolitan Region",
  },
  // Quebec
  Montreal: {
    population: "approximately 1.76 million residents",
    neighbourhood: "downtown Sainte-Catherine Street and the Plateau",
    landmark: "Mount Royal and the Old Port",
    climate: "a humid continental climate with heavy winter snow and freeze-thaw cycles that test doors and glass",
    region: "Greater Montreal",
  },
  "Quebec City": {
    population: "approximately 542,000 residents",
    neighbourhood: "the Vieux-Québec and the Saint-Roch commercial district",
    landmark: "Château Frontenac and the Plains of Abraham",
    climate: "a cold continental climate with heavy winter snowfall and freeze-thaw that challenges storefronts",
    region: "the Capitale-Nationale",
  },
  Laval: {
    population: "approximately 438,000 residents",
    neighbourhood: "the Carrefour Laval retail district and the Vimont corridor",
    landmark: "the Centropolis and the Rivière des Prairies",
    climate: "a cold Montreal-region climate where winter snow loads test doors and canopies",
    region: "Greater Montreal",
  },
  Gatineau: {
    population: "approximately 292,000 residents",
    neighbourhood: "the downtown core and the Plateau district",
    landmark: "the Canadian Museum of History and the Gatineau Hills",
    climate: "a cold Ottawa-region climate with heavy winter snow and freeze-thaw that strains doors and glass",
    region: "the Outaouais",
  },
  Longueuil: {
    population: "approximately 254,000 residents",
    neighbourhood: "the Place Longueuil retail core and Vieux-Longueuil",
    landmark: "the Parc de la Cité and the Saint Lawrence shoreline",
    climate: "a cold Quebec climate with humid summers and freeze-thaw winters that test storefront glass",
    region: "Greater Montreal",
  },
  // New Brunswick
  "Saint John": {
    population: "approximately 69,000 residents",
    neighbourhood: "the uptown King Street commercial district",
    landmark: "the Reversing Falls and the historic uptown",
    climate: "a coastal climate with nor'easter windstorms and heavy winter snow that test doors and glass",
    region: "southern New Brunswick",
  },
  Moncton: {
    population: "approximately 79,000 residents",
    neighbourhood: "the downtown core and the Mountain Road corridor",
    landmark: "Magnetic Hill and the Petitcodiac River",
    climate: "a humid continental climate with nor'easter storms and freeze-thaw that keep glass crews booked",
    region: "southeastern New Brunswick",
  },
  Fredericton: {
    population: "approximately 64,000 residents",
    neighbourhood: "the downtown Queen Street core and the north side",
    landmark: "Christ Church Cathedral and the Saint John River",
    climate: "a continental climate with cold winters and freeze-thaw swings that stress door hardware",
    region: "central New Brunswick",
  },
  // Newfoundland and Labrador
  "St. John's": {
    population: "approximately 111,000 residents",
    neighbourhood: "downtown Water Street and the Churchill Square area",
    landmark: "Signal Hill and the harbour",
    climate: "a foggy, windy Atlantic climate where nor'easter storms and salt air test doors and glass",
    region: "the Avalon Peninsula",
  },
  // Nova Scotia
  Halifax: {
    population: "approximately 439,000 residents",
    neighbourhood: "downtown Spring Garden Road and the waterfront",
    landmark: "the Halifax Citadel and the harbour",
    climate: "a coastal Atlantic climate with nor'easters, heavy snow and salt spray that challenge storefront glass and doors",
    region: "the Halifax Regional Municipality",
  },
  // Prince Edward Island
  Charlottetown: {
    population: "approximately 38,000 residents",
    neighbourhood: "the downtown Queen Street core and the waterfront",
    landmark: "the Confederation Centre and the historic waterfront",
    climate: "a maritime climate with nor'easter winds and winter snow that test commercial doors and glass",
    region: "Prince Edward Island",
  },
  // Saskatchewan
  Saskatoon: {
    population: "approximately 267,000 residents",
    neighbourhood: "downtown 2nd Avenue and Broadway",
    landmark: "the Meewasin Valley and the South Saskatchewan River",
    climate: "a dry prairie climate with extreme winter cold that strains door hardware and glass seals",
    region: "central Saskatchewan",
  },
  Regina: {
    population: "approximately 226,000 residents",
    neighbourhood: "the downtown Scarth Street core and the Cathedral district",
    landmark: "the Legislative Building and Wascana Lake",
    climate: "a dry prairie climate with severe winter cold and freeze-thaw swings that test doors and glass",
    region: "southern Saskatchewan",
  },
};

export function cityFacts(city: string): CityFact {
  return (
    CITY_FACTS[city] || {
      population: "a growing local population",
      neighbourhood: "the main commercial district",
      landmark: "the downtown core",
      climate: "a Canadian climate with seasonal swings that affect doors, glass and storefronts",
      region: "the surrounding region",
    }
  );
}
