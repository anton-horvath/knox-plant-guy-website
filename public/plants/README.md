# Plant photos

Drop your product photos here, one folder per plant, named by the plant's
`slug` (the same slug used in `src/data/plants.ts`).

```
public/plants/
  wild-columbine/
    1.jpg
    2.jpg
    3.jpg
  cardinal-flower/
    1.jpg
    ...
```

Then, in `src/data/plants.ts`, set that plant's `photoCount` to the number of
photos you added (e.g. `photoCount: 3`). The product page will show them
automatically, alongside the line-art illustration.

- Any web image format works (`.jpg`, `.png`, `.webp`). If you use a different
  extension, update the filename in `src/components/ProductGallery.tsx`.
- Roughly square-ish or portrait photos look best in the gallery frame.
- Until you add photos, the page gracefully shows the black-outline drawing with
  a "Photographs coming soon" note.
