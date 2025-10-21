# Pexels API Setup

## Environment Configuration

To use the Pexels image picker feature, you need to set up your environment variable:

1. Create a `.env.local` file in the root directory:
```bash
# Pexels API Key
NEXT_PUBLIC_PEXELS_API_KEY=JPPFabqXF3lzQoURSlRy7fBAIAtILwsc2SCbCtqxzSGhtflTtz8Rvgsv
```

2. Restart your development server:
```bash
npm run dev
```

**Important:** The Next.js configuration has been updated to allow images from `images.pexels.com`. If you encounter any image loading issues, make sure to restart your development server after setting up the environment variable.

## Features

- **Image Search**: Search for high-quality, royalty-free images from Pexels
- **Category-based Suggestions**: Smart search terms based on catalog categories
- **Image Preview**: See images before selecting them
- **Photographer Credits**: Proper attribution for all images
- **Fallback Handling**: Graceful fallback when images fail to load

## Usage

1. Go to the upload page (`/upload`)
2. Fill in the catalog details
3. Click "Search Pexels Images" button
4. Browse and select images from the modal
5. Selected images will appear in the preview
6. Submit the form to create your catalog

## Image Sources

The application now uses Pexels images for:
- Mock data thumbnails (homepage and catalog pages)
- User-selected images via the image picker
- Fallback placeholders when images fail to load

All images are properly credited and follow Pexels' usage guidelines.
