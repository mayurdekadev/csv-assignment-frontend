"use client";

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    Typography,
    Avatar,
} from "@mui/material";

const organizations = [
    {
        id: 1,
        name: "Test Corp",
    },
    {
        id: 2,
        name: "GrowEasy AI",
    },
    {
        id: 3,
        name: "VK Test",
    },
    {
        id: 4,
        name: "Sales AI",
    },
];

const OrganizationSelector = () => {

    const [selectedOrganization, setSelectedOrganization] = useState(organizations[1].id);
    const handleChange = (event) => { setSelectedOrganization(event.target.value); };

    return (
        <div>
            <FormControl>
                <Select
                    value={selectedOrganization}
                    onChange={handleChange}
                    IconComponent={ChevronRight}
                    displayEmpty
                    size="small"
                    MenuProps={{
                        slotProps: {
                            paper: {
                                sx: {
                                    mt: 1,
                                    borderRadius: "14px",
                                    boxShadow: "0px 8px 24px rgba(0,0,0,0.12)",
                                    padding: "6px",
                                },
                            },
                        },
                    }}
                    sx={{
                        width: 200,
                        height: 52,
                        borderRadius: "14px",
                        background: "#FFFFFF",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #7FA5A2",
                        },
                        ".MuiSelect-select": {
                            padding: "10px 14px",
                        },
                    }}
                    renderValue={() => (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.2,
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 34,
                                    height: 34,
                                    fontSize: 18,
                                    bgcolor: "#58AFC4",
                                }}
                            >
                                {selectedOrganization}
                            </Avatar>
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        color: "#263238",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    GrowEasy AI
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "8px",
                                        fontWeight: 700,
                                        color: "#7B8A8B",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    OWNER
                                </Typography>
                            </Box>
                        </Box>
                    )}
                >
                    {
                        organizations.map((item) => (
                            <MenuItem
                                key={item.id}
                                value={item.id}
                                sx={{
                                    borderRadius: "10px",
                                    mb: 0.5,
                                    padding: "10px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.2,
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            fontSize: 12,
                                            bgcolor: "#58AFC4",
                                        }}
                                    >
                                        {item.name[0]}
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#263238",
                                                lineHeight: 1.1,
                                            }}
                                        >
                                            {item.name}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "8px",
                                                fontWeight: 700,
                                                color: "#7B8A8B",
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            OWNER
                                        </Typography>
                                    </Box>
                                </Box>
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    );
};

export default OrganizationSelector;
