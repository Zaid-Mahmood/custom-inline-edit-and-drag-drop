import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";
export const footerIcons = [
    { icon: TiSocialFacebook },
    { icon: FaInstagram },
    { icon: FaTwitter },
    { icon: FaPinterest }
];

export const footerLinks = [
    {
        heading: "Company",
        links: [
            { name: "About Us", href: "#" },
            { name: "The Stay Calm Blog", href: "#" },
            { name: "Testimonials", href: "#" },
            { name: "Awards", href: "#" },
            { name: "Giving Back", href: "#" },
            { name: "News & Media", href: "#" },
        ]
    },
    {
        heading: "Customer Service",
        links: [
            { name: "faqs", href: "#" },
            { name: "Shipping & Returns", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Contact", href: "#" },
        ]
    },
    {
        heading: "more ways to shop",
        links: [
            { name: "Store Locator", href: "#" }
        ]
    },
    {
        heading: "GET EXCLUSIVE OFFERS",
        links: [
            { name: "Be the first to receive discounts, contests, giveaways and naturally calming health tips." }
        ],
        inputs: [
            { inputType: "Name", type: "text" },
            { inputType: "Email", type: "email" },
            { btnType: "submit", btnText: "Submit" }
        ]
    }
]