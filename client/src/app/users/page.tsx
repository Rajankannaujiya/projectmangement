"use client"

import { useGetUsersQuery } from '@/state/api'
import React, { forwardRef, useState } from 'react'
import { useAppSelector } from '../redux';
import Loading from '@/components/Loading';
import {Error} from '@/components/alert';
import Header from '@/components/Header';
import { DataGrid, FilterPanelTrigger, GridColDef, GridFilterListIcon, Toolbar, ToolbarButton,  } from '@mui/x-data-grid';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import { ExportPrint } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import { ExportCsv } from '@mui/x-data-grid';
import Menu from '@mui/material/Menu';
import { GridDownloadIcon } from '@mui/x-data-grid';
import { DownloadIcon } from 'lucide-react';




const columns:GridColDef[] = [
   { field: 'userId', headerName: 'ID', width: 100},
   { field: 'username', headerName: 'Username', width: 100},
  { field: 'profilePictureUrl', headerName: 'Profile Picture', width: 150, renderCell: (params)=>(
     <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
  )},
  { field: 'teamId', headerName: 'Team ID', width: 100},
]

const Users = () => {

    const [exportMenuOpen, setExportMenuOpen] = useState(false);
    const exportMenuTriggerRef = React.useRef<HTMLButtonElement>(null);



  const CustomToolbar = () => (

  <Toolbar className="toolbar flex gap-2">

    <Tooltip title="fileter">
          <FilterPanelTrigger
          render={(props, state) => (
            <ToolbarButton {...props} color="default">
              <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                <GridFilterListIcon fontSize="small" />
              </Badge>
            </ToolbarButton>
          )}
        />
      </Tooltip>

        <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="Export">
        <ToolbarButton 
          ref={exportMenuTriggerRef}
          id="export-menu-trigger"
          aria-controls="export-menu"
          aria-haspopup="true"
          aria-expanded={exportMenuOpen ? 'true' : undefined}
          onClick={() => setExportMenuOpen(true)}
        >
          <GridDownloadIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>

      <Menu
        id="export-menu"
        anchorEl={exportMenuTriggerRef.current}
        open={exportMenuOpen}
        onClose={() => setExportMenuOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          list: {
            'aria-labelledby': 'export-menu-trigger',
          },
        }}
      >
        <ExportPrint render={<MenuItem />} onClick={() => setExportMenuOpen(false)}>
          Print
        </ExportPrint>
        <ExportCsv render={<MenuItem />} onClick={() => setExportMenuOpen(false)}>
          Download as CSV
        </ExportCsv>
      </Menu>
  </Toolbar>
);

    const {data:users, isLoading, isError} = useGetUsersQuery();

    const isDarkMode = useAppSelector((state)=>state.global.isDarkMode)


    if(isLoading) return <Loading />

    if(isError || !users) return <Error errorMessage='Error fetching users'/>
  return (
    <div className='flex w-full flex-col p-8'>
      <Header name='Users'/>
      <div style={{height:650, width:"100%" }}>

        <DataGrid 
        rows={users || []}
        columns={columns}
        getRowId={(row) => row.userId}
        pagination
        slots={{
          toolbar:CustomToolbar,
        }}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
        showToolbar
        />

      </div>

    </div>
  )
}

export default Users