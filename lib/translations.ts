export type Locale = "en" | "id";

export const translations = {
  // ── Navbar ──
  "nav.about": { en: "About", id: "Tentang" },
  "nav.skills": { en: "Skills", id: "Keahlian" },
  "nav.projects": { en: "Projects", id: "Proyek" },
  "nav.experience": { en: "Experience", id: "Pengalaman" },
  "nav.certifications": { en: "Certifications", id: "Sertifikasi" },
  "nav.contact": { en: "Contact", id: "Kontak" },
  "nav.hireMe": { en: "Hire Me", id: "Hubungi Saya" },

  // ── Hero ──
  "hero.available": { en: "Available for Work", id: "Tersedia untuk Bekerja" },
  "hero.tagline": {
    en: "Building impactful digital solutions. Founder of GokilTech, Information Systems at Telkom University.",
    id: "Membangun solusi digital yang berdampak. Founder GokilTech, Sistem Informasi di Telkom University.",
  },
  "hero.viewProjects": { en: "View Projects →", id: "Lihat Proyek →" },
  "hero.projects": { en: "Projects", id: "Proyek" },
  "hero.technologies": { en: "Technologies", id: "Teknologi" },
  "hero.yearsCoding": { en: "Years Coding", id: "Tahun Coding" },

  "hero.role.0": { en: "Software Engineer", id: "Software Engineer" },
  "hero.role.1": { en: "Fullstack Developer", id: "Fullstack Developer" },
  "hero.role.2": { en: "Founder of GokilTech", id: "Founder GokilTech" },
  "hero.role.3": { en: "Information Systems @ Telkom University", id: "Sistem Informasi @ Telkom University" },

  // ── About ──
  "about.subtitle": { en: "About Me", id: "Tentang Saya" },
  "about.title1": { en: "Who ", id: "Siapa " },
  "about.title2": { en: "Am I?", id: "Saya?" },
  "about.bio": {
    en: "Hello! I'm Akhdan, a Software Engineer and Fullstack Developer passionate about building digital solutions. Currently pursuing an Information Systems degree at Telkom University.",
    id: "Halo! Saya Akhdan, seorang Software Engineer dan Fullstack Developer yang bersemangat membangun solusi digital. Saat ini sedang menempuh pendidikan Sistem Informasi di Telkom University.",
  },
  "about.university": { en: "University", id: "Universitas" },
  "about.major": { en: "Major", id: "Jurusan" },
  "about.majorValue": { en: "Information Systems", id: "Sistem Informasi" },
  "about.role": { en: "Role", id: "Peran" },
  "about.startup": { en: "Startup", id: "Startup" },

  // ── Skills ──
  "skills.subtitle": { en: "Tech Stack", id: "Teknologi" },
  "skills.title1": { en: "Skills & ", id: "Keahlian & " },
  "skills.title2": { en: "Technologies", id: "Teknologi" },

  // ── Projects ──
  "projects.subtitle": { en: "Portfolio", id: "Portofolio" },
  "projects.title1": { en: "Latest ", id: "Proyek " },
  "projects.title2": { en: "Projects", id: "Terbaru" },
  "projects.featured": { en: "Featured", id: "Unggulan" },
  "projects.all": { en: "All", id: "Semua" },
  "projects.liveDemo": { en: "Live Demo ↗", id: "Live Demo ↗" },
  "projects.noProjects": { en: "No projects yet — add some from the admin panel!", id: "Belum ada proyek — tambahkan dari panel admin!" },

  // ── Experience ──
  "experience.subtitle": { en: "Career", id: "Karir" },
  "experience.title1": { en: "Work ", id: "Pengalaman " },
  "experience.title2": { en: "Experience", id: "Kerja" },
  "experience.present": { en: "Present", id: "Sekarang" },

  // ── Certifications ──
  "certifications.subtitle": { en: "Achievements", id: "Pencapaian" },
  "certifications.title1": { en: "Certifications & ", id: "Sertifikasi & " },
  "certifications.title2": { en: "Achievements", id: "Pencapaian" },
  "certifications.view": { en: "View Certificate ↗", id: "Lihat Sertifikat ↗" },

  // ── Contact ──
  "contact.subtitle": { en: "Get In Touch", id: "Hubungi Saya" },
  "contact.title1": { en: "Let's ", id: "Mari " },
  "contact.title2": { en: "Connect", id: "Terhubung" },
  "contact.description": {
    en: "Interested in collaborating or have a cool project in mind? Let's make something great together!",
    id: "Tertarik berkolaborasi atau punya proyek keren? Mari buat sesuatu yang hebat bersama!",
  },
  "contact.sendEmail": { en: "Send an email", id: "Kirim email" },
  "contact.viewRepos": { en: "View my repositories", id: "Lihat repositori saya" },
  "contact.connectMe": { en: "Connect with me", id: "Terhubung dengan saya" },
  "contact.myStartup": { en: "My startup", id: "Startup saya" },
  "contact.sendMessage": { en: "Send a Message", id: "Kirim Pesan" },

  // ── Footer ──
  "footer.bio": {
    en: "Software Engineer & Fullstack Developer. Building impactful digital solutions from Jakarta, Indonesia. Currently studying Information Systems at Telkom University.",
    id: "Software Engineer & Fullstack Developer. Membangun solusi digital berdampak dari Jakarta, Indonesia. Saat ini kuliah Sistem Informasi di Telkom University.",
  },
  "footer.navigation": { en: "Navigation", id: "Navigasi" },
  "footer.getInTouch": { en: "Get In Touch", id: "Hubungi Saya" },
  "footer.myStartup": { en: "GokilTech — My Startup", id: "GokilTech — Startup Saya" },
  "footer.cta": { en: "Let's Work Together →", id: "Mari Bekerja Sama →" },
  "footer.rights": { en: "All rights reserved.", id: "Hak cipta dilindungi." },
  "footer.builtWith": { en: "using Next.js & Supabase", id: "menggunakan Next.js & Supabase" },
  "footer.builtWithPrefix": { en: "Built with", id: "Dibuat dengan" },
} as const;

export type TranslationKey = keyof typeof translations;
