"use client";

import styles from "./manageLeadsTable.module.css";

const ManageLeadsTable = ({ file, rows }) => {
    if (!rows || rows.length === 0) {
        return (
            <div className={styles.empty}>
                No imported leads found.
            </div>
        );
    }

    return (
        <div className={styles.tableContainer}>
            <h2 className={styles.heading}>Your Leads</h2>
            <div className={styles.tableScroll}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Date Created</th>
                            <th>Company</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((lead, index) => (
                            <tr key={index}>
                                <td>{lead.name}</td>
                                <td>{lead.email || "-"}</td>
                                <td>
                                    {lead.country_code
                                        ? `+${lead.country_code} ${lead.mobile_without_country_code}`
                                        : lead.mobile_without_country_code}
                                </td>
                                <td>{lead.created_at}</td>
                                <td>{lead.company}</td>
                                <td>
                                    <span
                                        className={`${styles.badge} ${styles[lead.crm_status?.toLowerCase()]
                                            }`}
                                    >
                                        {lead.crm_status.replaceAll("_", " ")}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageLeadsTable;