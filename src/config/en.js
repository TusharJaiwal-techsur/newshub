import { all } from "axios";
import { View } from "lucide-react";

export const STR = {

    title: "NewsHub",
    description: "Your trusted source for the latest news and updates. Stay informed with our comprehensive coverage of politics, technology, sports, and more.",
    header: {
        home: "Home",
        about: "About",
        categories: "Categories",
        contact: "Contact",
        option: {
            dashbord: "Dashboard",
            profile: "Profile",
            create_post: "Create Post",
            logout: "Logout",
        }
    },
    footer: {
        heading: {
            quick_links: "Quick Links",
            categories: "Categories",
            contact_info: "Contact Info",
            contact: "Contact",
        },
        quick_links: {
            home: "Home",
            about_us: "About Us",
            privcy_policy: "Privacy Policy",
            terms_of_service: "Terms of Service",
        },
        categories: {
            politics: "Politics",
            technology: "Technology",
            sports: "Sports",
            business: "Business",
            entertainment: "Entertainment",
            health: "Health",

        },
        contact_info: {
            address: "Prayagraj, Uttar Pradesh, India",
            phone: "+91 7219696844",
            email: "tusharjaiwal321@gmail.com"
        },
        copy_right: " . All rights reserved. Made with ❤️ in India.",
        Symbol: "©"
    },
    sidebar: {
        popular_posts: "Popular Articles",
        Views: "Views",
        latest_posts: "Latest Articles",
        categories: "Categories",
    },
    createPage: {
        auth: {
            access: "Access Denied",
            message: "You need to login to create articles.",
        },
        create_post: {
            title: "Title *",
            excerpt: "Excerpt",
            message: "If left empty, will be auto-generated from content",
            content: "Content *",
            message_content: "You can use HTML tags for formatting",
            category: "Category *",
            publish: "Publish",
            publish_immediately: "Publish immediately",
            featured: "Mark as featured",
            articleDetails: "Article Details",
            categories: "Categories *",
            select_category: "Select category",
            author: "Author *",
            tags: "Tags",
            tags_message: "Separate tags with commas",
            featured_image: "Featured Image URL",
            Views: "Views",
        },
    },

    admin: {
        dashboard: {
            AccessDenied: "Access Denied",
            login_message: "You need to login to access the dashboard.",
            go_home: "Go to Home",
            adminDashboard: "Admin Dashboard",
            welcomeback: "Welcome back,",
            createArticle: "Create Article",
            totalArticles: "Total Articles",
            totalViews: "Total Views",
            viewsTody: "Views Today",
            published: "Published",
            recentArticles: "Recent Articles",
            article: "Article",
            status: "Status",
            views: "Views",
            Created: "Created",
            actions: "Actions",

        },

        loginModel: {
            email: "Email",
            password: "Password",
            cancel: "Cancel"
        },

    },

    aboutPage: {
        title: "About ",
        message: " NewsHub is your trusted source for comprehensive news coverage, delivering accurate, timely, and relevant information across politics, technology, sports,business, and lifestyle topics that matter to you.",
        mission: "Our Mission",
        mission_p1: "At NewsHub, we believe in the power of informed communities. Our mission is to rovide clear, accurate, and comprehensive news coverage that helps our readers understand the world around them and make informed decisions.",
        mission_p2: "We are committed to maintaining the highest standards of journalistic integrity while embracing digital innovation to deliver news in the most accessible and engaging formats.",
        point1: "Deliver accurate and timely news coverage",
        point2: "Promote transparency and accountability",
        point3: "Foster informed public discourse",
        point4: " Support democratic values and institutions",
        vision: "Our Vision",
        whyChooseUs: "Why Choose",
        choose1: "Comprehensive coverage across multiple categories",
        choose2: "Real-time updates and breaking news alerts",
        choose3: "Expert analysis and in-depth reporting",
        choose4: "User-friendly platform accessible on all devices",

        byTheNumbers: " by the Numbers",
        impact: "Our impact in the digital news landscape",

        values: "Our Values",
        principle: "These core principles guide everything we do at ",

        team: "Meet the Team",
        team_message: "Our experienced journalists and writers are passionate about delivering quality news",

        journy_heading: "Our Journey",
        journy_subheading1: "2019 - The Beginning",
        journy_subheading2: "2020 - Expansion",
        journy_subheading3: "2022 - Recognition",
        journy_subheading4: "2024 - Innovation",

        journy_p1: " was founded with a vision to create a digital-first news platform that prioritizes accuracy and accessibility.",
        journy_p2: "We expanded our coverage to include technology, sports, and lifestyle content, growing our readership significantly.",
        journy_p3: " received recognition for excellence in digital journalism and community engagement.",
        journy_p4: "We continue to innovate with new features, enhanced user experience, and expanded multimedia content.",

        getInTouch: "Get in Touch",
        getInTouch_message: "Have a story tip, feedback, or want to collaborate? We'd love to hear from you.",

        contactUs: "Contact Us",

    },

    AllArticles: {
        views: "Views",
        filters: "Filters:",
        allCategories: "All Categories",

        options: {
            latestFirst: "Latest First",
            oldestFirst: "Oldest First",
            mostViewed: "Most Popular",

        },
        clearFilter: "Clear Filter",
    },

    articlePage: {
        articleNotFound: "Article Not Found",
        articleNotFoundMessage: "The article you are looking for does not exist or has been removed.",
        back: "Go Back Home",
        Featured: "Featured",
        copyLink: "Copy Link",
        relatedArticles: "Related Articles",
        views: "Views",
    },

    categoryPage: {
        news: " News",
        latestArticles: "Latest Articles in",
        category: "category",
        notFound: "No articles found",
    },

    contactPage: {
        message: "Get in touch with our editorial team",
        sentMessage: "Send us a Message",
        thankYou: "Thank you for your message! We'll get back to you soon.",
        contactInformation: "Contact Information",
        address: "Address",
        phone: "Phone",
        email: "Email",
        businessHours: "Business Hours",
        mondayFriday: "Monday - Friday",
        saturday: "Saturday",
        time1:"9:00 AM - 6:00 PM",
        time2:"10:00 AM - 4:00 PM",
        Sunday: "Sunday",
        Closed: "Closed",
    },

    auth: {
        signIn: "Sign in",
        signOut: "Sign out",
        signUp: "Sign up",
    },


    forms: {
        emailPlaceholder: "Enter your email",
        passwordPlaceholder: "Enter your password",
    },


    routes: {
        HOME: "/",
        ABOUT: "/about",
        BLOG: "/blog",
        CONTACT: "/contact",
        ARTICLE: (slug) => `/article/${slug}`,
    },


    meta: {
        defaultTitle: "My Awesome Site — Learn & Build",
        defaultKeywords: "react, javascript, blog, tutorials",
    },

    // Small helper for full page titles
    ui: {
        pageTitle: (title) => (title ? `${title} — ${STR.site.title}` : STR.meta.defaultTitle),
    },
};

export default STR;