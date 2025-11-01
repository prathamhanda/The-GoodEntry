// =======================
// Volunteer Connect Script
// =======================

// Base API URL
const API_BASE = "/api";

// ---------- Current User ----------
async function getCurrentUser() {
  try {
    const res = await fetch(`${API_BASE}/me`, { credentials: 'include' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ---------- Load Events ----------
async function loadEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`);
    const events = await res.json();

    const container = document.getElementById("eventList");
    if (!container) return;

    if (events.length === 0) {
      container.innerHTML = `<p>No events available. Be the first to create one!</p>`;
      return;
    }

    container.innerHTML = events
      .map(
        (e) => `
      <div class="event">
        <h3>${e.title}</h3>
        <p>${e.description}</p>
        <p><b>Location:</b> ${e.location}</p>
        <p><b>Date:</b> ${new Date(e.date).toDateString()}</p>
        <button onclick="joinEvent('${e._id}')">Join Event</button>
      </div>`
      )
      .join("");
  } catch (error) {
    console.error("Error loading events:", error);
  }
}

// ---------- Join Event ----------
async function joinEvent(eventId) {
  try {
    const me = await getCurrentUser();
    if (!me || !me.id) {
      return (window.location.href = "/login.html");
    }
    const userId = me.id;

    const res = await fetch(`${API_BASE}/events/${eventId}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      alert("✅ You’ve successfully joined this event!");
    } else {
      alert("⚠️ Could not join event. Try again later.");
    }
  } catch (error) {
    console.error("Error joining event:", error);
  }
}

// ---------- Create Event ----------
async function createEvent(e) {
  e.preventDefault();

  const me = await getCurrentUser();
  if (!me || !me.id) {
    return (window.location.href = "/login.html");
  }

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;
  const category = document.getElementById("category").value;
  const organizer = document.getElementById("organizer").value;

  try {
    const res = await fetch(`${API_BASE}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        date,
        location,
        category,
        organizer,
      }),
    });

    if (res.ok) {
      alert("🎉 Event created successfully!");
      document.getElementById("createEventForm").reset();
    } else {
      alert("⚠️ Error creating event. Please try again.");
    }
  } catch (error) {
    console.error("Error creating event:", error);
  }
}

// Run on events page load
if (window.location.pathname.includes("events.html")) {
  loadEvents();
}

// Redirect from create-event if not authenticated (defense in depth with server)
if (window.location.pathname.includes("create-event.html")) {
  getCurrentUser().then((me) => {
    if (!me || !me.id) window.location.href = "/login.html";
  });
}
