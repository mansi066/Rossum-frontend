class AdminDataService {
  // Events
  async getEvents() {
    return Promise.resolve([
      {
        id: "0",
        title: "Algo Chase",
        text: "Algo-Chase is more than just a competition—it's a race against time where teams dive into a world of riddles, code-cracking, and thrilling problem-solving.",
        date: "2025-05-16",
        time: "10:00 AM",
        location: "Main Auditorium",
        registrationLink: "#",
        featured: true,
        archived: false,
        order: 0
      }
    ]);
  }

  async addEvent(eventData) {
    return Promise.resolve({
      id: String(Date.now()),
      ...eventData,
      createdAt: new Date(),
      updatedAt: new Date(),
      order: Date.now()
    });
  }

  async updateEvent(id, eventData) {
    return Promise.resolve({
      id,
      ...eventData,
      updatedAt: new Date()
    });
  }

  async deleteEvent(id) {
    return Promise.resolve({ success: true });
  }

  async reorderEvents(events) {
    return Promise.resolve(events.map((event, index) => ({
      ...event,
      order: index
    })));
  }

  // Team
  async getTeam() {
    return Promise.resolve([
      {
        id: "0",
        name: "Suman Saha",
        role: "Faculty",
        department: "Faculty",
        bio: "Experienced faculty member",
        email: "suman.saha@mail.jaypeeu.ac.in",
        phone: "+91 9805788220",
        url: "/src/assets/Members/SumanSaha.jpeg",
        order: 0
      }
    ]);
  }

  async addTeamMember(memberData) {
    return Promise.resolve({
      id: String(Date.now()),
      ...memberData,
      createdAt: new Date(),
      updatedAt: new Date(),
      order: Date.now()
    });
  }

  async updateTeamMember(id, memberData) {
    return Promise.resolve({
      id,
      ...memberData,
      updatedAt: new Date()
    });
  }

  async deleteTeamMember(id) {
    return Promise.resolve({ success: true });
  }

  // Contact Info
  async getContactInfo() {
    return Promise.resolve(this.getDefaultContactInfo());
  }

  getDefaultContactInfo() {
    return {
      address: "Jaypee University Anoopshahr, Bulandshahr, Uttar Pradesh - 203390, India",
      phone: "+91 8741895972",
      email: "rossum@jaypeeu.ac.in",
      socialMedia: {
        instagram: "https://www.instagram.com/rossum_jua",
        linkedin: "https://www.linkedin.com/in/rossum-jua-454561366",
        facebook: "https://www.facebook.com/share/15nztq6WnR/"
      },
      officeHours: "Monday - Friday: 9:00 AM - 5:00 PM",
      contactFormEmail: "admin@rossum.com"
    };
  }

  async updateContactInfo(contactData) {
    return Promise.resolve(contactData);
  }
}

export const adminDataService = new AdminDataService();