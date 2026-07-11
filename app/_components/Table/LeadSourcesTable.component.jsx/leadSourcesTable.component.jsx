"use client";

import { FileText } from 'lucide-react';
import styles from "./leadSourcesTable.module.css";

const LeadSourcesTable = ({ file, rows }) => {
    if (!file || rows.length === 0) return null;
    const headers = Object.keys(rows[0]);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    padding: "16px",
                    marginBottom: "16px",
                }}
            >
                <div
                    style={{
                        width: 42,
                        height: 42,
                        background: "#EAF7F5",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2px",
                        borderRadius: "8px",
                    }}
                >
                    <FileText size={15} color='#235f58' />
                    <p style={{ fontWeight: 800, fontSize: "9px" }}>CSV</p>
                </div>
                <div>
                    <div style={{ fontWeight: 800, fontSize: "18px" }}>
                        {file.name}
                    </div>
                    <div
                        style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: "#666",
                        }}
                    >
                        {(file.size / 1024).toFixed(2)} KB
                    </div>
                </div>
            </div>
            <div
                style={{
                    maxHeight: 300,
                    overflow: "auto",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "separate",
                        borderSpacing: 0,
                        tableLayout: "auto"
                    }}
                >
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <th
                                    key={header}
                                    style={{
                                        textAlign: "left",
                                        padding: "12px",
                                        fontSize: "15px",
                                        borderBottom: "1px solid #E5E7EB",
                                        background: "#F9FAFB",
                                    }}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                {headers.map((header) => (
                                    <td
                                        key={header}
                                        style={{
                                            padding: "12px",
                                            borderBottom: "1px solid #F3F4F6",
                                            fontSize: "15px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {row[header]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default LeadSourcesTable;