# Sudhir Garg and Namita Garg - Law Firm Website

A modern, professional law firm website for my parent's law practice showcasing legal expertise with comprehensive features for client engagement and consultation booking.

## Features

### Core Pages
* **Home Page** - Hero section with CTAs, stats counter, practice areas preview, testimonials
* **About Us** - Detailed lawyer profiles with qualifications, experience, and achievements
* **Services** - Comprehensive practice area details with service breakdowns
* **Case Studies** - Success stories with problem-strategy-outcome format
* **Blog** - Legal articles and updates
* **Contact** - Appointment booking, contact form, FAQ section, office location

### Interactive Features
* **WhatsApp Integration** - Direct chat button for instant communication
* **AI Chatbot** - Interactive assistant for common legal questions
* **Multi-language Support** - English and Hindi language options
* **Appointment Booking** - Easy-to-use scheduling system
* **Document Upload** - Secure client document submission (future enhancement)
* **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)

## Technical Stack
* **Frontend**: React 18 + TypeScript + Vite
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Database**: Supabase (PostgreSQL)
* **Features**: Row Level Security (RLS), Real-time data

## Setup Instructions

### Prerequisites
* Node.js 18+ and npm
* Supabase account (for database)

### Installation
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Database Setup**
   * The database migrations are already applied via Supabase MCP
   * Sample data (lawyers, practice areas, testimonials, blog posts, FAQs) is pre-populated

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Database Schema

### Tables
* **lawyers** - Lawyer profiles and credentials
* **practice_areas** - Legal service categories
* **testimonials** - Client reviews
* **case_studies** - Success stories
* **blog_posts** - Legal articles
* **appointments** - Consultation bookings
* **faqs** - Frequently asked questions
* **contact_messages** - General inquiries
* **documents** - Client file uploads

## Customization

### Update Lawyer Information
Edit the sample data in the database through Supabase dashboard or add new entries.

### Modify Practice Areas
Add or edit practice areas through the database. Each area includes:
* Title
* Description
* Icon reference
* Display order

### Add Blog Posts
Create new blog posts through the database with:
* Title and slug
* Content (supports Markdown-style formatting)
* Author reference
* Category and tags
* Featured image

### Configure Contact Details
Update phone numbers, email, and office address in:
* `src/components/Navigation.tsx`
* `src/components/Footer.tsx`
* `src/components/WhatsAppButton.tsx`
* `src/pages/ContactPage.tsx`

## Design Features

### Color Scheme
* **Primary**: Navy blue and slate tones (professional law firm aesthetic)
* **Accent**: Amber/gold (trust and premium feel)
* Professional gradient overlays
* Clean, modern typography

### Key Components
* Sticky navigation with smooth scrolling
* Animated stats counter
* Interactive service cards
* Testimonial carousel layout
* FAQ accordion
* Professional footer with social links

## Security
* Row Level Security (RLS) enabled on all database tables
* Public read access for published content only
* Form validation on client and server side
* Secure document upload preparation
* No sensitive data exposure

## Future Enhancements
* Payment gateway integration
* Client portal with login
* Case status tracking
* Online consultation via video call
* Advanced document management
* Email notification system
* SMS reminders for appointments

## Support
For technical support or customization requests, contact the development team.

## License
Private/Proprietary - All rights reserved.
