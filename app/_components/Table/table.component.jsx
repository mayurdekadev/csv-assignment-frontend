"use client";

import styles from "./table.module.css";

const TableComponent = (data) => {
    const tableData = data.tableData;

    const columns = [
        {
            title: 'LEAD NAME',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'EMAIL',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'CONTACT',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'DATE CREATED',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'COMPANY',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'STATUS',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'QUALITY',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'LEAD OWNER',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'DATE CREATED',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'SOURCE',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <>
            <div>
                {tableData.map((item, i) => {
                    return (
                        <div key={item.id ?? i}>
                            <div>
                                {i + 1}
                            </div>
                            <div>
                                {item.company}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TableComponent;
