import express from "express";
import Event from "../models/Event.js";
import User from "../models/User.js"; // Import User model

const router = express.Router();

// Create event
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events (Populate volunteers)
router.get("/", async (req, res) => {
  try {
    // Populate the volunteers array with actual User data (only name and email for display)
    const events = await Event.find().populate("volunteers", "name email");
    res.json(events);
  } catch (error) {
    // Mock data when database is not available
    const mockEvents = [
      {
        _id: "mock1",
        title: "Winter Beach Cleanup",
        description: "Join us for a comprehensive beach cleanup to remove plastic waste, debris, and other pollutants from our beautiful coastline. This event is part of our ongoing effort to protect marine life and maintain clean beaches for everyone to enjoy.",
        quickDescription: "Help clean up our beautiful coastline and protect marine life from plastic pollution.",
        date: new Date("2024-01-15"),
        time: "9:00 AM - 12:00 PM",
        day: "Saturday",
        location: "Jones Beach, 1 Ocean Pkwy, Wantagh, NY 11793",
        category: "Environmental",
        organizer: "Ocean Conservation Society",
        organizationInfo: {
          name: "Ocean Conservation Society",
          description: "A non-profit organization dedicated to protecting marine ecosystems and promoting sustainable ocean practices.",
          website: "https://oceanconservation.org",
          contactEmail: "info@oceanconservation.org"
        },
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop",
        maxVolunteers: 30,
        preparationInstructions: "Please arrive 15 minutes early for check-in and safety briefing. The cleanup will involve walking on sand and potentially wet areas, so wear appropriate footwear.",
        requirements: ["Must be 16 years or older", "Ability to walk on sand for 2-3 hours", "Comfortable with physical activity"],
        whatToBring: ["Water bottle", "Sunscreen and hat", "Comfortable walking shoes", "Layers for changing weather"],
        volunteerFeedback: [
          {
            volunteerName: "Sarah Johnson",
            rating: 5,
            comment: "Amazing experience! The organizers were so well-prepared and the impact was immediately visible.",
            date: new Date("2023-12-10")
          },
          {
            volunteerName: "Mike Chen",
            rating: 4,
            comment: "Great way to give back to the community. The team was friendly and the work was rewarding.",
            date: new Date("2023-12-05")
          }
        ],
        volunteers: [
          { name: "John Smith", email: "john@email.com" },
          { name: "Maria Garcia", email: "maria@email.com" },
          { name: "Robert Johnson", email: "robert@email.com" }
        ]
      },
      {
        _id: "mock2",
        title: "Spring Food Drive",
        description: "Help us collect and organize food donations for local families in need. This event involves sorting donated items, checking expiration dates, and organizing the food bank.",
        quickDescription: "Sort and organize food donations to help feed families in our community.",
        date: new Date("2024-02-20"),
        time: "10:00 AM - 2:00 PM",
        day: "Tuesday",
        location: "Community Food Bank, 123 Main St, Downtown",
        category: "Community Service",
        organizer: "Community Food Bank",
        organizationInfo: {
          name: "Community Food Bank",
          description: "Serving our community for 25 years, we provide food assistance to over 5,000 families monthly.",
          website: "https://communityfoodbank.org",
          contactEmail: "volunteer@communityfoodbank.org"
        },
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=400&fit=crop",
        maxVolunteers: 25,
        preparationInstructions: "Please wear comfortable clothes and closed-toe shoes. We'll be working in a warehouse environment with some lifting involved.",
        requirements: ["Must be 14 years or older", "Ability to lift up to 25 pounds", "Comfortable standing for extended periods"],
        whatToBring: ["Comfortable work clothes", "Closed-toe shoes", "Water bottle", "Positive attitude!"],
        volunteerFeedback: [
          {
            volunteerName: "David Kim",
            rating: 5,
            comment: "Incredibly rewarding experience. Seeing the direct impact on families in need was heartwarming.",
            date: new Date("2023-11-15")
          }
        ],
        volunteers: [
          { name: "Sarah Wilson", email: "sarah@email.com" },
          { name: "Michael Brown", email: "michael@email.com" }
        ]
      },
      {
        _id: "mock3",
        title: "Community Garden Planting Day",
        description: "Join us for a hands-on day of planting and maintaining our community garden. Help grow fresh vegetables for local families while learning sustainable gardening practices.",
        quickDescription: "Plant vegetables and help maintain our community garden for local families.",
        date: new Date("2024-03-10"),
        time: "8:00 AM - 12:00 PM",
        day: "Saturday",
        location: "Riverside Community Garden, 456 Garden Ave, Downtown",
        category: "Environmental",
        organizer: "Green Thumbs Community",
        organizationInfo: {
          name: "Green Thumbs Community",
          description: "A local organization promoting urban agriculture and food security through community gardens.",
          website: "https://greenthumbs.org",
          contactEmail: "info@greenthumbs.org"
        },
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop",
        maxVolunteers: 40,
        preparationInstructions: "Come prepared to get your hands dirty! We'll provide all tools and materials. Dress in comfortable work clothes that can get soil on them.",
        requirements: ["Must be 8 years or older (minors need adult supervision)", "Ability to bend and kneel for planting", "Interest in gardening and community service"],
        whatToBring: ["Work gloves (we have some if needed)", "Water bottle", "Sun hat", "Sturdy shoes or boots", "Positive energy!"],
        volunteerFeedback: [
          {
            volunteerName: "Emma Thompson",
            rating: 5,
            comment: "Such a rewarding experience! I learned so much about sustainable gardening.",
            date: new Date("2023-10-20")
          },
          {
            volunteerName: "James Wilson",
            rating: 5,
            comment: "Great community spirit! My kids loved learning about where food comes from.",
            date: new Date("2023-10-15")
          }
        ],
        volunteers: [
          { name: "Lisa Chen", email: "lisa@email.com" },
          { name: "Tom Anderson", email: "tom@email.com" },
          { name: "Rachel Green", email: "rachel@email.com" },
          { name: "Mark Davis", email: "mark@email.com" }
        ]
      },
      {
        _id: "mock4",
        title: "Homeless Shelter Meal Service",
        description: "Help serve warm meals to individuals experiencing homelessness. Work alongside our team to prepare, serve, and clean up after dinner service. This is a wonderful opportunity to directly support those in need in our community.",
        quickDescription: "Serve meals and provide support to individuals experiencing homelessness.",
        date: new Date("2024-02-14"),
        time: "5:00 PM - 8:00 PM",
        day: "Wednesday",
        location: "Hope Shelter, 789 Shelter St, Midtown",
        category: "Community Service",
        organizer: "Hope for All Foundation",
        organizationInfo: {
          name: "Hope for All Foundation",
          description: "Providing shelter, meals, and support services to individuals and families experiencing homelessness since 1985.",
          website: "https://hopeforall.org",
          contactEmail: "volunteer@hopeforall.org"
        },
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop",
        maxVolunteers: 15,
        preparationInstructions: "Arrive 30 minutes early for orientation. We'll provide all necessary training on food safety and guest interaction protocols.",
        requirements: ["Must be 18 years or older", "Food safety training provided on-site", "Compassionate and respectful attitude"],
        whatToBring: ["Hair tie (if you have long hair)", "Comfortable non-slip shoes", "Clean apron (we can provide)", "Smiling face and positive attitude"],
        volunteerFeedback: [
          {
            volunteerName: "Maria Santos",
            rating: 5,
            comment: "Humbling experience. The gratitude from guests was overwhelming.",
            date: new Date("2023-12-22")
          },
          {
            volunteerName: "Kevin Park",
            rating: 5,
            comment: "Made me appreciate what I have. Everyone was so welcoming and kind.",
            date: new Date("2023-12-18")
          }
        ],
        volunteers: [
          { name: "Anna White", email: "anna@email.com" },
          { name: "Chris Taylor", email: "chris@email.com" }
        ]
      },
      {
        _id: "mock5",
        title: "Senior Center Tech Tutoring",
        description: "Share your tech knowledge with seniors who want to learn about smartphones, tablets, and computers. Help them stay connected with family and friends through technology.",
        quickDescription: "Teach seniors basic technology skills to stay connected with loved ones.",
        date: new Date("2024-02-28"),
        time: "10:00 AM - 12:00 PM",
        day: "Wednesday",
        location: "Sunset Senior Center, 321 Elder Ave, Neighborhood",
        category: "Education",
        organizer: "Tech Bridges Initiative",
        organizationInfo: {
          name: "Tech Bridges Initiative",
          description: "Bridging the digital divide by teaching technology skills to underserved communities, with special focus on seniors.",
          website: "https://techbridges.org",
          contactEmail: "info@techbridges.org"
        },
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=400&fit=crop",
        maxVolunteers: 20,
        preparationInstructions: "We'll provide training materials. Come with patience and enthusiasm! Many seniors are learning these skills for the first time.",
        requirements: ["Comfortable with smartphones and tablets", "Patient teaching style", "Interest in helping seniors", "Must pass background check"],
        whatToBring: ["Your own device (phone/tablet) to demonstrate", "Notebook for taking notes", "Name tag (we provide)", "Smile and positive attitude"],
        volunteerFeedback: [
          {
            volunteerName: "Jennifer Lee",
            rating: 5,
            comment: "So rewarding to see seniors' faces light up when they send their first text!",
            date: new Date("2024-01-10")
          },
          {
            volunteerName: "Michael Chang",
            rating: 4,
            comment: "Great program! The seniors were eager to learn and very appreciative.",
            date: new Date("2024-01-05")
          }
        ],
        volunteers: [
          { name: "Sophie Martin", email: "sophie@email.com" },
          { name: "Daniel Lee", email: "daniel@email.com" },
          { name: "Olivia Brown", email: "olivia@email.com" },
          { name: "Lucas Miller", email: "lucas@email.com" },
          { name: "Isabella Garcia", email: "isabella@email.com" }
        ]
      },
      {
        _id: "mock6",
        title: "Animal Shelter Adoption Fair",
        description: "Help promote pet adoptions at our community fair. Assist with animal handling, event setup, talking to potential adopters, and providing information about our shelter animals.",
        quickDescription: "Help care for and promote adoptable pets at our community adoption fair.",
        date: new Date("2024-03-16"),
        time: "11:00 AM - 4:00 PM",
        day: "Saturday",
        location: "Central Park Pavilion, 100 Park Ave, Downtown",
        category: "Animal Welfare",
        organizer: "Paws & Hearts Rescue",
        organizationInfo: {
          name: "Paws & Hearts Rescue",
          description: "A no-kill shelter dedicated to finding loving homes for abandoned and rescued animals.",
          website: "https://pawsandhearts.org",
          contactEmail: "adopt@pawsandhearts.org"
        },
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=400&fit=crop",
        maxVolunteers: 25,
        preparationInstructions: "Wear comfortable clothes suitable for outdoor activities with animals. We'll provide orientation on safe animal handling.",
        requirements: ["Must be 16 years or older", "Comfortable around dogs and cats", "Ability to stand for extended periods", "Love for animals!"],
        whatToBring: ["Comfortable walking shoes", "Weather-appropriate clothing", "Water bottle", "Positive attitude"],
        volunteerFeedback: [
          {
            volunteerName: "Jessica Martinez",
            rating: 5,
            comment: "Best way to spend a Saturday! So many happy tail wags and purrs.",
            date: new Date("2023-11-20")
          },
          {
            volunteerName: "Alex Rodriguez",
            rating: 5,
            comment: "Seeing pets find forever homes was the highlight of my month!",
            date: new Date("2023-11-15")
          }
        ],
        volunteers: [
          { name: "Emma Wilson", email: "emma@email.com" },
          { name: "Noah Johnson", email: "noah@email.com" },
          { name: "Ava Martinez", email: "ava@email.com" }
        ]
      }
    ];
    res.json(mockEvents);
  }
});

