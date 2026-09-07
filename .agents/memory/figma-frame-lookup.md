---
name: Figma frame lookup
description: How to resolve Figma links that point at a page canvas instead of a concrete design frame.
---

When a Figma URL provides a page-level node such as `0:1`, first call metadata for that page, identify the concrete frame, then call design context and screenshot on the frame id.

**Why:** Figma MCP can report “nothing selected” for a page canvas even when the file and node id are valid.

**How to apply:** Preserve the user’s file key, use page metadata to find the intended named frame, and implement from that frame rather than guessing from the URL root.