# Popusti.ba - Catalog Deals Platform

A modern catalog deals platform built with Next.js, TailwindCSS, and Supabase.

## Features

### ✅ Implemented Features

1. **Enhanced Filter Bar**
   - Store dropdown (Bingo, Konzum, Robot, DM, etc.)
   - Category dropdown (Groceries, Electronics, Home, Beauty, Auto, etc.)
   - City dropdown (Sarajevo, Mostar, Banja Luka, Tuzla, etc.)
   - Real-time filtering of catalog cards

2. **Admin Catalog Upload Form**
   - Complete form with validation using React Hook Form + Zod
   - File upload support (PDF and multiple images)
   - Supabase integration for metadata storage and file storage
   - Progress tracking during upload
   - Automatic catalog refresh after upload

3. **Homepage Sections**
   - **Featured Catalogs**: Sponsored catalogs at the top
   - **Latest Catalogs**: Newest 6 catalogs with loading states
   - **Expiring Soon**: Catalogs with less than 3 days left
   - **All Catalogs**: Complete catalog grid with filtering

4. **Newsletter Subscription**
   - Beautiful gradient design
   - Email validation and duplicate checking
   - Success/error feedback
   - Supabase integration for email storage

5. **Google AdSense Integration**
   - Sidebar ads (desktop)
   - Between catalog cards (grid)
   - Mobile bottom sticky banner
   - Featured catalog ad slot
   - Responsive ad placeholders

6. **Database Schema**
   - Catalogs table with all necessary fields
   - Newsletter subscriptions table
   - Storage bucket for file uploads
   - Row Level Security (RLS) policies
   - Optimized indexes for performance

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google AdSense (Optional)
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=your_google_adsense_client_id
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL commands from `database-schema.sql` to create the necessary tables and policies
4. Go to Storage and create a bucket named `catalog-files` (or update the bucket name in the SQL)
5. Copy your project URL and anon key to the environment variables

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Schema

### Catalogs Table
- `id`: UUID (Primary Key)
- `title`: TEXT (Catalog title)
- `store`: TEXT (Store name)
- `category`: TEXT (Category)
- `city`: TEXT (City)
- `valid_from`: DATE (Valid from date)
- `valid_to`: DATE (Valid to date)
- `cover_image_url`: TEXT (Cover image URL)
- `pdf_url`: TEXT (PDF file URL)
- `image_urls`: TEXT[] (Array of image URLs)
- `is_featured`: BOOLEAN (Featured catalog flag)
- `created_at`: TIMESTAMP (Creation timestamp)
- `updated_at`: TIMESTAMP (Update timestamp)

### Newsletter Subscriptions Table
- `id`: UUID (Primary Key)
- `email`: TEXT (Email address, unique)
- `created_at`: TIMESTAMP (Subscription timestamp)

## File Structure

```
src/
├── app/
│   ├── page.tsx                 # Main homepage with all sections
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── CatalogCard.tsx         # Individual catalog card component
│   ├── CatalogViewer.tsx       # Modal for viewing catalogs
│   ├── CatalogUploadForm.tsx   # Admin upload form
│   ├── NewsletterSubscription.tsx # Newsletter signup component
│   └── AdPlaceholder.tsx       # Google AdSense placeholder
├── hooks/
│   └── useCatalogs.ts          # Custom hook for catalog management
└── lib/
    └── supabase.ts             # Supabase client configuration
```

## Key Features Explained

### Filter System
The filter bar allows users to filter catalogs by:
- **Store**: Dropdown with all available stores
- **Category**: Dropdown with product categories
- **City**: Dropdown with available cities
- **Search**: Text search across title and store name

### Upload System
The admin upload form includes:
- Form validation using Zod schema
- File upload with drag-and-drop interface
- Support for PDF and multiple image formats
- Progress tracking during upload
- Automatic file organization in Supabase storage

### Ad Integration
Google AdSense placeholders are strategically placed:
- **Sidebar**: 300x250 ads on desktop
- **Grid**: 728x90 leaderboard between catalog cards
- **Mobile**: 320x50 sticky banner at bottom
- **Featured**: 728x90 ad slot for sponsored content

### Responsive Design
- Mobile-first approach with TailwindCSS
- Responsive grid layouts
- Mobile-specific ad placements
- Touch-friendly interface elements

## Customization

### Adding New Stores/Categories/Cities
Update the arrays in `src/app/page.tsx`:
```typescript
const stores = ['All', 'Bingo', 'Konzum', 'Robot', 'DM', 'NewStore'];
const categories = ['All', 'Groceries', 'Electronics', 'Home', 'Beauty', 'Auto', 'NewCategory'];
const cities = ['All', 'Sarajevo', 'Mostar', 'Banja Luka', 'Tuzla', 'NewCity'];
```

### Styling
The application uses TailwindCSS for styling. Key design elements:
- Blue color scheme (`blue-600`, `blue-700`)
- Rounded corners (`rounded-lg`, `rounded-xl`)
- Shadow effects (`shadow-lg`, `shadow-xl`)
- Hover animations and transitions
- Gradient backgrounds for special sections

## Production Deployment

1. Set up your production Supabase project
2. Update environment variables with production values
3. Deploy to Vercel, Netlify, or your preferred platform
4. Configure Google AdSense with your production domain
5. Update ad placeholders with real AdSense code

## Support

For questions or issues, please check the code comments or create an issue in the repository.
