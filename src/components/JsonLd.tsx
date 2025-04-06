'use client';

interface JsonLdProps {
  type?: 'organization' | 'course' | 'localBusiness';
  location?: 'Vizag' | 'Vijayawada' | 'Hyderabad';
  courseName?: string;
  courseDescription?: string;
}

export default function JsonLd({
  type = 'organization',
  location = 'Vizag',
  courseName = '',
  courseDescription = ''
}: JsonLdProps) {
  let jsonLd: Record<string, any>;

  // Base organization schema
  if (type === 'organization') {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "CyberTrainer.in",
      "url": "https://cybertrainer.in",
      "logo": "https://cybertrainer.in/favicon.svg",
      "description": "Best cybersecurity training platform in Vizag, Vijayawada & Hyderabad offering hands-on courses in ethical hacking, penetration testing, network security, and defensive security.",
      "founder": {
        "@type": "Person",
        "name": "Goutham Kumar",
        "jobTitle": "Lead Cybersecurity Trainer"
      },
      "offers": {
        "@type": "Offer",
        "category": "Cybersecurity Training"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": location === 'Vizag' ? 'Visakhapatnam' : location,
        "addressRegion": location === 'Hyderabad' ? 'Telangana' : 'Andhra Pradesh',
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-7207089154",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.linkedin.com/in/chittigouthamkumar/"
      ]
    };
  }
  // Course schema
  else if (type === 'course') {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": courseName || "Cybersecurity Training",
      "description": courseDescription || "Comprehensive cybersecurity training covering ethical hacking, penetration testing, and network security.",
      "provider": {
        "@type": "Organization",
        "name": "CyberTrainer.in",
        "sameAs": "https://cybertrainer.in"
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "price": "15000",
        "priceCurrency": "INR"
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": ["ONSITE", "ONLINE"],
        "location": {
          "@type": "Place",
          "name": `CyberTrainer.in - ${location}`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": location === 'Vizag' ? 'Visakhapatnam' : location,
            "addressRegion": location === 'Hyderabad' ? 'Telangana' : 'Andhra Pradesh',
            "addressCountry": "IN"
          }
        }
      }
    };
  }
  // Local business schema
  else if (type === 'localBusiness') {
    const locations = {
      'Vizag': {
        name: 'CyberTrainer.in - Vizag',
        addressLocality: 'Visakhapatnam',
        addressRegion: 'Andhra Pradesh',
        postalCode: '530003',
        streetAddress: 'Dwaraka Nagar',
        latitude: '17.7231',
        longitude: '83.3013'
      },
      'Vijayawada': {
        name: 'CyberTrainer.in - Vijayawada',
        addressLocality: 'Vijayawada',
        addressRegion: 'Andhra Pradesh',
        postalCode: '520010',
        streetAddress: 'MG Road',
        latitude: '16.5062',
        longitude: '80.6480'
      },
      'Hyderabad': {
        name: 'CyberTrainer.in - Hyderabad',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500081',
        streetAddress: 'Hitech City',
        latitude: '17.4474',
        longitude: '78.3762'
      }
    };

    const locationData = locations[location];

    jsonLd = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": locationData.name,
      "image": "https://cybertrainer.in/favicon.svg",
      "@id": `https://cybertrainer.in/${location.toLowerCase()}`,
      "url": `https://cybertrainer.in/${location.toLowerCase()}`,
      "telephone": "+91-7207089154",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": locationData.streetAddress,
        "addressLocality": locationData.addressLocality,
        "addressRegion": locationData.addressRegion,
        "postalCode": locationData.postalCode,
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": locationData.latitude,
        "longitude": locationData.longitude
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      "priceRange": "₹₹",
      "description": `Best cybersecurity training in ${location} by Goutham Kumar. Expert-led courses in ethical hacking, penetration testing & network security.`
    };
  }
  else {
    // Default to organization schema
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "CyberTrainer.in",
      "url": "https://cybertrainer.in"
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
