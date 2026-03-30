# PhysicAll

Static website for **PhysicAll** — a premium personal training studio in Vercelli, Italy.

![Live](https://img.shields.io/badge/status-live-brightgreen)

---

## Screenshot

![PhysicAll homepage screenshot](assets/images/screenshot.png)

---

## Tech Stack

| Layer      | Technology                        | Notes                              |
|------------|-----------------------------------|------------------------------------|
| Markup     | HTML5                             | Single `index.html`, no framework  |
| Styling    | Custom CSS3                       | CSS variables, Flexbox, Grid       |
| Scripting  | Vanilla JavaScript (ES6+)         | No build step, no dependencies     |
| Fonts      | Inter + Barlow Condensed          | Loaded via Google Fonts CDN        |
| Icons      | Font Awesome 6.5.1                | Loaded via CDN                     |
| Maps       | Google Maps iframe embed          | Static embed, no API key required  |

---

## Project Structure

```
m0canu1.github.io/
├── index.html                  # Single-page site (all sections)
├── assets/
│   ├── css/
│   │   └── styles.css          # All styles; CSS vars in :root
│   ├── js/
│   │   └── main.js             # Founder modal, contact form, smooth scroll
│   └── images/
│       └── logos/
│           └── PNG/
│               └── PhysicALL_LOGO_Bianco.png
└── .gitignore
```

---

## Key Features

- **Single-page layout** with sections: Nav, Hero, Chi Siamo, Fondatori, Orari & Sede, Team, Contatti, Footer.
- **Founder modal drawer** — slides in from the right, dynamically populated from `foundersData` in `main.js`, with focus trap.
- **WhatsApp floating button** with CSS pulse animation for direct contact.
- **Google Maps embed** showing the studio location.
- **Smooth scroll** on all internal anchor links.
- **Responsive layout** collapsing at 900 px and 768 px breakpoints.

---

## Getting Started

No build step, no package manager, no server required.

1. Clone the repository:
   ```bash
   git clone https://github.com/m0canu1/m0canu1.github.io.git
   cd m0canu1.github.io
   ```

2. Open `index.html` directly in a browser:
   ```bash
   open index.html          # macOS
   xdg-open index.html      # Linux
   start index.html         # Windows
   ```
   Or serve with any static file server (e.g. `python3 -m http.server`).

---

## Customization Guide

### Colors

All brand colors are CSS custom properties defined in `:root` inside `assets/css/styles.css`:

```css
:root {
  --red:    #E02030;
  --blue:   #103080;
  --orange: #F08000;
  --black:  #080810;
  --dark:   #0f0f18;
}
```

Change a value once here to update it site-wide.

### Founders Data

Founder card content (name, bio, image, social links) is stored in the `foundersData` object near the top of `assets/js/main.js`. Add, remove, or edit entries there:

```js
const foundersData = {
  mario: {
    name: "Mario Rossi",
    role: "Head Coach",
    bio: "...",
    // ...
  },
  // add more founders here
};
```

The modal drawer reads this object at runtime — no HTML edits needed for founder content changes.

### Contact Info

Phone numbers, email addresses, and the WhatsApp link are hardcoded in `index.html` inside the **Contatti** section and in the floating WhatsApp button. Search for:

- `href="tel:+39..."` — phone links
- `href="mailto:..."` — email links
- `href="https://wa.me/..."` — WhatsApp floating button

Update the values in place.

---

## Responsive Breakpoints

| Breakpoint | Behavior                                           |
|------------|----------------------------------------------------|
| `> 900px`  | Full desktop layout; nav links visible             |
| `≤ 900px`  | Nav links hidden; layout adjusts to narrower grid  |
| `≤ 768px`  | Single-column stacking for cards and sections      |

---

## Known Limitations

- **No contact form backend** — the form uses `FormData` and shows a browser `alert`; submissions are not sent anywhere.
- **No mobile hamburger menu** — nav links are hidden below 900 px with no toggle to reveal them.

---

## License

MIT © 2025 PhysicAll
