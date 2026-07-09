"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    LayoutDashboard,
    Rocket,
    Database,
    MessageSquare,
    Users,
    Megaphone,
    UserPlus,
    PhoneCall,
    Table2
} from 'lucide-react';
import OrganizationSelector from '../OrganizationSelector/organizationSelector.component';
import styles from "./sidebar.module.css";

const menuItems = [
    {
        title: "MAIN",
        items: [
            { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
            { label: "Generate Leads", icon: Rocket, path: "/generate-leads" },
            { label: "Manage Leads", icon: Database, path: "/manage-leads" },
            { label: "Engage Leads", icon: MessageSquare, path: "/engage-leads" },
        ]
    },
    {
        title: "CONTROL CENTER",
        items: [
            { label: "Team Members", icon: Users, path: "/team-members" },
            { label: "Lead Sources", icon: Megaphone, path: "/lead-sources" },
            { label: "Ad Accounts", icon: UserPlus, path: "/ad-accounts" },
            { label: "WhatsApp Account", icon: MessageSquare, path: "/whatsapp-account" },
            { label: "Tele Calling", icon: PhoneCall, path: "/tele-calling" },
            { label: "CRM Fields", icon: Table2, path: "/crm-fields" },
        ]
    }
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <Image
                    src="/logo.png"
                    alt="GrowEasy logo"
                    width={30}
                    height={30}
                />
                <h3> GrowEasy </h3>
            </div>
            <OrganizationSelector />
            <div className={styles.navigation}>
                {menuItems.map((section) => (
                    <div key={section.title} className={styles.section}>
                        <p className={styles.sectionTitle}>{section.title}</p>
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
                                >
                                    <Icon size={15} />
                                    <p className={styles.menuLabel}>{item.label}</p>
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
