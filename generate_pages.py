"""Generate lib/securefront-pages.json from the pSEO Excel plan.

Reads "pSEO - securefrontrepair.com.xlsx" (columns: #, Page Title, Page Slug,
Primary Keyword, Target Area, CTA Strategy) and emits the same SeoPage shape the
pitcleaningpros.com template expects, with derived SEO fields filled in.
"""
import json
import os

import openpyxl

HERE = os.path.dirname(os.path.abspath(__file__))
XLSX = os.path.join(HERE, "pSEO - securefrontrepair.com.xlsx")
OUT = os.path.join(HERE, "lib", "securefront-pages.json")

PHONE = "1-888-903-1607"

PILLARS = {
    "/commercial-door-repair": ("commercial door repair", "Commercial Door Repair"),
    "/storefront-glass-replacement": ("storefront glass replacement", "Storefront Glass Replacement"),
    "/graffiti-vandalism-cleanup": ("graffiti & vandalism cleanup", "Graffiti & Vandalism Cleanup"),
}

EMERGENCIES = {
    "/emergency-board-up": ("emergency board up", "Emergency Board-Up"),
    "/emergency-commercial-door-repair": ("emergency commercial door repair", "Emergency Commercial Door Repair"),
    "/emergency-storefront-glass-replacement": ("emergency glass replacement", "Emergency Storefront Glass Replacement"),
    "/emergency-vandalism-cleanup": ("emergency vandalism cleanup", "Emergency Vandalism & Graffiti Cleanup"),
}

# Approx 2021 census populations used to scale per-city search volume.
CITY_POP = {
    "Toronto": 2790000, "Ottawa": 1020000, "Mississauga": 718000, "Brampton": 656000,
    "Hamilton": 569000, "London": 422000, "Markham": 338000, "Vaughan": 323000,
    "Kitchener": 257000, "Windsor": 229000, "Burlington": 186000, "Oshawa": 172000,
    "Barrie": 147000, "Calgary": 1310000, "Edmonton": 1010000, "Red Deer": 100000,
    "Lethbridge": 98000, "Vancouver": 662000, "Surrey": 568000, "Burnaby": 249000,
    "Richmond": 210000, "Abbotsford": 153000, "Coquitlam": 148000, "Kelowna": 144000,
    "Victoria": 92000, "Winnipeg": 749000, "Montreal": 1760000, "Quebec City": 542000,
    "Laval": 438000, "Gatineau": 292000, "Longueuil": 254000, "Saint John": 69000,
    "Moncton": 79000, "Fredericton": 64000, "St. John's": 111000, "Halifax": 439000,
    "Charlottetown": 38000, "Saskatoon": 267000, "Regina": 226000,
}


def city_pop(city: str) -> int:
    return CITY_POP.get(city, 40000)


def city_volume(pop: int) -> str:
    if pop >= 1_000_000:
        return "90.0"
    if pop >= 500_000:
        return "60.0"
    if pop >= 250_000:
        return "40.0"
    if pop >= 100_000:
        return "25.0"
    return "15.0"


def city_difficulty(pop: int) -> str:
    if pop >= 1_000_000:
        return "31.0"
    if pop >= 500_000:
        return "24.0"
    if pop >= 250_000:
        return "18.0"
    if pop >= 100_000:
        return "12.0"
    return "8.0"


def secondary_for(page_type: str, keyword: str, base: str, city: str) -> str:
    if page_type == "Service Pillar":
        return f"{keyword} near me, {keyword} services, {keyword} company, 24 hour {keyword}"
    if page_type == "Emergency Landing":
        # Drop the redundant "emergency " prefix for the hour/urgency variants.
        plain = keyword.removeprefix("emergency ").strip()
        return f"{keyword} near me, 24 hour {plain}, urgent {plain}, same day {plain}"
    if page_type == "Service Page":  # near-me pages
        plain = keyword.replace(" near me", "").strip()
        return f"{keyword}, {plain} services, {plain} company, local {plain} contractor"
    # City Service Page: the primary keyword already ends with the city name.
    return (
        f"{keyword}, {base} services {city}, {base} company {city}, "
        f"24 hour {base} {city}"
    )


def main():
    wb = openpyxl.load_workbook(XLSX, data_only=True)
    ws = wb["Sheet1"]
    rows = list(ws.iter_rows(values_only=True))

    pages = []
    for r in rows[2:]:
        if r[0] is None:
            continue
        num = str(r[0]).strip()
        if not num.replace(".", "").replace("-", "").replace(" ", "").isdigit():
            continue
        title = (r[1] or "").strip()
        slug = (r[2] or "").strip()
        keyword = (r[3] or "").strip()
        target = (r[4] or "").strip()
        cta = (r[5] or "").strip() or f"Call {PHONE}"

        if slug in PILLARS:
            page_type = "Service Pillar"
            base, _short = PILLARS[slug]
        elif slug in EMERGENCIES:
            page_type = "Emergency Landing"
            base, _short = EMERGENCIES[slug]
        elif slug.endswith("-near-me"):
            page_type = "Service Page"
            base = keyword.replace(" near me", "").strip()
        else:
            page_type = "City Service Page"
            city = target.split(",")[0].strip()
            family = next((s for s in PILLARS if slug.startswith(s)), slug)
            base = PILLARS[family][0] if family in PILLARS else slug.replace("-", " ")

        if page_type == "City Service Page":
            city = target.split(",")[0].strip()
            pop = city_pop(city)
            volume = city_volume(pop)
            difficulty = city_difficulty(pop)
            cpc = "150.0"
            priority = "Medium"
            search_intent = "Local Transactional"
        elif page_type == "Service Pillar":
            if slug == "/commercial-door-repair":
                volume, difficulty, cpc = "1000.0", "30.0", "150.0"
            elif slug == "/storefront-glass-replacement":
                volume, difficulty, cpc = "700.0", "24.0", "200.0"
            else:
                volume, difficulty, cpc = "500.0", "18.0", "120.0"
            priority = "Top Priority"
            search_intent = "Local Commercial"
        elif page_type == "Emergency Landing":
            volume, difficulty, cpc = "90.0", "6.0", "250.0"
            priority = "High"
            search_intent = "Local Transactional"
        else:  # near-me
            volume, difficulty, cpc = "320.0", "10.0", "140.0"
            priority = "High"
            search_intent = "Local Commercial"

        pages.append(
            {
                "id": slug,
                "pageTitle": title,
                "pageSlug": slug,
                "primaryKeyword": keyword,
                "secondaryKeywords": secondary_for(page_type, keyword, base, city if page_type == "City Service Page" else ""),
                "targetArea": target,
                "pageType": page_type,
                "searchIntent": search_intent,
                "volumePerMonth": volume,
                "keywordDifficulty": difficulty,
                "cpc": cpc,
                "priority": priority,
                "ctaStrategy": cta,
            }
        )

    with open(OUT, "w") as fh:
        json.dump(pages, fh, indent=2)
        fh.write("\n")

    by_type = {}
    for p in pages:
        by_type.setdefault(p["pageType"], 0)
        by_type[p["pageType"]] += 1
    print(f"Wrote {len(pages)} pages -> {OUT}")
    for t, n in by_type.items():
        print(f"  {t}: {n}")


if __name__ == "__main__":
    main()