// Get single event by ID (NEW)
router.get("/:id", async (req, res) => {
  try {
    // Fetch the single event and populate the volunteers' names and emails
    const event = await Event.findById(req.params.id).populate("volunteers", "name email");
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    // Mock data when database is not available
    const mockEvent = {
      _id: req.params.id,
      title: "Winter Beach Cleanup",
      description: "Join us for a comprehensive beach cleanup to remove plastic waste, debris, and other pollutants from our beautiful coastline. This event is part of our ongoing effort to protect marine life and maintain clean beaches for everyone to enjoy. We'll provide all necessary equipment including gloves, bags, and pickers. All skill levels welcome!",
      quickDescription: "Help clean up our beautiful coastline and protect marine life from plastic pollution.",
      date: new Date("2024-01-15"),
      time: "9:00 AM - 12:00 PM",
      day: "Saturday",
      location: "Jones Beach, 1 Ocean Pkwy, Wantagh, NY 11793",
      category: "Environmental",
      organizer: "Ocean Conservation Society",
      organizationInfo: {
        name: "Ocean Conservation Society",
        description: "A non-profit organization dedicated to protecting marine ecosystems and promoting sustainable ocean practices. We've been organizing beach cleanups and marine conservation efforts for over 10 years.",
        website: "https://oceanconservation.org",
        contactEmail: "info@oceanconservation.org"
      },
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop",
      maxVolunteers: 30,
      preparationInstructions: "Please arrive 15 minutes early for check-in and safety briefing. The cleanup will involve walking on sand and potentially wet areas, so wear appropriate footwear. We'll be working rain or shine, so dress for the weather.",
      requirements: ["Must be 16 years or older (or accompanied by adult)", "Ability to walk on sand for 2-3 hours", "Comfortable with physical activity"],
      whatToBring: ["Water bottle (we'll provide refills)", "Sunscreen and hat", "Comfortable walking shoes", "Layers for changing weather"],
      volunteerFeedback: [
        {
          volunteerName: "Sarah Johnson",
          rating: 5,
          comment: "Amazing experience! The organizers were so well-prepared and the impact was immediately visible. I'll definitely be back!",
          date: new Date("2023-12-10")
        },
        {
          volunteerName: "Mike Chen",
          rating: 4,
          comment: "Great way to give back to the community. The team was friendly and the work was rewarding. Highly recommend!",
          date: new Date("2023-12-05")
        },
        {
          volunteerName: "Emily Rodriguez",
          rating: 5,
          comment: "This organization really knows what they're doing. The cleanup was well-organized and I learned a lot about marine conservation.",
          date: new Date("2023-11-28")
        }
      ],
      volunteers: [
        { name: "John Smith", email: "john@email.com" },
        { name: "Maria Garcia", email: "maria@email.com" },
        { name: "Robert Johnson", email: "robert@email.com" }
      ]
    };
    res.json(mockEvent);
  }
});

// Join event (UPDATED to link event to user as well)
router.post("/:id/join", async (req, res) => {
  const { userId } = req.body;
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) {
      return res.status(404).json({ error: "Event or User not found" });
    }

    // 1. Add user to event's volunteers (Event Model)
    if (!event.volunteers.includes(userId)) {
      event.volunteers.push(userId);
    }

    // 2. Add event to user's joinedEvents (User Model)
    if (!user.joinedEvents.includes(eventId)) {
      user.joinedEvents.push(eventId);
    }
    
    await event.save();
    await user.save();

    res.json({ event, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;