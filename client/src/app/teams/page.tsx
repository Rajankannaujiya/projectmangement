"use client"

import { useGetTeamsQuery } from '@/state/api'
import React, { useState } from 'react'
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




const columns:GridColDef[] = [
   { field: 'id', headerName: 'Team ID', width: 100},
   { field: 'teamName', headerName: 'Team Name', width: 200},
   { field: 'productOwnerUserId', headerName: 'Product Owner ID', width: 100},
  { field: 'productOwnerUsername', headerName: 'Product Owner', width: 200},
{ field: 'projectManagerUsername', headerName: 'Product Manager', width: 200},

]

const Teams = () => {

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

    const {data:teams, isLoading, isError} = useGetTeamsQuery();

    console.log(teams)

    const isDarkMode = useAppSelector((state)=>state.global.isDarkMode)


    if(isLoading) return <Loading />

    if(isError || !teams) return <Error errorMessage='Error fetching users'/>
  return (
    <div className='flex w-full flex-col p-8'>
      <Header name='Teams'/>
      <div style={{height:650, width:"100%" }}>

        <DataGrid 
        rows={teams || []}
        columns={columns}
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

export default Teams