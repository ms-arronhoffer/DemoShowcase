# AI Demo Showcase

A gallery-style web app for displaying demos with video, descriptions, GitHub links, and tag filtering. Demo data is controlled by a JSON config file — no rebuild needed to add or update demos.

## Quick Start (local dev)

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Adding or Updating Demos

Edit `public/demos.json`. Changes take effect on the next browser refresh with no rebuild required.

### Demo schema

```json
{
  "id": "unique-slug",
  "title": "Demo Title",
  "description": "Short description shown on the card.",
  "tags": ["Tag1", "Tag2"],
  "video_url": "https://www.youtube.com/watch?v=YOUR_ID",
  "repo_url": "https://github.com/org/repo",
  "thumbnail_url": null,
  "featured": false,
  "created_at": "2026-05-15T00:00:00Z"
}
```

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Unique kebab-case slug |
| `title` | Yes | Card heading |
| `description` | Yes | Up to 3 lines shown on card |
| `tags` | Yes | Free-form strings; drives filter strip |
| `video_url` | No | YouTube, Vimeo, or any URL. `null` hides Watch button |
| `repo_url` | No | GitHub or other repo URL. `null` hides Repo button |
| `thumbnail_url` | No | Image URL. `null` uses gradient + emoji fallback |
| `featured` | Yes | `true` sorts card to top and shows Featured badge |
| `created_at` | Yes | ISO 8601. Cards within 30 days show a New badge |

**Supported video embed providers:** YouTube (`youtube.com/watch?v=`, `youtu.be/`) and Vimeo (`vimeo.com/`). Other URLs open in a new tab.

## Docker

### Run with Docker Compose (recommended)

```bash
docker compose up -d --build
```

Open http://localhost:4545

### Portainer webhook setup

1. In Portainer, go to **Stacks → Add stack**
2. Choose **Repository** (point at your git repo) or **Upload** the `docker-compose.yml`
3. Deploy the stack
4. Open the stack, scroll to **Webhooks**, and enable it — Portainer gives you a webhook URL
5. POST to that URL to trigger a redeploy (e.g. from a CI pipeline or `curl -X POST <webhook-url>`)

### Update demos without rebuilding

The `demos.json` volume mount in `docker-compose.yml` maps `./public/demos.json` directly into the container. Edit the file and refresh — no rebuild or restart needed.

### Manual Docker run (no Compose)

```bash
docker build -t demo-showcase .
docker run -p 4545:80 demo-showcase
```

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Fluent UI v9 (`@fluentui/react-components`)
- nginx:1.27-alpine (production container)
