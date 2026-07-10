"use client";

import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ArrowUpToLine, X } from 'lucide-react';
import styles from "./leadSources.module.css";

const LeadSources = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
                <h1 className={styles.header}>Lead Sources</h1>
                <p className={styles.desc}>Contact, manage, and control all your lead channels from one dashboard</p>
            </div>
            <div className={styles.uploadContainer}>
                <button
                    type="button"
                    className={styles.uploadCard}
                    onClick={() => setIsOpen(true)}
                >
                    <div className={styles.uploadIcon}>
                        <ArrowUpToLine size={20} />
                    </div>

                    <div className={styles.uploadContent}>
                        <h3>Upload and Import Your Lead Data via CSV</h3>
                        <p>Upload a CSV file to preview, validate, and import CRM records and generate new lead</p>
                    </div>
                </button>
            </div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle
                    sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        pb: 0,
                    }}
                >
                    Import Leads via CSV
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{fontSize: "15px"}}>Upload a CSV file to bulk import leads into your system.</DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LeadSources;
