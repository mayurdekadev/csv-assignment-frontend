"use client";

import { useEffect, useState } from "react";
import { Phone, Users, Target } from 'lucide-react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import styles from "./manageLeads.module.css";

const ManageLeads = () => {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        const data = sessionStorage.getItem("importedLeads");
        if (data) {
            setLeads(JSON.parse(data));
        }
        console.log(leads);
    }, []);

    return (
        <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
                <h1 className={styles.header}>Manage Your Leads</h1>
                <p className={styles.desc}>Monitor lead status, assign tasks, and close deals faster.</p>
            </div>
            <span className={styles.contentHeader}>Perfomace Overview</span>
            <div>
                <Grid container spacing={3} sx={{ width: "100%", px: 3, boxSizing: "border-box" }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
                        <Paper sx={{ width: "100%", height: "100%", padding: "15px", borderRadius: "10px", background: "linear-gradient(to top left, #e9f3f4 0%, #ffffff 50%)" }}>
                            <div className={styles.paperContent}>
                                <div className={styles.paperTitle}>
                                    <span className={styles.title}>
                                        Total Leads
                                    </span>
                                    <Users size={17} color="Black" strokeWidth={0.8} />
                                </div>
                                <span className={styles.value}>
                                    45
                                </span>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
                        <Paper sx={{ width: "100%", height: "100%", padding: "15px", borderRadius: "10px", background: "linear-gradient(to top left, #e9f3f4 0%, #ffffff 50%)" }}>
                            <div className={styles.paperContent}>
                                <div className={styles.paperTitle}>
                                    <span className={styles.title}>
                                        Contacted Leads
                                    </span>
                                    <Phone size={17} color="Black" strokeWidth={0.8} />
                                </div>
                                <span className={styles.value}>
                                    31
                                </span>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
                        <Paper sx={{ width: "100%", height: "100%", padding: "15px", borderRadius: "10px", background: "linear-gradient(to top left, #e9f3f4 0%, #ffffff 50%)" }}>
                            <div className={styles.paperContent}>
                                <div className={styles.paperTitle}>
                                    <span className={styles.title}>
                                        Sales done
                                    </span>
                                    <Target size={17} color="Black" strokeWidth={0.8} />
                                </div>
                                <span className={styles.value}>
                                    27
                                </span>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
                        <Paper sx={{ width: "100%", height: "100%", padding: "15px", borderRadius: "10px", background: "linear-gradient(to top left, #e9f3f4 0%, #ffffff 50%)" }}>
                            <div className={styles.paperContent}>
                                <div className={styles.paperTitle}>
                                    <span className={styles.title}>
                                        Conversion Rate
                                    </span>
                                    <Target size={17} color="Black" strokeWidth={0.8} />
                                </div>
                                <span className={styles.value}>
                                    87.09%
                                </span>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <div>
                {/* <TableComponent tableData={data} /> */}
            </div>
        </div>
    );
};

export default ManageLeads;
