# Google Maps Setup Guide

## Overview
This application now uses Google Maps instead of Leaflet for better performance and features.

## Setup Instructions

### 1. Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API (optional, for enhanced features)
4. Go to "Credentials" and create an API key
5. Restrict the API key to your domain for security

### 2. Configure the API Key

1. Open `src/config/maps.ts`
2. Replace `'YOUR_GOOGLE_MAPS_API_KEY'` with your actual API key:

```typescript
export const GOOGLE_MAPS_CONFIG = {
  API_KEY: 'your-actual-api-key-here',
  // ... rest of config
};
```

### 3. Features

The new Google Maps implementation includes:

- ✅ **Interactive markers** for all vendors
- ✅ **User location** with accuracy circle
- ✅ **Info windows** with vendor details
- ✅ **Automatic bounds fitting** to show all vendors
- ✅ **Custom styling** with clean, modern appearance
- ✅ **Better performance** than Leaflet
- ✅ **Mobile-friendly** responsive design

### 4. Customization

You can customize the map appearance by modifying `src/config/maps.ts`:

- **Colors**: Change marker colors and styling
- **Zoom levels**: Adjust default and user location zoom
- **Map styles**: Customize the map appearance
- **Center location**: Change the default map center

### 5. Troubleshooting

If the map doesn't load:

1. Check that your API key is correct
2. Ensure the Maps JavaScript API is enabled
3. Check browser console for error messages
4. Verify your API key restrictions allow your domain

### 6. Cost Considerations

- Google Maps has a generous free tier
- Basic usage (up to 28,500 map loads per month) is free
- Monitor usage in Google Cloud Console
- Set up billing alerts to avoid unexpected charges

## Migration from Leaflet

The migration from Leaflet to Google Maps is complete. All existing functionality has been preserved:

- ✅ Vendor filtering and search
- ✅ Distance calculations
- ✅ User location features
- ✅ All vendor data and markers
- ✅ Responsive design

No changes to your vendor data or other components are needed.
