CREATE TABLE IF NOT EXISTS page_viewers (
  slug TEXT NOT NULL,
  viewer_hash TEXT NOT NULL,
  viewed_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  PRIMARY KEY (slug, viewer_hash)
);
CREATE INDEX IF NOT EXISTS idx_page_viewers_slug ON page_viewers (slug);
