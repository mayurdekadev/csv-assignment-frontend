"use client";

import { useState, useRef } from 'react';
import Papa from "papaparse";
import LeadSourcesTable from '@/_components/Table/LeadSourcesTable.component.jsx/leadSourcesTable.component';
import { BASE_API_URL } from "../../../data";
import { useRouter } from "next/navigation";
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {
    Box,
    IconButton,
    Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ArrowUpToLine, X, CircleAlert, FileText } from 'lucide-react';
import styles from "./leadSources.module.css";

const LeadSources = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [csvRows, setCsvRows] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const router = useRouter();

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleCsvFile = (file) => {
        if (!file) return;
        if (!file.name.toLowerCase().endsWith(".csv")) {
            alert("Please select a CSV file.");
            return;
        }
        setSelectedFile(file);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                setCsvRows(results.data);
            },
        });
    };

    const handleInputChange = (e) => {
        handleCsvFile(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleCsvFile(e.dataTransfer.files[0]);
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setCsvRows([]);
        setIsDragging(false);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        try {
            setLoading(true);
            setIsUploading(true);
            const formData = new FormData();

            formData.append("file", selectedFile);
            const response = await fetch(`${BASE_API_URL}/api/upload`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Upload failed");
            }

            sessionStorage.setItem(
                "importedLeads",
                JSON.stringify(result.records)
            );
            sessionStorage.setItem(
                "uploadSummary",
                JSON.stringify({
                    imported: result.imported,
                    total: result.totalRecords,
                    skipped: result.skipped,
                })
            );
            handleCancel();
            setIsOpen(false);

            router.push("/manage-leads");

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsUploading(false);
            setLoading(false);
        }
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
                onClose={isUploading ? undefined : handleClose}
                fullWidth
                maxWidth="sm"
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: "15px",
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        px: 3,
                        pt: 3,
                        pb: 1,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                                fontSize: "19px",
                            }}
                        >
                            Import Leads via CSV
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#929292",
                                mt: 0.5,
                                fontWeight: 600,
                            }}
                        >
                            Upload a CSV file to bulk import leads into your system.
                        </Typography>
                    </Box>

                    <IconButton
                        onClick={handleClose}
                        size="small"
                    >
                        <X />
                    </IconButton>
                </Box>
                <DialogContent>
                    <input
                        ref={inputRef}
                        id="csv-upload"
                        type="file"
                        accept=".csv"
                        hidden
                        onChange={handleInputChange}
                    />
                    {
                        !selectedFile ? (
                            <label htmlFor="csv-upload">
                                <Box
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    sx={{
                                        border: "2px dashed #D7D7D7",
                                        borderRadius: "14px",
                                        height: 400,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        bgcolor: isDragging ? "#f3fbfa" : "#fff",
                                        transition: ".2s",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            border: "2px solid #D7D7D7",
                                            borderRadius: "14px",
                                            height: 50,
                                            width: 50,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            bgcolor: "#fff",
                                        }}
                                    >
                                        <ArrowUpToLine size={30} color='#235f58' />
                                    </Box>
                                    <Typography
                                        sx={{
                                            mt: 3,
                                            fontWeight: 800,
                                            fontSize: 19,
                                        }}
                                    >
                                        Drop your CSV file here
                                    </Typography>
                                    <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#929292" }}>
                                        or click to browse files
                                    </Typography>
                                    <Box
                                        sx={{
                                            border: "1px solid #D7D7D7",
                                            borderRadius: "14px",
                                            height: "auto",
                                            width: 260,
                                            p: 0.8,
                                            mt: 3,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: 1,
                                            bgcolor: "#f8f8f8",
                                        }}
                                    >
                                        <CircleAlert size={17} color='#929292' />
                                        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#929292" }}>
                                            Supported file: .csv (max 5MB)
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#929292", textAlign: 'center', width: "80%", mt: 2 }}>
                                        Required headers: created_at, name, email, country_code, mobile_without_country_code, company, city, state, country, lead_owner, crm_status, crm_note. Template includes default + custom CRM fields to reduce upload errors.
                                    </Typography>
                                    <Box
                                        sx={{
                                            border: "1px solid #2b655f",
                                            borderRadius: "14px",
                                            height: "auto",
                                            width: 280,
                                            p: 0.8,
                                            mt: 2,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            bgcolor: "#e2f1f1",
                                        }}
                                    >
                                        <FileText size={17} color='#2b655f' />
                                        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#2b655f", width: "90%", textAlign: "center" }}>
                                            Download Sample CSV Template
                                        </Typography>
                                    </Box>
                                </Box>
                            </label>
                        ) : (
                            <LeadSourcesTable file={selectedFile} rows={csvRows} />
                        )
                    }
                    <Grid
                        container
                        spacing={2}
                        sx={{ mt: 2 }}
                    >
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <button
                                className={styles.cancelButton}
                                onClick={handleCancel}
                                disabled={isUploading}
                            >
                                Cancel
                            </button>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <button
                                className={styles.uploadButton}
                                disabled={!selectedFile || isUploading}
                                onClick={handleUpload}
                            >
                                {isUploading ? "Uploading..." : "Upload File"}
                            </button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            {loading && (
                <div className={styles.loaderOverlay}>
                    <div className={styles.loaderContent}>
                        <CircularProgress
                            size={55}
                            thickness={4}
                            sx={{ color: "#4d9486" }}
                        />
                        <h3>Processing your CSV</h3>
                        <p>
                            Processing your file with Gemini. This might take a few minutes.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadSources;
