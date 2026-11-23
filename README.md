# HNL Engineering: Hunter Little's Portfolio

This is the code for my portfolio website, live at **https://hunterlittle-debug.github.io**.

It's a plain HTML/CSS/JavaScript site. There's no build step: GitHub Pages serves these files exactly as they are, so any change you commit to the `main` branch goes live in about a minute.

---

## What's where

```
index.html                 Homepage: hero, project cards, skills, contact button
about.html                 About me, education, experience, contact, resume link
projects/
  solarpack-battery.html   SolarPack high-voltage battery box
  cpap-bracket.html        Custom CPAP tubing bracket
  smart-lighting.html      Full-home smart lighting system
  project-template.html    Blank template for new projects
css/style.css              All the styling (colors are at the very top)
js/main.js                 Animations, photo lightbox, menu (you rarely need to touch this)
assets/
  images/                  Photos (.jpg / .png)
  models/                  3D models (.glb)
  resume.pdf               Your resume
  favicon.svg              The little icon in the browser tab
```

Two kinds of reminders are built into the pages:

- A **dashed orange box** (`class="placeholder-note"`) means something on that page is still a placeholder. Delete the box once the page has your real content.
- A small yellow **TODO** tag (`<mark class="todo">TODO</mark>` in the code) marks a spot that needs a detail only you know. Replace the tag and the text after it with your answer.

The project text was written from your resume and your answers. Pictures are your own photos and renders of your CAD files.

---

## Step 1: Edit a file on GitHub (no software needed)

1. Go to the repository on github.com and click the file you want to change (for example `index.html`).
2. Click the **pencil icon** ✏️ (top right of the file) to edit.
3. Make your change. Look for comments that start with `<!-- EDIT:`, which mark the parts meant to be changed.
4. Click **Commit changes…**, write a short note like "Update intro text", and click **Commit changes**.
5. Wait about a minute, then refresh your site.

**Tip:** if you'd rather edit on your computer, install [VS Code](https://code.visualstudio.com/) and [GitHub Desktop](https://desktop.github.com/). Clone this repo with GitHub Desktop, open the folder in VS Code, and install the **Live Server** extension. Right-click `index.html` and choose **Open with Live Server** to preview changes instantly before you commit.

## Step 2: Update your intro and contact info

- **Homepage headline and intro:** `index.html`, in the section marked `HERO`.
- **Email, LinkedIn:** `about.html` near the bottom (`id="contact"`), plus the LinkedIn link in the footer of each page.
- **LinkedIn:** search the pages for `YOUR-NAME`. Paste your LinkedIn URL there and remove the `<!--` and `-->` around that link so it shows.
- **Resume:** upload your PDF to `assets/` and name it exactly `resume.pdf` (this replaces the placeholder). On GitHub: open the `assets` folder, then **Add file → Upload files**. Since this site is public, use a version **without your phone number or home address**.

## Step 3: Add or change a project card on the homepage

In `index.html`, find the `PROJECT CARD 1` block. Each card is one `<a class="card" ...> ... </a>` block. In it, change:

- `href="projects/solarpack-battery.html"`: which page the card opens
- `src="assets/images/project1-1.jpg"`: the cover photo
- `data-category="cad fabrication"`: which filter buttons show it (words must match the buttons' `data-filter` values: `cad`, `fabrication`, `electronics`)
- the tags, title (`<h3>`), and one-sentence description (`<p>`)

To **add** a project, copy a whole card block and paste it right after the last one. To **remove** one, delete its block.

## Step 4: Fill in a project page

Open one of the files in `projects/` (or copy `project-template.html` to a new name like `my-new-project.html`). The page is split into numbered sections, each with a comment explaining what to write:

1. **Header**: title, one-line summary, quick facts (timeline, role, tools)
2. **Overview**: the problem and your requirements
3. **Photos**: click-to-enlarge gallery
4. **3D model**: interactive CAD viewer
5. **Design choices**: what you chose, the alternatives, and *why* (recruiters care most about this one)
6. **Capabilities**: specs and test results, with numbers when you have them
7. **What I learned**

You don't need every section. To remove a section (for example, the 3D model on a project with no CAD file), delete everything from `<section ... id="model">` to its matching `</section>`, and remove its link from the menu near the top of the page.

### Photos

1. Upload photos to `assets/images/`. Use simple names with no spaces, like `gearbox-assembly.jpg`.
2. **Shrink them first.** Phone photos are 3–8 MB, which makes the page slow. Aim for about 1600 px wide and under 500 KB. A free site like [squoosh.app](https://squoosh.app) does this in seconds.
3. In the gallery, each photo is one `<button>...</button>` line. Change the `src`, the `alt` (a short description for screen readers), and the `<figcaption>` caption.

### Video (optional, not used right now)

The project pages don't have video sections. If you want one later, upload the video to YouTube as **Unlisted**, copy its ID (the part after `v=` in the link), and paste this inside a project page where you want it:

```html
<section class="section section--tight">
  <div class="container">
    <div class="video-wrap">
      <iframe src="https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID" title="Project video" allowfullscreen loading="lazy"></iframe>
    </div>
  </div>
</section>
```

### 3D CAD model

The viewer uses Google's free [`<model-viewer>`](https://modelviewer.dev/). It needs a **.glb** file.

- **Onshape:** right-click the Part Studio or Assembly tab → **Export** → Format **GLTF**, and check the option for a single binary `.glb` file if offered.
- **Fusion 360:** File → Export → choose **GLB**. Or export **OBJ** and convert it (see below).
- **SolidWorks:** newer versions can **Save As → .glb / .gltf**. On older versions, save as **STL** or **OBJ**, then convert.
- **Converting:** open the STL/OBJ in [Blender](https://www.blender.org/) (free), then File → Export → **glTF 2.0** and choose the **.glb** format. Online converters work too.

Keep models under about 10 MB so they load quickly. Simplify tiny details (threads, fillets, text) before exporting if the file is large.

Upload the `.glb` to `assets/models/`, then change `src="../assets/models/placeholder-gears.glb"` in the project page. The homepage's spinning model uses the same idea (`index.html`, `HERO` section).

## Step 5: Change the colors

Open `css/style.css`. The colors are at the very top, in the `:root { ... }` block. For example, change `--accent: #e0742a;` to a different color code (pick one at [htmlcolorcodes.com](https://htmlcolorcodes.com)). Every button and highlight updates at once.

## Step 6: About page

In `about.html`, replace the placeholder story, skills, education, and experience. Upload a photo of yourself to `assets/images/` named `headshot.jpg` (square works best) to replace the placeholder.

## Cleaning up placeholders

When you're done, you can delete the placeholder files you no longer use, like `assets/images/project1-*.jpg` and `assets/models/placeholder-gears.glb` (the blank template uses them, so update it too). Just make sure no page still points to them.

## If something looks broken

- **Image not showing?** Check the file name in the code matches exactly, including capital letters and the extension (`.JPG` and `.jpg` are different on the web).
- **Page looks unstyled?** A project page must use `../css/style.css` (with `../`) because it's inside the `projects` folder.
- **Change not showing?** Wait a minute, then do a hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac). You can see deployment progress under the repo's **Actions** tab.
- **Broke something?** Every commit is saved. Open the file on GitHub, click **History**, and you can see or copy back any earlier version.
