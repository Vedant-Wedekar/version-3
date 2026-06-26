// Famous Andaman destinations shown as pins on the interactive map.
// `x` and `y` are percentage positions on the map canvas (0–100).
// Each island carries a 3-chapter `story` used by the /islands/:id page.
// TODO: replace images with the client's real photos.

export const ISLANDS = [
  {
    id: "diglipur",
    name: "Diglipur",
    tagline: "The northern wonder",
    description:
      "Home to the highest peak (Saddle Peak), turtle nesting beaches, and limestone caves.",
    x: 58,
    y: 10,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    highlights: ["Ross & Smith Islands", "Saddle Peak", "Turtle Nesting"],
    story: {
      facts: {
        bestTime: "October – March",
        knownFor: "Ross & Smith twin islands",
        gettingThere: "12h scenic road trip or overnight ferry from Port Blair",
      },
      chapters: [
        {
          title: "Where the islands touch the sky",
          text: "At 732 metres, Saddle Peak is the highest point in the entire archipelago. The trek winds through dense evergreen forest where almost every sound you hear belongs to a bird found nowhere else on earth.",
          image:
            "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=900&q=80",
        },
        {
          title: "Two islands, one sandbar",
          text: "Ross and Smith are twin islands joined by a ribbon of white sand that appears at low tide. Walk from one island to the other with turquoise water on both sides — it feels like crossing a bridge the ocean built just for you.",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
        },
        {
          title: "Nights that belong to the turtles",
          text: "Between December and February, Kalipur Beach hosts something extraordinary: four species of sea turtles nesting on the same shore. Watch hatchlings race to the waves under a sky packed with stars.",
          image:
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
        },
      ],
    },
  },
  {
    id: "mayabunder",
    name: "Mayabunder",
    tagline: "Untouched mangrove gateway",
    description:
      "A quiet town in North Andaman with mangrove creeks, Karmatang Beach, and tribal heritage at Karen settlements.",
    x: 56,
    y: 22,
    image:
      "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80",
    highlights: ["Karmatang Beach", "Avis Island", "Mangrove Tours"],
    story: {
      facts: {
        bestTime: "November – April",
        knownFor: "Karen heritage & untouched beaches",
        gettingThere: "9h road journey on the Andaman Trunk Road",
      },
      chapters: [
        {
          title: "The town time forgot",
          text: "Mayabunder moves at the pace of its tides. Fishing boats drift home at dusk, and the streets of Webi village echo with the language of the Karen community, who arrived from Burma a century ago and never left.",
          image:
            "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=900&q=80",
        },
        {
          title: "Karmatang, the turtle beach",
          text: "A long, empty sweep of golden sand where olive ridley turtles come ashore to nest. Most days you will share the entire beach with nothing but hermit crabs and the sound of the surf.",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
        },
        {
          title: "Paddling the green labyrinth",
          text: "The mangrove creeks around Avis Island form a maze of glassy channels. Glide through tunnels of roots where kingfishers flash overhead — this is the Andamans at their most secret.",
          image:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80",
        },
      ],
    },
  },
  {
    id: "long-island",
    name: "Long Island",
    tagline: "Offbeat & pristine",
    description:
      "Untouched white-sand beaches and dense forest, perfect for adventurers.",
    x: 64,
    y: 32,
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=600&q=80",
    highlights: ["Lalaji Bay", "Merk Bay", "Trekking"],
    story: {
      facts: {
        bestTime: "November – April",
        knownFor: "No roads, no crowds",
        gettingThere: "Ferry from Rangat or Port Blair (limited sailings)",
      },
      chapters: [
        {
          title: "An island with no roads",
          text: "There are no cars on Long Island. Painted blue arrows on tree trunks guide you between the jetty, the village, and the beaches. Your luggage travels by handcart; you travel by foot.",
          image:
            "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=900&q=80",
        },
        {
          title: "The trek to Lalaji Bay",
          text: "An hour's walk through rainforest and betel plantations ends at a perfect crescent of white sand with not a single building in sight. Travellers who make it here describe it the same way: like having the world to yourself.",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
        },
        {
          title: "Merk Bay's vanishing sandbar",
          text: "A short boat ride away, Merk Bay reveals a dazzling sandspit at low tide, surrounded by water so clear the boats look like they are floating on air.",
          image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
        },
      ],
    },
  },
  {
    id: "rangat",
    name: "Rangat",
    tagline: "Hidden coastal charm",
    description:
      "A peaceful Middle Andaman destination with secluded beaches, turtle nesting at Cuthbert Bay, and dense rainforest.",
    x: 54,
    y: 38,
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80",
    highlights: ["Cuthbert Bay", "Amkunj Beach", "Moricedera Beach"],
    story: {
      facts: {
        bestTime: "December – February for turtle season",
        knownFor: "Dhani Nallah mangrove walkway",
        gettingThere: "6h drive from Port Blair via the Trunk Road",
      },
      chapters: [
        {
          title: "The walkway through the mangroves",
          text: "Dhani Nallah is one of the longest mangrove boardwalks in India — 700 metres of winding wooden path through a forest that breathes with the tide, ending at a turtle nesting beach.",
          image:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80",
        },
        {
          title: "Cuthbert Bay after dark",
          text: "On winter nights, olive ridley turtles haul themselves up Cuthbert Bay to lay their eggs. Standing quietly in the dark while a creature older than the dinosaurs digs her nest is something you never forget.",
          image:
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
        },
        {
          title: "Amkunj, the eco beach",
          text: "Driftwood benches, log sculptures, and rock pools — Amkunj is Rangat's gentle, crowd-free answer to the famous beaches further south. Come at golden hour and stay until the stars switch on.",
          image:
            "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=80",
        },
      ],
    },
  },
  {
    id: "baratang",
    name: "Baratang",
    tagline: "Caves & mud volcanoes",
    description:
      "Mangrove creeks, limestone caves, and India's only mud volcanoes.",
    x: 50,
    y: 44,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    highlights: ["Limestone Caves", "Mud Volcano", "Mangrove Creek"],
    story: {
      facts: {
        bestTime: "November – April",
        knownFor: "Limestone caves & mud volcanoes",
        gettingThere: "3h road + boat adventure from Port Blair",
      },
      chapters: [
        {
          title: "The convoy through the jungle",
          text: "The journey is half the story: vehicles cross the forest in escorted convoys, then a speedboat threads through a tunnel of mangroves so dense the sky disappears.",
          image:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80",
        },
        {
          title: "Cathedrals of stone",
          text: "A short walk past betel farms leads to the limestone caves — chambers of stalactites and stalagmites sculpted drop by drop over millions of years, glowing gold in torchlight.",
          image:
            "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=900&q=80",
        },
        {
          title: "The earth that bubbles",
          text: "Baratang hides India's only active mud volcanoes — small craters of cool grey clay that gurgle and pop as gases escape from deep underground. Strange, otherworldly, and entirely worth the detour.",
          image:
            "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=80",
        },
      ],
    },
  },
  {
    id: "port-blair",
    name: "Port Blair",
    tagline: "The vibrant capital",
    description:
      "Gateway to the Andamans. Home to Cellular Jail, Corbyn's Cove, and bustling markets.",
    x: 52,
    y: 58,
    image:
      "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&q=80",
    highlights: ["Cellular Jail", "Corbyn's Cove", "Aberdeen Bazaar"],
    story: {
      facts: {
        bestTime: "October – May",
        knownFor: "Cellular Jail & island heritage",
        gettingThere: "Direct flights from Chennai, Kolkata, Delhi & Bengaluru",
      },
      chapters: [
        {
          title: "Where every journey begins",
          text: "Every Andaman story starts here — ferries sounding their horns in the harbour, the smell of fresh catch at the jetty, and Aberdeen Bazaar buzzing late into the evening.",
          image:
            "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&q=80",
        },
        {
          title: "The jail that became a flame",
          text: "The Cellular Jail once held India's bravest freedom fighters in silence. Today its corridors hold their memory instead, and the nightly light-and-sound show turns those walls into a moving tribute.",
          image:
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
        },
        {
          title: "Sunset at Corbyn's Cove",
          text: "A palm-fringed curve of sand minutes from the city, where locals gather every evening for coconut water, jet-ski rides, and the daily spectacle of the sun melting into the Bay of Bengal.",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
        },
      ],
    },
  },
  {
    id: "ross-island",
    name: "Ross Island (Netaji Subhas Dweep)",
    tagline: "Echoes of the past",
    description:
      "Once the administrative capital of the British — now a haunting beauty of ruins reclaimed by banyan roots, just off Port Blair.",
    x: 58,
    y: 60,
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
    highlights: ["Colonial Ruins", "Light & Sound Show", "Deer Park"],
    story: {
      facts: {
        bestTime: "October – May",
        knownFor: "Banyan-wrapped colonial ruins",
        gettingThere: "20-minute boat ride from Port Blair jetty",
      },
      chapters: [
        {
          title: "The Paris of the East",
          text: "A century ago this tiny island had ballrooms, a bakery, tennis courts and a grand church — the glittering headquarters of British administration, nicknamed the Paris of the East.",
          image:
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
        },
        {
          title: "Reclaimed by the forest",
          text: "Then the empire left, and the banyans moved in. Today massive roots pour over the church walls like slow waterfalls — one of the most photogenic ruins anywhere in India.",
          image:
            "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=900&q=80",
        },
        {
          title: "An island of gentle neighbours",
          text: "Spotted deer and peacocks wander freely between the ruins, utterly unbothered by visitors. Stay for the evening light-and-sound show, when the island tells its own story.",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
        },
      ],
    },
  },
  {
    id: "havelock",
    name: "Havelock (Swaraj Dweep)",
    tagline: "Beaches & scuba paradise",
    description:
      "Famous for Radhanagar Beach — often ranked Asia's best — and world-class scuba diving.",
    x: 70,
    y: 52,
    image:
      "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=600&q=80",
    highlights: ["Radhanagar Beach", "Scuba Diving", "Elephant Beach"],
    story: {
      facts: {
        bestTime: "October – May (diving best Nov – Apr)",
        knownFor: "Radhanagar Beach — Asia's finest",
        gettingThere: "2h ferry from Port Blair",
      },
      chapters: [
        {
          title: "The beach that tops every list",
          text: "Radhanagar is the beach the Andamans are famous for — a kilometre of powder-white sand, a wall of rainforest behind you, and a sunset so reliable it feels scheduled.",
          image:
            "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=900&q=80",
        },
        {
          title: "Beneath the surface",
          text: "Havelock is India's scuba capital. First-timers descend onto coral gardens swarming with clownfish and turtles; veterans chase reef sharks and manta rays at sites like Johnny's Gorge.",
          image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
        },
        {
          title: "Glowing water, midnight kayaks",
          text: "On moonless nights, the mangrove creeks light up with bioluminescent plankton. Every paddle stroke leaves a trail of blue fire — the island's best-kept magic trick.",
          image:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80",
        },
      ],
    },
  },
  {
    id: "neil",
    name: "Neil Island (Shaheed Dweep)",
    tagline: "Quiet & untouched",
    description:
      "A laid-back island of coral reefs, natural bridges, and serene sunsets.",
    x: 66,
    y: 64,
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
    highlights: ["Natural Bridge", "Bharatpur Beach", "Sunset Point"],
    story: {
      facts: {
        bestTime: "October – May",
        knownFor: "The Natural Bridge rock formation",
        gettingThere: "1.5h ferry from Port Blair, 1h from Havelock",
      },
      chapters: [
        {
          title: "The island that slowed down",
          text: "Neil is small enough to cycle across in an hour and green enough to be called the vegetable bowl of the Andamans. Days here are measured in bicycle rides and coconut breaks.",
          image:
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
        },
        {
          title: "A bridge built by the sea",
          text: "At low tide, the ocean retreats to reveal the Natural Bridge — a living coral arch carved by centuries of waves, with rock pools full of starfish at its feet.",
          image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
        },
        {
          title: "Sunsets at Laxmanpur",
          text: "Every evening the whole island seems to gather at Laxmanpur Beach, where the sky performs in pinks and golds and the shallow water mirrors every colour of it.",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
        },
      ],
    },
  },
  {
    id: "cinque-island",
    name: "Cinque Island",
    tagline: "Twin-island paradise",
    description:
      "An uninhabited gem connected by a natural sandbar at low tide — pristine reefs and crystal-clear water for the truest castaway feel.",
    x: 56,
    y: 74,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    highlights: ["Natural Sandbar", "Snorkeling Reefs", "Untouched Beaches"],
    story: {
      facts: {
        bestTime: "December – April (calm seas)",
        knownFor: "The clearest water in the Andamans",
        gettingThere: "1.5h boat from Chidiya Tapu (day trips only)",
      },
      chapters: [
        {
          title: "Two islands joined by sand",
          text: "North and South Cinque are connected by a sandbar that rises from the sea at low tide. No resorts, no shops, no inhabitants — just sand, reef, and silence.",
          image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
        },
        {
          title: "Water like glass",
          text: "Visibility here regularly exceeds 25 metres. Drop a mask under the surface and the coral gardens appear in high definition — many divers rate Cinque the clearest water in the islands.",
          image:
            "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=900&q=80",
        },
        {
          title: "A day-trip-only paradise",
          text: "Because overnight stays are forbidden, Cinque stays pristine. You arrive with the morning boat, live your castaway dream for a few hours, and leave nothing behind but footprints the tide erases.",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
        },
      ],
    },
  },
  {
    id: "little-andaman",
    name: "Little Andaman",
    tagline: "Surf & waterfalls",
    description:
      "The southernmost gem — surfing beaches, the dramatic White Surf Waterfall, and lush rainforest trails for true off-the-grid travel.",
    x: 48,
    y: 90,
    image:
      "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=600&q=80",
    highlights: ["Butler Bay", "White Surf Waterfall", "Surfing"],
    story: {
      facts: {
        bestTime: "March – May for the best swell",
        knownFor: "India's secret surf break",
        gettingThere: "6–8h ship from Port Blair to Hut Bay",
      },
      chapters: [
        {
          title: "The last stop south",
          text: "Little Andaman is where the map runs out. The ship from Port Blair takes most of a day, and that journey filters the crowd down to surfers, wanderers, and people chasing real quiet.",
          image:
            "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=900&q=80",
        },
        {
          title: "Butler Bay's perfect wave",
          text: "Surfers whisper about Butler Bay the way climbers whisper about hidden peaks — a long, clean point break peeling along an empty palm-backed beach. India's best wave, and barely anyone on it.",
          image:
            "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=900&q=80",
        },
        {
          title: "Waterfalls in the jungle",
          text: "Inland, rainforest trails lead to White Surf and Whisper Wave waterfalls — cool, mossy amphitheatres where the only sound is falling water and hornbills overhead.",
          image:
            "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=900&q=80",
        },
      ],
    },
  },
];
